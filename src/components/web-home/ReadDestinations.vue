<template>
  <div class="mt-10">
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-black font-semibold text-xl px-10 pb-2 lg:px-20">
        read about destinations
      </h1>
    </div>
    <div class="py-4 px-10 lg:px-20">
      <carousel v-bind="settings" :breakpoints="breakpoints">
        <slide v-for="(slide, index) in data" :key="index">
          <div class="mr-4">
            <div class="w-full h-[160px] overflow-hidden">
              <img
                :src="slide.image"
                class="w-full h-full object-cover rounded-xl"
                alt=""
              />
            </div>
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
// import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import { onMounted, ref } from "vue";
import citydb from "../../assets/citydb";

const settings = {
  itemsToShow: 1.6,
  snapAlign: "center",
};

const data = ref(null);

onMounted(() => {
  data.value = citydb;
});

const breakpoints = {
  400: {
    itemsToShow: 1.8,
    snapAlign: "center",
  },
  450: {
    itemsToShow: 2.2,
    snapAlign: "start",
  },
  500: {
    itemsToShow: 2.3,
    snapAlign: "start",
  },
  550: {
    itemsToShow: 2.6,
    snapAlign: "start",
  },
  600: {
    itemsToShow: 2.8,
    snapAlign: "start",
  },
  650: {
    itemsToShow: 3,
    snapAlign: "start",
  },
  700: {
    itemsToShow: 2.5,
    snapAlign: "start",
  },
  800: {
    itemsToShow: 3,
    snapAlign: "start",
  },
  // 700px and up
  900: {
    itemsToShow: 3,
    snapAlign: "start",
  },
  // 1024 and up
  1024: {
    itemsToShow: 3.5,
    snapAlign: "start",
  },
  1124: {
    itemsToShow: 4.5,
    snapAlign: "start",
  },
};
</script>
