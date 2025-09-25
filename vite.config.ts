import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "dashboard-app",
      filename: "remoteEntry.js",
      exposes: {
        "./FarmsFiapDashboard": "./src/App.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "tailwindcss",
        "postcss",
        "autoprefixer",
        "react-router-dom",
        "@tanstack/react-query",
        "clsx",
        "zustand",
        "appwrite",
      ],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    assetsDir: "assets",
  },
  server: {
    port: 5001,
  },
});
