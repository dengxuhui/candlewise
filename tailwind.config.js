/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f1117',
        'bg-card': '#1a1d27',
        'bg-hover': '#21263a',
        green: {
          primary: '#00c896',
          dim: '#00a87e',
        },
        red: {
          primary: '#ff4d6a',
          dim: '#d93a55',
        },
        border: '#2a2d3a',
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
