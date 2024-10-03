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

// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//         .register("/serviceworker.js", { scope: "/" })
//         .then((registration) => {
//             console.log("Service Worker registered with scope:", registration.scope);

//             // Add update checking
//             registration.addEventListener("updatefound", () => {
//                 const newWorker = registration.installing;
//                 newWorker.addEventListener("statechange", () => {
//                     if (newWorker.state === "installed") {
//                         if (navigator.serviceWorker.controller) {
//                             showUpdateNotification();
//                         }
//                     }
//                 });
//             });
//         })
//         .catch((error) => {
//             console.error("Service Worker registration failed:", error);
//         });
// }

// Add this function to show the update notification
// function showUpdateNotification() {
//     const toast = useToast();
//     const message = "A new version is available. Click here to update.";
//     toast.warning(message, {
//         timeout: false,
//         closeOnClick: false,
//         draggable: false,
//         closeButton: true,
//         onClick: () => {
//             window.location.reload();
//         },
//     });
// }

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

// Add this to check for updates periodically
setInterval(() => {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: "CHECK_FOR_UPDATE",
        });
    }
}, 60 * 60 * 1000); // Check every hour