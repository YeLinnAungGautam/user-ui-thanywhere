<template>
  <div class="font-poppins">
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>

    <div v-if="showUpdateNotification" class="update-notification">
      A new version is available. Please
      <button @click="refreshApp">reload</button> the page.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const transitionName = ref("slide-left"); // Default transition
const router = useRouter();
const showUpdateNotification = ref(false);

// Listen to route changes to adjust the transition direction
router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    transitionName.value = ""; // No animation for root path
  } else if (to.path.includes("search")) {
    transitionName.value = "slide-left"; // Slide left for search
  } else {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;

    // Determine transition direction
    transitionName.value = toDepth > fromDepth ? "slide-left" : "slide-right";
  }
  next();
});

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("Service worker registered:", registration);

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        console.log("New service worker found:", newWorker);

        newWorker.addEventListener("statechange", () => {
          console.log("Service worker state changed:", newWorker.state);
          if (newWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log("New content is available; please refresh.");
              showUpdateNotification.value = true;
            } else {
              console.log("Content is cached for offline use.");
            }
          }
        });
      });
    } catch (error) {
      console.error("Service worker registration failed:", error);
    }
  }
};

const checkForUpdates = async () => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    try {
      await registration.update();
      console.log("Service worker updated");
    } catch (error) {
      console.error("Service worker update failed:", error);
    }
  }
};

const refreshApp = () => {
  showUpdateNotification.value = false;
  window.location.reload();
};

onMounted(() => {
  registerServiceWorker();
  // Check for updates every 15 minutes
  setInterval(checkForUpdates, 15 * 60 * 1000);
});
</script>

<style>
/* Update notification style */
.update-notification {
  background: #ff6500;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 20px;
  color: white;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
  border-radius: 5px;
  z-index: 1000;
}

/* Slide left transition effect */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Slide right transition effect */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
