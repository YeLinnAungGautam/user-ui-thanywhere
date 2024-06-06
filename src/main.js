import "./assets/main.css";
import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount("#app");
