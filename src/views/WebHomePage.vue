<template>
  <div
    class="w-[100vw] h-[100vh] grid grid-cols-2 overflow-hidden bg-gradient-to-t to-[#ff6300] from-[#e61c1c] relative"
  >
    <!-- <img
      :src="line"
      class="w-full h-full absolute top-0 left-0 opacity-10"
      alt=""
    /> -->
    <div class="py-14 px-16 space-y-20 relative">
      <div class="flex justify-start items-center">
        <img :src="logo" class="w-14" alt="" />
        <p class="text-white font-medium tracking-normal text-3xl">
          THAILAND ANYWHERE
        </p>
      </div>
      <div class="space-y-5">
        <p class="text-white font-semibold tracking-normal text-4xl">
          Only available on Mobile
        </p>
        <p class="text-white text-2xl font-medium">Travel App for Thailand</p>
        <p
          class="text-white text-2xl font-medium flex justify-start items-center gap-x-2"
        >
          200+ packages <ArrowRightCircleIcon class="w-10 text-white" />
        </p>
      </div>
      <div class="absolute bottom-10 space-y-3">
        <img :src="icon" alt="" class="w-40" />
        <p class="text-[#ffbd38] font-medium tracking-normal text-2xl">
          Coming soon on
        </p>
        <p class="text-white text-2xl font-medium">Andriod and App stores</p>
      </div>
    </div>
    <div class="pr-14 xl:pr-16">
      <!-- show mobile version with iframe -->
      <div class="flex justify-end w-full h-full relative">
        <iframe
          :src="iframeSrc"
          class="bg-white rounded-[55px] drop-shadow-lg"
          :style="iframeStyle"
          allowfullscreen
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from "@/assets/logo.png";
import icon from "@/assets/icon_download.png";
// import iphone from "@/assets/iphone.png";
// import line from "@/assets/line.png";
import { ArrowRightCircleIcon } from "@heroicons/vue/24/outline";
import { ref, computed, onMounted, onUnmounted } from "vue";

const windowHeight = ref(window.innerHeight);
const iframeSrc = "https://thanywhere.com";

// Define the iPhone 16 Pro aspect ratio
const baseWidth = 452;
const baseHeight = 920;
const aspectRatio = baseWidth / baseHeight;

// Calculate new width and height based on window height
const iframeStyle = computed(() => {
  if (windowHeight.value < baseHeight) {
    const newHeight = windowHeight.value;
    const newWidth = newHeight * aspectRatio;
    return `width: ${newWidth}px; height: ${newHeight}px; transform: scale(0.9); transform-origin: center;`;
  } else {
    return `width: ${baseWidth}px; height: ${baseHeight}px; transform: scale(0.9); transform-origin: center;`;
  }
});

// Update windowHeight on resize
const handleResize = () => {
  windowHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
