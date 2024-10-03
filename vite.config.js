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
                icons: [{
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
                cleanupOutdatedCaches: true,
                skipWaiting: true,
                clientsClaim: true,
                runtimeCaching: [{
                    urlPattern: /^https:\/\/api-blog\.thanywhere\.com\/api\/v2\//,
                    handler: "NetworkFirst",
                    options: {
                        cacheName: "api-cache",
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60 * 60, // 1 day
                        },
                    },
                }, ],
            },
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
            "@": fileURLToPath(new URL("./src",
                import.meta.url)),
        },
    },
});