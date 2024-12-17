import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://api.satvikraas.com", // Proxy to the HTTP API server
    },
    historyApiFallback: true, // This ensures all routes go to index.html
  },
});
