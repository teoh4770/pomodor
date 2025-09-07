import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/pomodor",
  // ... other configurations
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }
});
