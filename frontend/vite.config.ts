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
      "/tarot": "http://localhost:3001/",
      "/users": "http://localhost:3001/",
      "/stream": "http://localhost:3001/",
      "/result": "http://localhost:3001/",
      "/poll": "http://localhost:3001/",
      "/mypage": "http://localhost:3001/",
      "/auth": "http://localhost:3001/",
    },
  },
});
