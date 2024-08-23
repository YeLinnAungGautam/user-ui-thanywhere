<template>
  <!-- <button class="btn btn-dark ms-auto" type="button" @click="login">
    Login
  </button> -->
  <div class="relative" @click="login">
    <img
      :src="google"
      class="w-5 h-5 object-cover absolute top-3 left-6"
      alt=""
    />
    <button
      class="py-3 text-center w-full text-sm font-medium bg-background text-black/80 border border-black/30 rounded-lg"
    >
      continue with google
    </button>
  </div>
</template>

<script setup>
import google from "../assets/icons/Social_icon/icons8-google-48.png";
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useToast } from "vue-toastification";

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const login = async () => {
  // Open the popup window immediately to avoid being blocked by the browser
  const newWindow = openWindow("", "Login");

  try {
    // Fetch the Google OAuth URL
    const res = await authStore.getGoogleLink();
    const url = res.data.data.url;

    // Set the popup's location to the OAuth URL
    newWindow.location.href = url;
  } catch (error) {
    console.error("Failed to get Google OAuth link", error);
    newWindow.close();
  }
};

const onMessage = (e) => {
  // Adjust this to allow for different origins if necessary
  if (e.origin !== "https://api-blog.thanywhere.com" || !e.data.token) {
    return;
  }

  console.log("Token received:", e.data.token);
  toast.success(`success login , thank you from thanywhere! `);
  // Perform your token saving here
  // store.dispatch("auth/saveToken", { token: e.data.token });

  authStore.googleSignToken(e.data.token);

  if (localStorage.getItem("thany_token")) {
    setTimeout(() => {
      router.push({ name: "ProfileVuePage" });
    }, 3000);
  }
};

onMounted(() => {
  window.addEventListener("message", onMessage, false);
});

onBeforeUnmount(() => {
  window.removeEventListener("message", onMessage);
});

function openWindow(url, title, options = {}) {
  if (typeof url === "object") {
    options = url;
    url = "";
  }

  options = { url, title, width: 600, height: 720, ...options };

  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screen.top;
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    window.screen.width;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    window.screen.height;

  options.left = width / 2 - options.width / 2 + dualScreenLeft;
  options.top = height / 2 - options.height / 2 + dualScreenTop;

  const optionsStr = Object.keys(options)
    .reduce((acc, key) => {
      acc.push(`${key}=${options[key]}`);
      return acc;
    }, [])
    .join(",");

  const newWindow = window.open(url, title, optionsStr);

  if (!newWindow) {
    alert("Popup blocked. Please allow popups for this website.");
    return null;
  }

  if (window.focus) {
    newWindow.focus();
  }

  return newWindow;
}
</script>
