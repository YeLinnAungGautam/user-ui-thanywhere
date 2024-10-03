import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Thanywhere.com",
        short_name: "thanywhere",
        theme_color: "#FF5B00",
        background_color: "#FF5B00",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "web-logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "web-logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "document" ||
              request.destination === "script" ||
              request.destination === "style",
            handler: "NetworkFirst", // Ensures fresh content by fetching from the network first
            options: {
              cacheName: "app-cache",
              expiration: {
                maxEntries: 50, // Optional: limit the number of cache entries
                maxAgeSeconds: 24 * 60 * 60, // Optional: set max cache age to one day
              },
            },
          },
        ],
        cleanupOutdatedCaches: true, // Automatically cleans up outdated caches
        skipWaiting: true, // Forces the new service worker to take control immediately
        clientsClaim: true, // Allows the service worker to control all clients as soon as it is activated
      },
      injectRegister: "auto",
      // Add this to exclude certain files from being cached
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      globIgnores: ["**/node_modules/**/*", "**/sw.js", "**/workbox-*.js"],
    }),
  ],

  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
      },
    },
  },

  assetsInclude: ["**/*.JPG"],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
