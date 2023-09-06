import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { join } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      "@/": join(__dirname, "src/"),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
