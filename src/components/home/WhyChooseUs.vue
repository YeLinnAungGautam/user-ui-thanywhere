<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-main font-semibold px-6">why choose thanywhere</h1>
    </div>
    <div
      class="flex flex-1 justify-start space-x-3 mt-6 items-center overflow-x-scroll scroll-container"
    >
      <div
        class="bg-white shadow rounded-3xl mb-3 px-2 pt-2"
        :class="index == 0 ? 'ml-6' : 'ml-0'"
        v-for="(i, index) in data"
        :key="i"
      >
        <div class="w-[200px] space-y-2 py-3 px-2">
          <img :src="i.image" class="w-[80px] mx-auto h-auto" alt="" />
          <p class="text-sm font-semibold">{{ i.title }}</p>
          <p class="text-xs font-medium text-black/80 text-left">
            {{ i.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import image1 from "../../assets/s/Discover_the_possibilities.webp";
import image2 from "../../assets/s/Enjoy_deals_delights.webp";
import image3 from "../../assets/s/Exploring_made_easy.webp";
import image4 from "../../assets/s/Travel_you_can_trust.webp";

const data = [
  {
    id: 1,
    title: "Discover the possibilities",
    description:
      "With nearly half a million attractions, hotels & more, you're sure to find joy.",
    image: image1,
  },
  {
    id: 2,
    title: "Enjoy deals & delights",
    description:
      "Quality activities. Great prices. Plus, earn Klook credits to save more.",
    image: image2,
  },
  {
    id: 3,
    title: "Exploring made easy",
    description:
      "Book last minute, skip lines & get free cancellation for easier exploring.",
    image: image3,
  },
  {
    id: 4,
    title: "Travel you can trust",
    description:
      "Read reviews & get reliable customer support. We're with you at every step.",
    image: image4,
  },
];
</script>
