import "./assets/main.css";
import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceworker.js", { scope: "/" })
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

const CLIENT_ID =
  "342877230214-v1qfnmtvksb5a00dna7jnf6se39f4qpj.apps.googleusercontent.com";

const options = {
  timeout: 1500,
};

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Toast, options)
  .use(vue3GoogleLogin, {
    clientId: CLIENT_ID,
  })
  .mount("#app");
