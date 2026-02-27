// ─────────────────────────────────────────
//  ULK IT Dashboard — Static / Mock Data
//  src/data.js
// ─────────────────────────────────────────

export const LOW_STOCK_ALERTS = [
  {
    product:  'HDMI Cables (2m)',
    category: 'Peripherals',
    supplier: 'KGL Electronics',
    stock: 3,
    min:   20,
    iconBg: '#fef3c7',
    icon: `<svg class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/>
           </svg>`,
  },
  {
    product:  'Dell USB Wireless Mouse',
    category: 'Peripherals',
    supplier: 'TechHub Rwanda Ltd.',
    stock: 4,
    min:   15,
    iconBg: '#eff6ff',
    icon: `<svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
               d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
           </svg>`,
  },
  {
    product:  '24-Port Network Switch',
    category: 'Networking',
    supplier: 'Africa IT Supply',
    stock: 1,
    min:   5,
    iconBg: '#f0fdf4',
    icon: `<svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
               d="M8 7h12m0 0l-4-4m4 4l-4 4M4 17h12m0 0l-4-4m4 4l-4 4"/>
           </svg>`,
  },
  {
    product:  'Laptop Power Adapters',
    category: 'Peripherals',
    supplier: 'KGL Electronics',
    stock: 6,
    min:   25,
    iconBg: '#fef2f2',
    icon: `<svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
               d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z
                  m10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2z
                  M6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"/>
           </svg>`,
  },
  {
    product:  'Cat6 Ethernet Cables',
    category: 'Networking',
    supplier: 'Andela Gear Co.',
    stock: 8,
    min:   30,
    iconBg: '#f5f3ff',
    icon: `<svg class="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
               d="M8 7h12m0 0l-4-4m4 4l-4 4M4 17h12"/>
           </svg>`,
  },
]

// ── Deliveries (most-recent 5 shown on dashboard) ──
export const RECENT_SUPPLY = [
  {
    date: '27 Jun 2025', vendor: 'TechHub Rwanda Ltd.', items: 42,
    status: 'Verified', ref: 'DEL-2025-047', loggedBy: 'Admin_01',
    products: [
      { name: 'Dell XPS 15 Laptop',    category: 'Laptops',      qty: 10 },
      { name: 'Samsung 27" Monitor',   category: 'Monitors',     qty: 20 },
      { name: 'Wireless Keyboard Set', category: 'Peripherals',  qty: 12 },
    ],
  },
  {
    date: '24 Jun 2025', vendor: 'KGL Electronics', items: 85,
    status: 'Verified', ref: 'DEL-2025-046', loggedBy: 'Admin_02',
    products: [
      { name: 'HDMI Cables 2m', category: 'Peripherals', qty: 50 },
      { name: 'USB-C Hubs',     category: 'Peripherals', qty: 35 },
    ],
  },
  {
    date: '20 Jun 2025', vendor: 'Africa IT Supply', items: 15,
    status: 'Pending', ref: 'DEL-2025-045', loggedBy: 'Admin_01',
    products: [
      { name: 'Cisco Catalyst Switch 24P', category: 'Networking', qty: 5  },
      { name: 'CAT6 Patch Cables',         category: 'Networking', qty: 10 },
    ],
  },
  {
    date: '18 Jun 2025', vendor: 'Andela Gear Co.', items: 30,
    status: 'Verified', ref: 'DEL-2025-044', loggedBy: 'Admin_03',
    products: [
      { name: 'HP EliteDesk Mini PC', category: 'Desktops', qty: 10 },
      { name: '24" AOC Monitor',      category: 'Monitors', qty: 20 },
    ],
  },
  {
    date: '15 Jun 2025', vendor: 'RwandaTel Systems', items: 20,
    status: 'Verified', ref: 'DEL-2025-043', loggedBy: 'Admin_01',
    products: [
      { name: 'UPS Battery Backup', category: 'Power',      qty: 8  },
      { name: 'Server Rack PDU',    category: 'Networking', qty: 12 },
    ],
  },
]

