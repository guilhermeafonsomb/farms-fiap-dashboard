import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { withZephyr } from "vite-plugin-zephyr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    withZephyr({
      mfConfig: {
        name: "dashboard-app",
        filename: "remoteEntry.js",
        exposes: {
          "./FarmsFiapDashboard": "./src/App.tsx",
        },
        shared: {
          react: { singleton: true, requiredVersion: "^19.0.0" },
          "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
          "react-router-dom": { singleton: true },
          "@tanstack/react-query": { singleton: true },
          zustand: { singleton: true },
          clsx: {},
        },
        dts: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    needsInterop: ["react", "@tanstack/react-query", "clsx", "zustand"],
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    assetsDir: "assets",
  },
  server: {
    port: 5001,
  },
  preview: {
    port: 5001,
  },
});
