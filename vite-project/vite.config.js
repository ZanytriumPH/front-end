import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: { // 配置开发服务器的行为
    proxy: { // 配置服务器代理，解决跨域问题或简化 API 请求路径
      '/api': { // 匹配所有以 /api 开头的请求
        target: 'http://127.0.0.1:7001', // 代理目标
        changeOrigin: true, // 是否改变请求头中的 Origin

        // 后端 API 直接以根路径开头，像/users、/products这样，而你又想在前端使用/api作为前缀时，就必须进行路径重写。
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})


