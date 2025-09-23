import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [react(), tailwindcss()],
  allowOrigin: [
    'https://admin.profitablebusinessesforsale.com',
  ],
  preview: {
    allowedHosts: [
      'admin.profitablebusinessesforsale.com', // your dashboard domain
    ]
  }
});

// import tailwindcss from "@tailwindcss/vite";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   server: {
//     host: "0.0.0.0",
//     port: 3000, // port should be number, not string
//   },
//   preview: {
//     allowedHosts: [
//       "admin.profitablebusinessesforsale.com", // your dashboard domain
//       "profitablebusinessesforsale.com",       // main domain (optional)
//       "www.profitablebusinessesforsale.com"    // www version (optional)
//     ]
//   },
//   plugins: [react(), tailwindcss()],
// });
