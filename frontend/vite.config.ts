import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: true,
    proxy: {
      "/tarot": "http://localhost:3001/",
      "/user": "http://localhost:3001/",
    },
  },
});
