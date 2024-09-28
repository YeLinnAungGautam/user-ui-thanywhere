<template>
  <div>
    <div class="grid grid-cols-11 gap-6 px-6" v-show="imageLoaded">
      <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-xl">
        <!-- <img
          :src="
            i?.feature_img
              ? i?.feature_img
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
          "
          @load="onImageLoad"
          class="w-full h-full object-cover"
          alt=""
        /> -->
        <ImageCarouselForCart :data="images" :style="'h-[180px]'" />
      </div>
      <div class="col-span-6 relative">
        <div class="overflow-hidden space-y-1">
          <div>
            <p class="text-xs font-semibold text-main pr-4">
              {{ i?.name }}
            </p>
            <!-- <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" /> -->
          </div>
          <div class="flex justify-start gap-1 flex-wrap items-center">
            <p
              class="whitespace-nowrap text-[8px] py-0.5 rounded-md text-main flex justify-start items-center gap-x-1"
            >
              <img :src="PinImage" class="w-3 h-3" alt="" />
              {{ i?.city?.name }}
            </p>
          </div>
          <p class="text-[10px] h-[75px] overflow-hidden">
            {{ language == "english" ? i.place_id : i.summary }}
          </p>
          <div class="absolute bottom-0 space-y-0.5">
            <!-- <p class="text-[10px] pb-1">starting price</p> -->
            <p
              class="text-main text-sm font-semibold inline-block py-1 rounded-full"
            >
              read more ...
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-show="!imageLoaded" class="">
      <div class="grid grid-cols-11 gap-6 px-6">
        <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl">
          <img
            :src="LoadingImageCover"
            class="w-full h-full object-cover opacity-30"
            alt=""
          />
        </div>
        <div class="col-span-6 relative">
          <div class="mr-6 overflow-hidden">
            <p
              class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-1"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-full h-3 animate-pulse mt-2"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-2"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-1"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-1"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-5"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-2"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-2"
            ></p>
            <button
              class="bg-main animate-pulse px-3 mt-2 mb-2 py-1 rounded-xl text-xs font-semibold text-white"
            >
              loading
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";
import PinImage from "../../assets/s/pin 1 (1).png";
import ImageCarouselForCart from "./ImageCarouselForCart.vue";
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

const props = defineProps({
  i: Object,
});

const images = ref([]);
const getImages = () => {
  if (props.i?.feature_img) {
    images.value.push(props.i?.feature_img);
  }
  if (props.i?.images) {
    for (let a = 0; a < props.i?.images.length; a++) {
      images.value.push(props.i?.images[a].image);
    }
  }
  imageLoaded.value = true;
};

const imageLoaded = ref(false);

// const onImageLoad = () => {
//   imageLoaded.value = true;
//   // console.log("Image loaded");
// };

onMounted(() => {
  // console.log(props.i, "this is i");
  settingStore.getLanguage();
});

watch(
  () => props.i,
  () => {
    if (props.i) {
      getImages();
    }
  },
  { immediate: true }
);
</script>
