import "./assets/main.css";
import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

axios.defaults.baseURL =
    import.meta.env.VITE_API_URL;
import { createPinia } from "pinia";

const token = localStorage.getItem("thany_token");
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const options = {
    timeout: 1500,
};

// ... rest of the existing code ...

const app = createApp(App);

// Add this to make the toast accessible in components
app.config.globalProperties.$toast = useToast();

app
    .component("VueDatePicker", VueDatePicker)
    .use(createPinia())
    .use(router)
    .use(Toast, options)
    .mount("#app");