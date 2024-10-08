import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [vue()],

    assetsInclude: ["**/*.JPG", "**/*.png", "**/*.svg", "**/*.webp", "**/*.jpg"],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src",
                import.meta.url)),
        },
    },

    server: {
        hmr: {
          overlay: false,
        },
        headers: {
          'Cache-Control': 'no-store',
        },
    }
});
