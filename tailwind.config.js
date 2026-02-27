/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        sans:    ['DM Sans', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0f1d35',
          light:   '#162540',
        },
        accent: {
          DEFAULT: '#2563eb',
          light:   '#eff6ff',
        },
      },
    },
  },
  plugins: [],
}
