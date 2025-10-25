import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",

    port: 3000,

    allowedHosts: ["admin.profitablebusinessesforsale.com"],
  },

  plugins: [react(), tailwindcss()],

  preview: {
    port: 4174,

    host: "0.0.0.0",

    allowedHosts: ["admin.profitablebusinessesforsale.com"],
  },
});
