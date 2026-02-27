// ─────────────────────────────────────────
//  ULK IT Dashboard — Alpine.js App Logic
//  src/alpine-app.js
// ─────────────────────────────────────────

import {
  LOW_STOCK_ALERTS,
  RECENT_SUPPLY,
  EXTRA_SUPPLY,
  AUDIT_LOG_INITIAL,
  CHART_DATA,
  CHART_LEGEND,
} from './data.js'

/**
 * Registered as window.app() so Alpine x-data="app()" can find it.
 * Called once per page load before Alpine initialises.
 */
export function createApp() {
  return {
    // ── Page state ──────────────────────────────────────
    today: new Date().toLocaleDateString('en-RW', {
      weekday: 'long',
      year:    'numeric',
      month:   'long',
      day:     'numeric',
    }),
    allSupplyOpen: false,

    // ── Data ────────────────────────────────────────────
    chartLegend:    CHART_LEGEND,
    lowStockAlerts: LOW_STOCK_ALERTS,
    recentSupply:   RECENT_SUPPLY,
    auditLog:       [...AUDIT_LOG_INITIAL],

    get allSupply() {
      return [...this.recentSupply, ...EXTRA_SUPPLY]
    },

    // ── Modal states ─────────────────────────────────────
    kpiModal: {
      open:  false,
      label: '',
      form:  { label: '', value: '', change: '', sub: '', notes: '' },
    },

    reorderModal: {
      open: false,
      data: null,
      form: { product: '', supplier: '', qty: 0, price: '', priority: '', notes: '' },
    },

    deliveryModal: {
      open: false,
      data: null,
    },

    quickModal: {
      open:        false,
      type:        '',
      title:       '',
      submitLabel: '',
    },

    // ── KPI Modal ────────────────────────────────────────
    openKpiModal(type) {
      const labels = {
        assets:     'Total Active Assets',
        alerts:     'Low Stock Alerts',
        suppliers:  'Total Suppliers',
        deliveries: 'Recent Deliveries',
      }
      this.kpiModal.label = labels[type]
      this.kpiModal.form  = { label: labels[type], value: '', change: '', sub: '', notes: '' }
      this.kpiModal.open  = true
    },

    // ── Reorder Modal ────────────────────────────────────
    openReorderModal(alert) {
      this.reorderModal.data = alert
      this.reorderModal.form = {
        product:  alert.product,
        supplier: alert.supplier,
        qty:      alert.min * 2,
        price:    '',
        priority: '🔴 Urgent — within 48 hours',
        notes:    `Reorder triggered: stock (${alert.stock}) below minimum (${alert.min}).`,
      }
      this.reorderModal.open = true
    },

    submitReorder() {
      const { product, supplier, qty, priority } = this.reorderModal.form
      this.auditLog.unshift({
        type:    'info',
        message: `Reorder for "${product}" submitted to ${supplier}. Qty: ${qty}. Priority: ${priority.split('—')[0].trim()}.`,
        time:    'Just now',
      })
      this.reorderModal.open = false
    },

    // ── Delivery Detail Modal ────────────────────────────
    openDeliveryDetail(row) {
      this.deliveryModal.data = row
      this.deliveryModal.open = true
    },

    // ── Quick Action Modal (Log / Add / Register) ────────
    openModal(type) {
      const configs = {
        delivery: { title: 'Log New Delivery',      submitLabel: 'Log Delivery'      },
        hardware: { title: 'Add New Hardware Asset', submitLabel: 'Add Asset'         },
        vendor:   { title: 'Register New Vendor',    submitLabel: 'Register Vendor'   },
      }
      const cfg = configs[type]
      this.quickModal.type        = type
      this.quickModal.title       = cfg.title
      this.quickModal.submitLabel = cfg.submitLabel
      this.quickModal.open        = true
    },

    // ── Alpine init hook — builds the Chart.js doughnut ──
    init() {
      this.$nextTick(() => {
        const canvas = document.getElementById('assetChart')
        if (!canvas) return

        // Dynamically import Chart.js only when the canvas is ready
        import('chart.js').then(({ Chart, ArcElement, Tooltip, Legend, DoughnutController }) => {
          Chart.register(ArcElement, Tooltip, Legend, DoughnutController)

          new Chart(canvas, {
            type: 'doughnut',
            data: {
              labels:   CHART_DATA.labels,
              datasets: [{
                data:            CHART_DATA.values,
                backgroundColor: CHART_DATA.colors,
                borderWidth:     0,
                hoverOffset:     6,
              }],
            },
            options: {
              responsive:          true,
              maintainAspectRatio: true,
              cutout:              '68%',
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => ` ${ctx.parsed}% of total assets`,
                  },
                },
              },
            },
          })
        })
      })
    },
  }
}
