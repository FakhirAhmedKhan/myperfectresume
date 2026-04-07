import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'framer-vendor';
            }
            if (id.includes('html2pdf.js')) {
              return 'html2pdf-vendor';
            }
            if (id.includes('tailwindcss')) {
              return 'tailwindcss-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
  },
})
