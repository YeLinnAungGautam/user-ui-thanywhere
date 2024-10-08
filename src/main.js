import { createApp } from "vue";
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";
import { createPinia } from "pinia";

axios.defaults.baseURL =
    import.meta.env.VITE_API_URL;

const token = localStorage.getItem("thany_token");
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const options = {
    timeout: 1500,
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister().then(function(boolean) {
          console.log('Service Worker unregistered:', boolean);
        });
      }
    }).catch(function(error) {
      console.log('Service Worker unregistration failed:', error);
    });
  }

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
