// ─────────────────────────────────────────
//  ULK IT Dashboard — Entry Point
//  src/main.js
// ─────────────────────────────────────────

// 1. Global styles (Tailwind + custom CSS)
import './style.css'

// 2. Alpine.js
import Alpine from 'alpinejs'

// 3. Our app factory
import { createApp } from './alpine-app.js'

// Expose the factory function globally so Alpine's
// x-data="app()" attribute in the HTML can find it.
window.app = createApp

// Boot Alpine
window.Alpine = Alpine
Alpine.start()
