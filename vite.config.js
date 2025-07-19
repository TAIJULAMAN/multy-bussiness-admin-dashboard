import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "localhost",
    port: '3000',
  },
  plugins: [react(), tailwindcss()],
});
