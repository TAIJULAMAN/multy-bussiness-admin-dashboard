import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "10.10.20.72",
    port: '3000',
  },
  plugins: [react(), tailwindcss()],
});
