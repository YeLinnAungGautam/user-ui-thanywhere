import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: "js/[name].[hash].js",
                entryFileNames: "js/[name].[hash].js",
                assetFileNames: "assets/[name].[hash].[ext]",
            },
            external: ["vue-toastification"],
        },
    },
    define: {
        "process.env.VERSION": JSON.stringify("1.0.1"),
    },

    assetsInclude: ["**/*.JPG", "**/*.png", "**/*.svg", "**/*.webp", "**/*.jpg"],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src",
                import.meta.url)),
        },
    },
});