import "./assets/main.css";
import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
import { createPinia } from "pinia";

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/serviceworker.js", { scope: "/" })
//     .then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }

const options = {
  timeout: 1500,
};

createApp(App).use(createPinia()).use(router).use(Toast, options).mount("#app");
