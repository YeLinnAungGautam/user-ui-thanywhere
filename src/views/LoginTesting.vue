<template>
  <button class="btn btn-dark ms-auto" type="button" @click="login">
    Login with Google
  </button>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  try {
    // Fetch Google OAuth URL
    const res = await authStore.getGoogleLink();
    const url = res.data.data.url;

    // Open new window
    const newWindow = window.open(url, "Google Login", "width=600,height=600");

    if (!newWindow) {
      alert("Popup blocked. Please allow popups for this website.");
      return;
    }

    // Listen for messages
    const onMessage = (event) => {
      if (
        event.origin !== "https://api-blog.thanywhere.com" ||
        !event.data.token
      ) {
        return;
      }

      if (event.data.token) {
        localStorage.setItem("auth_token", event.data.token);
        router.push({ name: "home" });
        newWindow.close(); // Close the popup window
      }
    };

    window.addEventListener("message", onMessage, false);

    onBeforeUnmount(() => {
      window.removeEventListener("message", onMessage);
    });
  } catch (error) {
    console.error("Google OAuth failed", error);
  }
};

const onMessage = (event) => {
  if (event.origin !== window.location.origin) {
    return;
  }

  if (event.data.token) {
    localStorage.setItem("auth_token", event.data.token);
    router.push({ name: "home" });
    // Close the popup window
  }
};

onMounted(() => {
  window.removeEventListener("message", onMessage);
});
</script>

<style scoped>
/* Add your styles here */
</style>
