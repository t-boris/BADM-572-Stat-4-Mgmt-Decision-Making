import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves from a subpath; Vercel/Firebase serve from root.
  // Override via VITE_BASE (e.g. VITE_BASE=/BADM-572-Stat-4-Mgmt-Decision-Making/).
  base: process.env.VITE_BASE ?? "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    sourcemap: true,
    chunkSizeWarningLimit: 1400,
  },
});
