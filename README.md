# ULK IT Department — Asset Management Dashboard

A production-ready IT asset management dashboard built for
**Kigali Independent University** computer science labs.

---

## Tech Stack

| Tool | Role |
|---|---|
| **Vite 5** | Dev server + build bundler |
| **Tailwind CSS 3** | Utility-first styling |
| **Alpine.js 3** | Reactive UI / state management |
| **Chart.js 4** | Doughnut asset distribution chart |
| **DM Sans + Syne** | Typography (via Google Fonts) |

---

## Project Structure

```
ulk-it-dashboard/
│
├── index.html              ← App shell (pure markup, no inline scripts)
│
├── src/
│   ├── main.js             ← Entry point: imports CSS, boots Alpine
│   ├── style.css           ← Global styles, CSS variables, component classes
│   ├── alpine-app.js       ← All Alpine reactive logic (createApp factory)
│   └── data.js             ← Static/mock data (supply records, alerts, audit log)
│
├── tailwind.config.js      ← Tailwind theme (fonts, colours)
├── postcss.config.js       ← PostCSS (Tailwind + Autoprefixer)
├── vite.config.js          ← Vite dev server + build settings
└── package.json            ← Dependencies & npm scripts
```

### Why this separation?

| File | What lives here |
|---|---|
| `index.html` | **Structure only** — all `x-data`, `x-show`, `x-for` directives, no `<script>` blocks |
| `src/style.css` | CSS custom properties (`--navy`, `--accent` …), reusable classes (`.btn`, `.card`, `.badge`, `.trow`) and animations |
| `src/data.js` | All mock records exported as named constants — easy to swap for real API calls |
| `src/alpine-app.js` | Single `createApp()` factory exposed as `window.app` — all open/close handlers, computed getters, `init()` for Chart.js |
| `src/main.js` | Glue: imports CSS, imports factory, registers `window.app`, starts Alpine |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:3000)
npm run dev

# 3. Production build → dist/
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## Swapping Mock Data for a Real API

All data lives in `src/data.js` as plain JS arrays/objects.
To connect to a backend, replace the exports with async fetch calls:

```js
// src/data.js  — example API swap
export async function fetchLowStockAlerts() {
  const res = await fetch('/api/alerts/low-stock')
  return res.json()
}
```

Then in `src/alpine-app.js`, call it inside `init()`:

```js
async init() {
  this.lowStockAlerts = await fetchLowStockAlerts()
  // … rest of init
}
```

---

## Dashboard Sections

1. **KPI Cards** — Total Assets, Low Stock Alerts, Suppliers, Recent Deliveries. Each has an Edit modal.
2. **Critical Low Inventory** — Live alert panel with pre-filled Reorder modal. Submitting a reorder appends to the audit trail automatically.
3. **Asset Distribution** — Chart.js doughnut by category with custom legend.
4. **Recent Supply Activity** — Last 5 deliveries. Clicking any row opens a Delivery Detail modal.
5. **Security Audit Trail** — Scrollable event log with info / warning / danger indicators.
6. **Quick Actions** — Top-bar buttons open Log Delivery, Add Hardware, and Register Vendor forms.
7. **See All / Supply Log page** — Full overlay page with search, status filter, and paginated table.
