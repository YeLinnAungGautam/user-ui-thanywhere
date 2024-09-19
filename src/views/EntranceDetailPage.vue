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

    <!-- Content Div (Hold to move) -->
    <div
      class="absolute left-0 right-0 bg-white h-full z-50 shadow-lg p-6 rounded-md transition-all duration-500"
      :style="{ top: contentTop + 'px' }"
    >
      <div
        @mousedown="startHold"
        class="w-[200px] h-4 bg-black rounded-3xl mx-auto"
      ></div>
      <h1 class="text-2xl pt-10 font-bold">Content</h1>
      <p>Hold and drag to move the content div up and down.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Track the current position of the content div
const contentTop = ref(348);

// Flag to track if the user is holding the content div
const isHolding = ref(false);

// Start holding (click and hold the div)
const startHold = () => {
  isHolding.value = true;

  // Start tracking mouse movements
  window.addEventListener("mousemove", handleMove);

  // Stop holding when mouse button is released
  window.addEventListener("mouseup", stopHold);
};

// Handle moving the content div as the mouse moves
const handleMove = (event) => {
  if (isHolding.value) {
    // Update content position based on the mouse's Y position
    if (event.clientY > 348) {
      contentTop.value = 348;
    } else if (event.clientY < 300) {
      contentTop.value = 0;
    } else {
      contentTop.value = 348;
    }
    // contentTop.value = event.clientY;
  }
};

// Stop holding the div (when mouse button is released)
const stopHold = () => {
  isHolding.value = false;

  // Remove event listeners when the user releases the mouse
  window.removeEventListener("mousemove", handleMove);
  window.removeEventListener("mouseup", stopHold);
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
