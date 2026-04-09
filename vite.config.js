import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) {
              return "framer-vendor";
            }
            if (id.includes("html2pdf.js")) {
              return "html2pdf-vendor";
            }
            if (id.includes("tailwindcss")) {
              return "tailwindcss-vendor";
            }
            if (id.includes("react")) {
              return "react-vendor";
            }
            if (id.includes("react-dom")) {
              return "react-dom-vendor";
            }
            if (id.includes("react-router-dom")) {
              return "react-router-dom-vendor";
            }
            if (id.includes("tesseract")) {
              return "tesseract-vendor";
            }
            if (id.includes("pdfjs-dist")) {
              return "pdfjs-dist-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
