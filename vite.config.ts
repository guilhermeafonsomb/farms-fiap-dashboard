import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ModuleFederationOptions, withZephyr } from "vite-plugin-zephyr";
import { federation } from "@module-federation/vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "path";

const mfConfig: ModuleFederationOptions = {
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
  manifest: true,
  dts: false,
};

export default defineConfig({
  base: process.env.ZE_PUBLIC_PATH || "/",
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    process.env.SKIP_ZEPHYR === "true"
      ? federation(mfConfig)
      : withZephyr({ mfConfig }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    needsInterop: ["react", "@tanstack/react-query", "clsx", "zustand"],
  },
  experimental: {
    renderBuiltUrl() {
      return { relative: true };
    },
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
