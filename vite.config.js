import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { qrcode } from 'vite-plugin-qrcode'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  plugins: [react(), qrcode()],
  base: '/candlewise/',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
})
