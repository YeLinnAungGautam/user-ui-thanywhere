<template>
  <div class="font-poppins">
    <div
      v-if="showUpdateNotification"
      class="flex justify-between items-center p-4 bg-white shadow-lg"
    >
      <p class="text-xs text-gray-500">
        A new version is available. Please reload the page.
      </p>
      <button
        @click="refreshApp"
        class="text-xs text-white bg-main rounded-md px-2 py-1"
      >
        reload
      </button>
    </div>
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { registerSW } from "virtual:pwa-register";

const transitionName = ref("slide-left"); // Default transition
const router = useRouter();
const showUpdateNotification = ref(false);

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

// Listen to route changes to adjust the transition direction
// const updateSW = registerSW({
//   immediate: true,
//   onNeedRefresh() {
//     showUpdateNotification.value = true;
//   },
//   onOfflineReady() {
//     console.log("Content is cached for offline use.");
//   },
// });

// const refreshApp = () => {
//   updateSW(true);
//   showUpdateNotification.value = false;
// };

onMounted(() => {
  // setInterval(() => updateSW(true), 15 * 60 * 1000);
});
</script>

<style>
/* Update notification style */

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
