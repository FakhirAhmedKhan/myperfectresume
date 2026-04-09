import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: process.env.GH_PAGES ? "/myperfectresume/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
  rolldownOptions: {
    output: {
      advancedChunks: {
        groups: [
          { name: "react-vendor", test: /node_modules[\\/](react|react-dom)[\\/]/ },
          { name: "router-vendor", test: /node_modules[\\/]react-router-dom[\\/]/ },
          { name: "framer-vendor", test: /node_modules[\\/]framer-motion[\\/]/ },
          { name: "pdfjs-dist-vendor", test: /node_modules[\\/]pdfjs-dist[\\/]/ },
          { name: "tesseract-vendor", test: /node_modules[\\/]tesseract\.js[\\/]/ },
          { name: "html2pdf-vendor", test: /node_modules[\\/]html2pdf\.js[\\/]/ },
        ],
      },
    },
  },
}
});
