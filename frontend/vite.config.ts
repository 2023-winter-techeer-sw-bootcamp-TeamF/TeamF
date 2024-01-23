import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false,
    port: 5000,
    host: true,
    proxy: {
      "/api": "http://localhost:3001/",
    },
  },
});
