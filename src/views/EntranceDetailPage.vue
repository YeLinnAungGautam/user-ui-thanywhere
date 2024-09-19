<template>
  <div class="relative h-[100vh] w-[100vw] overflow-hidden">
    <!-- Image Div -->
    <div class="absolute w-full h-[50vh] top-0 z-0 bg-blue-400">
      <img
        src="https://via.placeholder.com/800x600"
        alt="Detail Image"
        class="object-cover w-full h-full"
      />
    </div>

    <!-- Content Div (Hold and Place for both Web & Mobile) -->
    <div
      class="absolute left-0 right-0 bg-white h-full z-50 shadow-lg p-6 rounded-md transition-all duration-500"
      :style="{ top: contentTop + 'px' }"
    >
      <div
        class="w-[300px] h-4 bg-black"
        @mousedown="startHold"
        @touchstart="startHold"
      ></div>
      <h1 class="text-2xl font-bold">Content</h1>
      <p>
        Hold and drag to move the content div up and down (supports mobile).
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Track the current position of the content div
const contentTop = ref(500);

// Track whether the user is holding the div
const isHolding = ref(false);

// Track the initial touch/mouse position for correct calculations
let startY = 0;
let startTop = 0;

// Start holding (mouse down or touch start)
const startHold = (event) => {
  isHolding.value = true;

  // Get the Y position based on the event type (mouse or touch)
  if (event.type === "mousedown") {
    startY = event.clientY;
  } else if (event.type === "touchstart") {
    startY = event.touches[0].clientY;
  }

  // Capture the current top position of the content div
  startTop = contentTop.value;

  // Add listeners for movement and stopping
  window.addEventListener("mousemove", handleMove);
  window.addEventListener("touchmove", handleMove);
  window.addEventListener("mouseup", stopHold);
  window.addEventListener("touchend", stopHold);
};

// Handle movement during hold (mouse move or touch move)
const handleMove = (event) => {
  if (isHolding.value) {
    let currentY = 0;

    // Get the current Y position based on the event type
    if (event.type === "mousemove") {
      currentY = event.clientY;
    } else if (event.type === "touchmove") {
      currentY = event.touches[0].clientY;
    }

    // Calculate the new top position by adjusting the difference
    contentTop.value = startTop + (currentY - startY);
  }
};

// Stop holding (mouse up or touch end)
const stopHold = () => {
  isHolding.value = false;

  // Remove listeners after the action is complete
  window.removeEventListener("mousemove", handleMove);
  window.removeEventListener("touchmove", handleMove);
  window.removeEventListener("mouseup", stopHold);
  window.removeEventListener("touchend", stopHold);
};
</script>

<style scoped>
/* Optional styling */
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
</style>
