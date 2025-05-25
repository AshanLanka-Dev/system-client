import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5002,
    proxy: {
      "/api/v1": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        // cookiePathRewrite: {
        //   "*": "/",
        // },
      },
    },
  },
});
