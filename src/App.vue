<template>
  <div class="font-poppins">
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>

    <!-- <div v-if="showUpdateNotification" class="update-notification">
      A new version is available. Please
      <button @click="refreshApp">reload</button> the page.
    </div> -->
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

const checkForUpdates = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.update();
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            showUpdateNotification.value = true;
          }
        });
      });
    });
  }
};

// const refreshApp = () => {
//   window.location.reload();
// };

onMounted(() => {
  checkForUpdates();
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
