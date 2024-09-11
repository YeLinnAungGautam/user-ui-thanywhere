<template>
  <div class="">
    <div class="relative overflow-hidden rounded-xl w-full h-full">
      <carousel v-bind="settings">
        <slide v-for="(slide, index) in showImage" :key="index">
          <div class="w-full h-full">
            <!-- <div class="w-full h-[420px] overflow-hidden">
              <img
                :src="slide.image"
                class="w-full h-full object-cover rounded-b-[60px]"
                alt=""
              />
            </div> -->
            <ImageCarouselCart :i="slide" :style="'h-[100px] w-full'" />
          </div>
        </slide>

        <template #addons>
          <pagination class="custom" />
        </template>
      </carousel>
    </div>
  </div>
</template>

<script setup>
// import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import { defineProps, ref, watch } from "vue";
import ImageCarouselCart from "../LoadingCarts/ImageCarouselCartSec.vue";
// import homeGradesdb from "../../assets/homeGrades";

const settings = {
  itemsToShow: 1,
  snapAlign: "start",
};

const props = defineProps({
  data: Array,
});

const showImage = ref(null);

const simple = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s",
  },
];

watch(
  () => props.data, // Watching props.data
  (newValue) => {
    // console.log("====================================");
    // console.log(newValue);
    // console.log("====================================");

    if (!newValue || newValue.length === 0) {
      showImage.value = simple; // Set default image if data is undefined or empty
      // console.log("hello");
    } else {
      showImage.value = newValue; // Set the image to the new value
    }
  },
  { immediate: true } // This ensures the watcher runs immediately upon component mount
);
</script>

<style>
.custom {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
.carousel__pagination-button {
  display: block;
  border: 0;
  margin: 0px 0px -7px 0px !important;
  cursor: pointer;
  padding: var(--vc-pgn-margin);
  background: transparent;
}
.carousel__pagination {
  display: flex;
  justify-content: start !important;
  list-style: none;
  line-height: 0;
  margin: 10px 0 0;
  padding: 0;
}
</style>
