/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f13',
        card: '#1a1a24',
        'card-border': '#2a2a3a',
        'card-hover': '#1e1e2e',
        gold: '#f59e0b',
        'gold-light': '#fbbf24',
        'green-trade': '#22c55e',
        'red-trade': '#ef4444',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        'dem-blue': '#3b82f6',
        'rep-red': '#ef4444',
        'ind-purple': '#a855f7',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
