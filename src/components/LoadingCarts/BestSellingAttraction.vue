<template>
  <div>
    <div v-show="imageLoaded" class="relative z-0">
      <div class="w-full h-[140px] p-1.5 overflow-hidden">
        <!-- <img
          :src="
            i?.cover_image
              ? i?.cover_image
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
          "
          @load="onImageLoad"
          class="w-full h-full object-cover rounded-xl"
          alt=""
        /> -->
        <ImageCarouselForCart :data="images" :style="'h-[130px]'" />
      </div>
      <p
        v-if="percent != 0 && percent != NaN"
        class="text-xs bg-red/90 text-white rounded-full absolute top-[120px] right-4 px-3 py-1 font-medium"
      >
        {{ percent }}% OFF
      </p>
      <div class="px-3 py-1">
        <!-- <StarPartVue :count="5" /> -->

        <p class="font-semibold text-sm pt-1 line-clamp-1">{{ i.name }}</p>
        <!-- <p class="text-[8px] bg-black/10 rounded-md py-0.5 px-1 inline-block">
          {{ i?.cities[0]?.name }}
        </p> -->
        <div class="flex justify-between items-center gap-1">
          <div class="text-[10px] flex justify-start items-center gap-0.5 py-1">
            <MapPinIcon class="w-3 h-3 text-main" />
            <p class="pt-0.5 text-main">{{ i?.cities[0]?.name }}</p>
          </div>
          <p
            class="text-[10px] text-black font-medium flex justify-start items-center gap-0.5"
          >
            5 <StarIcon class="w-4 h-4 text-main" />
          </p>
        </div>
        <p
          class="text-[9px] pt-1 line-clamp-3"
          v-html="
            language == 'english' ? i?.full_description_en : i?.description
          "
        ></p>
        <p class="text-xs mt-2 font-medium">starting ticket price</p>
        <!-- <button
          class="bg-main px-4 mt-2 mb-3 py-0.5 rounded-2xl text-sm text-white"
        >
          {{ i?.lowest_variation_price }}THB
        </button> -->
        <button
          class="text-main py-1 rounded-base text-lg font-semibold line-clamp-1"
        >
          ฿ {{ i?.lowest_variation_price }}
          <span
            class="text-[11px] line-through text-black/70"
            v-if="
              i?.lowest_walk_in_price != 'null' &&
              i?.lowest_walk_in_price != 0 &&
              i?.lowest_walk_in_price != i?.lowest_variation_price
            "
            >฿ {{ i?.lowest_walk_in_price }}</span
          >
        </button>
      </div>
    </div>

    <div
      class="bg-white shadow-sm rounded-2xl mb-2 border border-black/10"
      v-show="!imageLoaded"
    >
      <div class="w-full h-[140px] p-1.5 overflow-hidden">
        <img
          :src="LoadingImageCover"
          class="w-full h-full object-cover opacity-30 rounded-xl"
          alt=""
        />
      </div>
      <div class="px-3 py-1">
        <p class="text-main text-[10px] bg-black/20 w-10 h-2 animate-pulse"></p>
        <p
          class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-2"
        ></p>
        <p
          class="text-main text-[10px] bg-black/20 w-10 h-3 mt-2 animate-pulse"
        ></p>
        <p
          class="text-main text-[10px] bg-black/20 w-full h-2 mt-2 animate-pulse"
        ></p>
        <p
          class="text-main text-[10px] bg-black/20 w-full h-2 mt-1 animate-pulse"
        ></p>
        <p
          class="text-main text-[10px] bg-black/20 w-full h-2 mt-1 animate-pulse"
        ></p>
        <p
          class="text-main text-[10px] bg-black/20 w-10 h-3 mt-4 animate-pulse"
        ></p>
        <button
          class="bg-main animate-pulse px-3 mt-2 mb-2 py-1 rounded-xl text-xs font-semibold text-white"
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
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";
// import StarPartVue from "../home/StarPart.vue";
import { StarIcon, MapPinIcon } from "@heroicons/vue/24/solid";
import ImageCarouselForCart from "./ImageCarouselForCart.vue";

const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

const props = defineProps({
  i: Object,
});

const imageLoaded = ref(true);

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

// const onImageLoad = () => {
//   imageLoaded.value = true;
//   console.log("Image loaded");
// };

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
  settingStore.getLanguage();
});
</script>
