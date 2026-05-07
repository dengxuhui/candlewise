import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 部署时仓库名作为 base 路径
// 本地开发时 base='/' 也可正常工作
export default defineConfig({
  plugins: [react()],
  base: '/candlewise/',
})
