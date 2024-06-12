<template>
  <div>
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-black/60 font-semibold px-6">read about destinations</h1>
      <!-- <div
        class="text-[10px] font-semibold text-main flex mr-6 justify-end items-center gap-1"
      >
        see more <ChevronDownIcon class="w-3 h-3" />
      </div> -->
    </div>
    <div class="py-4">
      <carousel v-bind="settings" :breakpoints="breakpoints">
        <slide v-for="(slide, index) in data" :key="index">
          <div :class="index == 0 ? 'ml-6' : 'ml-3'">
            <div class="w-full h-[120px] overflow-hidden">
              <img
                :src="slide.image"
                class="w-full h-full object-cover rounded-2xl"
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
    snapAlign: "center",
  },
  500: {
    itemsToShow: 2.3,
    snapAlign: "center",
  },
  550: {
    itemsToShow: 2.6,
    snapAlign: "center",
  },
  600: {
    itemsToShow: 2.8,
    snapAlign: "center",
  },
  650: {
    itemsToShow: 3,
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
