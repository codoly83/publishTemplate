/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendUrl = env.VITE_BACKEND_URL || "http://localhost:8080";

  return {
    plugins: [react(), svgr(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    // server: {
    //   proxy: {
    //     // Proxy /api requests to backend server when not using mock
    //     "/api": {
    //       target: backendUrl,
    //       changeOrigin: true,
    //       secure: false,
    //     },
    //   },
    // },
    test: {
      environment: "jsdom",
      setupFiles: "./vitest.setup.ts",
    },
  };
});
