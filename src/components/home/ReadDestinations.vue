<template>
  <div>
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-main font-semibold px-6">read about destinations</h1>
      <div
        class="text-[10px] font-semibold text-main flex mr-6 justify-end items-center gap-1"
      >
        see more <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div class="py-4">
      <carousel v-bind="settings" :breakpoints="breakpoints">
        <slide v-for="slide in 10" :key="slide">
          <div :class="slide == 1 ? 'ml-6' : 'ml-3'">
            <DestinationCartVue />
          </div>
        </slide>

        <template #addons>
          <pagination />
        </template>
      </carousel>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import DestinationCartVue from "./DestinationCart.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";

const settings = {
  itemsToShow: 1.8,
  snapAlign: "center",
};

const breakpoints = {
  400: {
    itemsToShow: 2.4,
    snapAlign: "center",
  },
  500: {
    itemsToShow: 2.8,
    snapAlign: "center",
  },
  600: {
    itemsToShow: 3.5,
    snapAlign: "center",
  },
  700: {
    itemsToShow: 4,
    snapAlign: "center",
  },
  800: {
    itemsToShow: 4.5,
    snapAlign: "center",
  },
  // 700px and up
  900: {
    itemsToShow: 5,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: "center",
  },
  1124: {
    itemsToShow: 6,
    snapAlign: "center",
  },
};
</script>
