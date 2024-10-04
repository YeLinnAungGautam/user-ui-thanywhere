<template>
  <div
    class="h-[500px] overflow-scroll z-20 relative"
    ref="scrollContainer"
    @scroll="updateScrollPosition"
  >
    <div class="space-y-10 pt-5">
      <div
        v-for="d in data"
        :key="d"
        @click="clickFunction(d)"
        class="gap-2 flex justify-between items-center border bg-main/5 border-main rounded-2xl pl-2 mr-1 py-4 shadow-md"
        :class="{
          'flex-row-reverse': d.id % 2 === 0,
          'flex-row': d.id % 2 !== 0,
        }"
      >
        <div class="relative w-[35%]">
          <img
            :src="d.image"
            :alt="d.name"
            class="h-auto absolute -bottom-[36px] z-10 object-cover rounded-lg"
            :class="{
              'w-[100px]': d.id == 1,
              '-left-1 w-[80px]': d.id == 1,
              'w-[68px] left-4': d.id == 2,
              'left-6': d.id == 4,
              'left-2': d.id == 7,
              'w-[80px]': d.id !== 1 && d.id !== 2,
            }"
          />
          <img
            :src="background"
            :class="d.id == 4 || d.id == 2 ? 'left-4' : ''"
            class="absolute w-[89px] z-0 -bottom-[49px]"
            alt=""
          />
        </div>
        <div class="col-span-2 w-[65%]">
          <p class="text-base line-clamp-1 font-semibold">{{ d.name }}</p>
          <p class="text-xs text-main font-medium line-clamp-1">{{ d.role }}</p>
        </div>
      </div>
    </div>

    <div
      class="fixed z-30 right-0.5 transform cursor-pointer"
      :style="{ top: `${buttonPosition}px` }"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div
        :class="[
          'bg-main text-white px-1 py-4 rounded',
          { 'bg-orange-500': isHovering },
        ]"
      >
        ⋮
      </div>
    </div>
  </div>
</template>

<script setup>
import data from "./db";
import background from "../../assets/s/Background item.png";
import { defineProps, onMounted, ref } from "vue";

const props = defineProps({
  type: String,
});

const buttonPosition = ref(100); // Reactive property for button position
const isHovering = ref(false); // Reactive property for hover state
const scrollContainer = ref(null);
let isDragging = false;
let startY = 0;
let scrollStartPosition = 0;

// Initialize button position to the top of the container (0px)
const initButtonPosition = () => {
  buttonPosition.value = 100; // Start at 0px
};

const updateScrollPosition = () => {
  // Update button position based on the scroll position
  // Set minimum position if desired; otherwise, it can go up to 0px
  buttonPosition.value = Math.max(100, scrollContainer.value.scrollTop); // Button starts at 0px
};

const clickFunction = (item) => {
  console.log("====================================");
  console.log(item);
  console.log("====================================");
  if (props.type === "viber" && item.viber) {
    // Encode the phone number to ensure it's URL-safe
    const phoneNumber = encodeURIComponent(item.viber);
    const viberUrl = `viber://chat?number=${phoneNumber}`;

    // Try opening the Viber chat
    const newWindow = window.open(viberUrl, "_blank");

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed == "undefined"
    ) {
      alert(
        "Unable to open Viber. Please ensure the Viber app is installed and try again."
      );
    }

    alert("Message copied to clipboard. Paste it into Viber manually.");
  } else if (props.type === "whatsapp" && item.whatsApp) {
    // Encode the phone number to ensure it's URL-safe
    const phoneNumber = encodeURIComponent(item.whatsApp);
    const viberUrl = `https://wa.me/${phoneNumber}`;

    // Try opening the Viber chat
    const newWindow = window.open(viberUrl, "_blank");

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed == "undefined"
    ) {
      alert(
        "Unable to open Viber. Please ensure the Viber app is installed and try again."
      );
    }
  } else if (props.type === "phone" && item.phone) {
    // Encode the phone number to ensure it's URL-safe
    window.open(`tel:${item.phone}`, "_self");
  }
};

const startDrag = (event) => {
  isDragging = true;
  startY =
    event.type === "mousedown" ? event.clientY : event.touches[0].clientY;
  scrollStartPosition = scrollContainer.value.scrollTop;

  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag);
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
};

const drag = (event) => {
  if (!isDragging) return;

  const currentY =
    event.type === "mousemove" ? event.clientY : event.touches[0].clientY;
  const deltaY = startY - currentY;
  scrollContainer.value.scrollTop = scrollStartPosition + deltaY;

  // Update button position during dragging
  updateScrollPosition();
};

const stopDrag = () => {
  isDragging = false;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
};

onMounted(() => {
  // Set initial button position after mounting
  initButtonPosition();
  updateScrollPosition(); // Ensure correct position at start
});
</script>

<style>
.bg-orange-500 {
  background-color: orange; /* Change this to your desired hover color */
}
</style>
