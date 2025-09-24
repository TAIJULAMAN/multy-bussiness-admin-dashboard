import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
 
export default defineConfig({

  server: {

    host: "0.0.0.0",

    port: 3000,

  },

  plugins: [react(), tailwindcss()],

  preview: {

    port: 4174, // or your chosen port

    host: "0.0.0.0", // make sure it listens on all interfaces

    allowedHosts: [

      "admin.profitablebusinessesforsale.com", 

    ],

  },

});

 