<template>
  <div class="cursor-pointer">
    <div
      class="grid grid-cols-4 gap-2 px-[50px] border border-black/10 py-3 bg-white"
    >
      <div class="col-span-3">
        <Carousel
          v-bind="settings"
          :breakpoints="breakpoints"
          :wrap-around="true"
        >
          <Slide v-for="slide in 10" :key="slide">
            <div class="carousel__item cursor-pointer">
              <div>
                <HomeModernIcon class="w-6 h-6 mx-auto" />
                <p class="text-[10px]">Name example</p>
              </div>
            </div>
          </Slide>

          <template #addons> </template>
        </Carousel>
      </div>
      <div class="flex justify-between items-center gap-4 pr-6">
        <div class="">
          <ArrowsRightLeftIcon class="w-6 h-6" />
        </div>
        <div
          class="flex justify-between items-center w-20 border border-black/10 px-2 py-2 rounded-xl"
        >
          <AdjustmentsHorizontalIcon class="w-6 h-6" />
          <p class="text-xs">Filter</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
import {
  HomeModernIcon,
  HeartIcon,
  AdjustmentsHorizontalIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/vue/24/outline";

const settings = {
  itemsToShow: 1,
  snapAlign: "center",
};

const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 3.5,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: 8,
    snapAlign: "start",
  },
};
</script>
