<template>
  <div class="font-poppins">
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const transitionName = ref("slide-left"); // Default transition

const router = useRouter();

// Listen to route changes to adjust the transition direction
router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    // Disable transition for the root path
    transitionName.value = ""; // No animation
  } else if (to.path.includes("search")) {
    // Set slide-left transition for any path that includes 'search'
    transitionName.value = "slide-left";
  } else {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;

    // Determine the direction based on path depth (can be customized)
    if (toDepth > fromDepth) {
      transitionName.value = "slide-left"; // Navigating forward
    } else {
      transitionName.value = "slide-right"; // Navigating backward
    }
  }
  next();
});
</script>

<style>
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
