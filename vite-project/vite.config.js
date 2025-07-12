import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { // 注意：代理配置应该在server选项下
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // 确保路径重写正确
      },
    },
  },
})