// ── Extra rows visible only on the full Supply Log page ──
export const EXTRA_SUPPLY = [
  {
    date: '12 Jun 2025', vendor: 'KGL Electronics', items: 60,
    status: 'Verified', ref: 'DEL-2025-042', loggedBy: 'Admin_02',
    products: [
      { name: 'Webcams HD 1080p', category: 'Peripherals', qty: 30 },
      { name: 'Laptop Stands',    category: 'Peripherals', qty: 30 },
    ],
  },
  {
    date: '09 Jun 2025', vendor: 'TechHub Rwanda Ltd.', items: 25,
    status: 'Pending', ref: 'DEL-2025-041', loggedBy: 'Admin_01',
    products: [
      { name: 'MacBook Air M3',       category: 'Laptops',      qty: 5  },
      { name: 'USB-C Docking Station',category: 'Peripherals',  qty: 20 },
    ],
  },
  {
    date: '05 Jun 2025', vendor: 'Africa IT Supply', items: 18,
    status: 'Verified', ref: 'DEL-2025-040', loggedBy: 'Admin_03',
    products: [
      { name: 'TP-Link WiFi Router', category: 'Networking', qty: 8  },
      { name: 'Ethernet Switch 8P',  category: 'Networking', qty: 10 },
    ],
  },
  {
    date: '01 Jun 2025', vendor: 'Andela Gear Co.', items: 50,
    status: 'Verified', ref: 'DEL-2025-039', loggedBy: 'Admin_01',
    products: [
      { name: 'Mechanical Keyboards', category: 'Peripherals', qty: 50 },
    ],
  },
  {
    date: '28 May 2025', vendor: 'RwandaTel Systems', items: 12,
    status: 'Verified', ref: 'DEL-2025-038', loggedBy: 'Admin_02',
    products: [
      { name: 'Power Strip Surge 6-port', category: 'Power', qty: 12 },
    ],
  },
]

export const AUDIT_LOG_INITIAL = [
  {
    type: 'info',
    message: 'New supply DEL-2025-047 logged by Admin_01. 42 units received from TechHub Rwanda Ltd.',
    time: 'Today, 10:45 AM',
  },
  {
    type: 'warning',
    message: 'Stock for "Dell USB Wireless Mouse" manually adjusted from 50 to 4 by Admin_02. Reason: damaged units removed.',
    time: 'Today, 09:12 AM',
  },
  {
    type: 'info',
    message: 'New vendor "RwandaTel Systems" registered by Admin_01.',
    time: 'Yesterday, 4:30 PM',
  },
  {
    type: 'danger',
    message: 'Low stock threshold breached for "24-Port Network Switch" (1 unit remaining). Alert triggered.',
    time: 'Yesterday, 2:15 PM',
  },
  {
    type: 'info',
    message: 'Report "Q2_2025_Asset_Summary.pdf" exported by Admin_03.',
    time: 'Yesterday, 11:00 AM',
  },
  {
    type: 'warning',
    message: 'Login attempt failed for user "staff_07" — 3 consecutive failures. Account temporarily locked.',
    time: '26 Jun 2025, 8:44 AM',
  },
  {
    type: 'info',
    message: 'Asset "HP EliteDesk Mini PC" added to inventory. Initial stock: 10 units. Supplier: Andela Gear Co.',
    time: '25 Jun 2025, 3:00 PM',
  },
  {
    type: 'info',
    message: 'Reorder request for "Cat6 Ethernet Cables" submitted to Andela Gear Co. Qty: 100. Priority: Urgent.',
    time: '24 Jun 2025, 1:22 PM',
  },
]

export const CHART_DATA = {
  labels: ['Laptops & Desktops', 'Monitors', 'Networking', 'Peripherals'],
  values: [38, 27, 20, 15],
  colors: ['#2563eb', '#7c3aed', '#059669', '#d97706'],
}

export const CHART_LEGEND = [
  { label: 'Laptops & Desktops', pct: '38%', color: '#2563eb' },
  { label: 'Monitors & Displays', pct: '27%', color: '#7c3aed' },
  { label: 'Networking Gear',     pct: '20%', color: '#059669' },
  { label: 'Peripherals',         pct: '15%', color: '#d97706' },
]
