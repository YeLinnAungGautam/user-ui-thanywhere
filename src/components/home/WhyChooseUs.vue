<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-main font-semibold px-6">why book with us</h1>
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
          <p
            class="text-[10px] font-medium h-auto line-clamp-3 text-black/80 text-left"
          >
            {{ i.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import image1 from "../../assets/s/discover thailand.svg";
import image2 from "../../assets/s/get best prices.svg";
import image3 from "../../assets/s/book with confidence.png";
import image4 from "../../assets/s/travel with trust.svg";
import image5 from "../../assets/s/growing with you.svg";

const data = [
  {
    id: 1,
    title: "Book with Confidence",
    description:
      "Our team of trained agents are with you at every step of the way. Making your trip safe and easy.",
    image: image3,
  },
  {
    id: 2,
    title: "Travel with Trust",
    description:
      "TAT licensed and direct partnership allows us to resolve all matters at hand bringing you peace of mind.",
    image: image4,
  },
  {
    id: 3,
    title: "Discover Thailand",
    description:
      "Explore from hundreds of tours, attractions, hotels and destinations around Thailand.",
    image: image1,
  },
  {
    id: 4,
    title: "Get best prices",
    description:
      "Get great prices that are cheaper than walk-ins and save more on your next trip.",
    image: image2,
  },
  {
    id: 5,
    title: "Growing with You",
    description:
      "Our global team and many more are working around the clock to improve travel experience.",
    image: image5,
  },
];
</script>
