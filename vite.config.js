import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "10.0.60.25",
    // host: "10.0.60.189",
    port: '3000',
  },
  plugins: [react(), tailwindcss()],
});
