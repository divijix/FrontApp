import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://internshipapp-xi.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})