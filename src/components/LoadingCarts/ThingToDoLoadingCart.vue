<template>
  <div>
    <div v-show="imageLoaded" class="">
      <div class="relative">
        <div class="w-[200px] h-[100px] overflow-hidden">
          <ImageCarouselForCart :data="images" :style="'h-[100px]'" />
        </div>
        <p
          v-if="percent != 0 && percent != NaN"
          class="text-xs bg-red/90 text-white rounded-full absolute -bottom-3 right-2 px-3 py-1 font-medium"
        >
          {{ percent }}% OFF
        </p>
      </div>

      <div class="px-1 pb-2 pt-4">
        <p class="font-semibold text-sm line-clamp-1">{{ i?.name }}</p>
        <div class="text-[10px] flex justify-start items-center gap-0.5 py-1">
          <MapPinIcon class="w-3 h-3 text-main" />
          <p class="pt-0.5 text-main">Bangkok</p>
        </div>
        <p class="text-xs font-medium pt-1">starting price</p>
        <div class="flex justify-between items-center">
          <button class="text-main py-1 rounded-base text-lg font-semibold">
            {{ i?.lowest_variation_price }} thb
            <span
              class="text-[11px] line-through text-black/70"
              v-if="
                i?.lowest_walk_in_price != 'null' &&
                i?.lowest_walk_in_price != 0 &&
                i?.lowest_walk_in_price != i?.lowest_variation_price
              "
              >{{ i?.lowest_walk_in_price }}thb</span
            >
          </button>
          <p
            class="text-xs bg-main text-white rounded-full px-3 py-1 font-medium"
          >
            book
          </p>
        </div>
      </div>
    </div>
    <div v-show="!imageLoaded">
      <div class="w-[200px] h-[100px] overflow-hidden animate-pulse">
        <img
          :src="LoadingImageCover"
          class="w-full h-full object-cover opacity-30 rounded-2xl"
          alt=""
        />
      </div>
      <div class="px-3 py-2">
        <p class="text-main text-[10px] bg-black/20 w-10 h-2 animate-pulse"></p>
        <p
          class="font-semibold text-sm bg-black/20 w-20 h-4 animate-pulse mt-2"
        ></p>
        <button
          class="bg-main animate-pulse px-3 mt-2 mb-2 py-1 rounded-lg text-xs font-semibold text-white"
        >
          loading
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import { MapPinIcon } from "@heroicons/vue/24/solid";
import ImageCarouselForCart from "./ImageCarouselForCart.vue";

const props = defineProps({
  i: Object,
});

const imageLoaded = ref(true);

// const onImageLoad = () => {
//   imageLoaded.value = true;
//   console.log("Image loaded");
// };

const percent = computed(() => {
  if (
    props.i?.lowest_walk_in_price &&
    props.i?.lowest_variation_price &&
    props.i?.lowest_walk_in_price != "null"
  ) {
    const calculatedPercent = (
      ((props.i?.lowest_walk_in_price * 1 -
        props.i?.lowest_variation_price * 1) /
        props.i?.lowest_walk_in_price) *
      100
    ).toFixed(0); // Round to 2 decimal places if necessary
    return `${calculatedPercent}`;
  } else {
    return `0`;
  }
});

const images = ref([]);
const getImages = () => {
  images.value.push(props.i?.cover_image);
  if (props.i?.images) {
    for (let a = 0; a < props.i?.images.length; a++) {
      images.value.push(props.i?.images[a].image);
    }
  }
};

onMounted(() => {
  // console.log(props.i, "this is i");
  images.value = [];
  if (props.i) {
    getImages();
  }
  // console.log(images.value, "this is images");
});
</script>
