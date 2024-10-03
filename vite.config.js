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
                // Workbox options for more advanced caching strategies
            },
        }),
    ],

    assetsInclude: ["**/*.JPG"],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src",
                import.meta.url)),
        },
    },
});