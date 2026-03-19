// ─────────────────────────────────────────
//  ULK IT Dashboard — Alpine.js App Logic
//  src/alpine-app.js
// ─────────────────────────────────────────
export function createApp() {
  return {
    // ── Page state ──────────────────────────────────────
    today: new Date().toLocaleDateString("en-RW", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),

    // ── Live Data Arrays ────────────────────────────────
    allAssets: [], // All items from MySQL
    lowStockAlerts: [], // Filtered for the "Critical" table
    recentSupply: [], // The last 5 entries
    allVendors: [], // Counted unique suppliers
    auditLog: [],// Empty for now
    allCategories: [],

    newAsset: {
      product_name: "",
      category_id: 1,
      vendor_id: 1,
      stock_quantity: 0,
      min_threshold: 5,
    },

    newVendor: { companyName: "", email: "" },

    // ── Dynamic Getters (Calculates numbers for UI) ─────
    get totalAssetsCount() {
      // Sums up all 'stock' values from the database rows
      return this.allAssets.reduce(
        (sum, item) => sum + (Number(item.stock) || 0),
        0,
      );
    },
    get totalVendorsCount() {
      // Counts how many unique suppliers are in your assets list
      return new Set(this.allAssets.map((a) => a.supplier)).size;
    },
    get criticalCount() {
      return this.lowStockAlerts.length;
    },

    // ── Modal States ─────────────────────────────────────
    quickModal: {
      open: false,
      type: "",
      title: "",
      submitLabel: "",
    },
    reorderModal: {
      open: false,
      data: null,
      form: { product: "", supplier: "", qty: 0 },
    },

    // ── Initialization (Runs on Page Load) ──────────────
    async init() {
      await this.refreshDashboard();
      await this.fetchVendors();
      await this.fetchCategories();

      // Initialize the Chart
      this.$nextTick(() => {
        this.initChart();
      });
    },

    async fetchCategories(){
      try{
        const response = await fetch("http://localhost:5000/api/categories");
        this.allCategories = await response.json();
        console.log("Categories Loaded", this.allCategories)
      }catch(error){
        console.log("Error Fetching categories", error)
      }
    },

    async fetchVendors() {
      try {
        const response = await fetch("http://localhost:5000/api/vendors");
        this.allVendors = await response.json();
        console.log("Vendors Loaded", this.allVendors);
      } catch (error) {
        console.log("Error Fetching Vendors", error);
      }
    },

    async submitHardware() {
      try {
        await this.refreshDashboard();

        const response = await fetch("http://localhost:5000/api/assets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.newAsset),
        });

        if (!response.ok) throw new Error("Failed to save new asset");

        const result = await response.json();
        console.log("Asset saved with ID: ", result.id);

        this.quickModal.open = false;
        this.newAsset = {
          product_name: "",
          category_id: 1,
          vendor_id: 1,
          stock_quantity: 0,
          min_threshold: 5,
        };
        await this.refreshDashboard();

        alert("Success! Asset added to Database");
      } catch (error) {
        console.log("Save Error!", error);
        alert(
          "Error Saving to the database, Check the console for more details",
        );
      }
    },

    // ── Database Sync Logic ──────────────────────────────
    async refreshDashboard() {
      try {
        const response = await fetch("http://localhost:5000/api/assets");
        const data = await response.json();

        // Map the raw SQL results into UI-friendly objects with icons
        const mappedData = data.map((item) => ({
          id: item.id,
          product: item.product, // Must match x-text="alert.product"
          supplier: item.supplier, // Must match x-text="alert.supplier"
          stock: Number(item.stock), // Ensure it's a number for the filter
          min: Number(item.min), // Ensure it's a number for the filter
          category: item.category,
          iconBg: "#eff6ff",
          icon: `<svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/></svg>`,
        }));
        console.log(mappedData);

        this.allAssets = mappedData;

        // Update the "Critical" list: items where stock is less than or equal to min
        this.lowStockAlerts = mappedData.filter(
          (item) => item.stock <= item.min,
        );

        // Show only the most recent 5 items in the bottom table
        this.recentSupply = mappedData.slice(0, 5);

        console.log("✅ Dashboard Synced with MySQL");
      } catch (error) {
        console.error("❌ Database Connection Error:", error);
      }
    },

    async submitVendor() {
      try {
        const response = await fetch("http://localhost:5000/api/vendors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.newVendor),
        });

        if (response.ok) {
          this.quickModal.open = false;
          this.newVendor = { companyName: "", email: "" };
          await this.fetchVendors(); // Refresh the dropdown list!
          alert("Vendor Registered!");
        }
      } catch (error) {
        console.error("❌ Vendor Save Error:", error);
      }
    },

    // ── UI Methods ───────────────────────────────────────
    openModal(type) {
      const configs = {
        delivery: { title: "Log New Delivery", submitLabel: "Log Delivery" },
        hardware: { title: "Add New Hardware Asset", submitLabel: "Add Asset" },
        vendor: {
          title: "Register New Vendor",
          submitLabel: "Register Vendor",
        },
      };
      const cfg = configs[type];
      this.quickModal = { ...cfg, type, open: true };
    },

    openReorderModal(alert) {
      this.reorderModal.data = alert;
      this.reorderModal.open = true;
    },

    // ── Chart.js Logic ───────────────────────────────────
    initChart() {
      const canvas = document.getElementById("assetChart");
      if (!canvas || this.allAssets.length === 0) return;

      const categories = [...new Set(this.allAssets.map((a) => a.category))];

      const palette = [
        "#2563eb",
        "#7c3aed",
        "#059669",
        "#d97706",
        "#db2777",
        "#4b5563",
        "#0891b2",
        "#4ade80",
      ];

      const chartColors = categories.map((_, index) => palette[index % palette.length])


      const chartValues = categories.map(
        (category) =>
          this.allAssets.filter((a) => (a.category === category)).length,
      );

      import("chart.js").then(
        ({ Chart, ArcElement, Tooltip, Legend, DoughnutController }) => {
          Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

          if(window.myChart) window.myChart.destroy();

          window.myChart = new Chart(canvas, {
            type: "doughnut",
            data: {
              labels: categories,
              datasets: [
                {
                  data: chartValues,
                  backgroundColor: chartColors,
                  borderWidth: 0,
                },
              ],
            },
            options: {
              responsive: true,
              cutout: "68%",
              plugins: { legend: { display: false } },
            },
          });
        },
      );
    },
  };
}
