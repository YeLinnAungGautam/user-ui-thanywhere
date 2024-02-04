<template>
  <div class="rounded-2xl relative overflow-hidden">
    <!-- <div
      class="absolute bottom-4 right-4 bg-white rounded-xl border flex justify-center items-center gap-3 border-black px-2 py-2"
    >
      <RectangleGroupIcon class="w-6 h-6" />show all photos
    </div> -->
    <div class="h-auto w-full bg-black relative">
      <Carousel :wrap-around="true">
        <Slide v-for="slide in image" :key="slide">
          <div
            class="carousel__item h-[300px] sm:h-[400px] md:h-[450px] w-full relative text-center bg-center"
          >
            <img :src="slide" alt="" class="h-full w-full object-cover" />
          </div>
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import {
  HeartIcon,
  ArrowUpTrayIcon,
  GlobeAltIcon,
  RectangleGroupIcon,
} from "@heroicons/vue/24/outline";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

import { ref, defineProps, defineEmits, onMounted } from "vue";

const props = defineProps({
  image: Object,
});

// const slide = [
//   {
//     id: 1,
//     image:
//       "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc28d53c20964e9d7e79285c476ad74ab.cdn.bubble.io%2Ff1701321844319x375539512012161150%2FPTY-Cau-012.jpg?w=384&h=&auto=compress&dpr=1.25&fit=max",
//   },
//   {
//     id: 2,
//     image:
//       "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc28d53c20964e9d7e79285c476ad74ab.cdn.bubble.io%2Ff1692769141492x556043665158201300%2FAYU-Cau-1.jpg?w=384&h=&auto=compress&dpr=1.25&fit=max",
//   },
//   {
//     id: 3,
//     image:
//       "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc28d53c20964e9d7e79285c476ad74ab.cdn.bubble.io%2Ff1692701497306x948823093388460700%2FCHM-002-Fly.jpg?w=384&h=&auto=compress&dpr=1.25&fit=max",
//   },
// ];
</script>

<style scoped>
.carousel__slide {
  padding: 0px 0px !important;
}
</style>
