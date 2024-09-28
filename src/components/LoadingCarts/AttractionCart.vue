<template>
  <div>
    <div class="grid grid-cols-11 gap-6 pb-2 px-6" v-show="imageLoaded">
      <div class="w-full col-span-5 h-[180px] relative rounded-xl">
        <div class="w-full h-[180px] overflow-hidden rounded-xl">
          <!-- <img
            :src="
              i?.cover_image
                ? i?.cover_image
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
            "
            @load="onImageLoad"
            class="w-full h-full object-cover"
            alt=""
          /> -->
          <ImageCarouselForCart :data="images" :style="'h-[180px]'" />
        </div>
        <p
          v-if="percent != 0 && percent != NaN"
          class="text-xs bg-red/70 text-white rounded-full absolute -bottom-2 right-2 px-3 py-1 font-medium"
        >
          {{ percent }}% OFF
        </p>
      </div>
      <div class="col-span-6 relative">
        <div class="overflow-hidden space-y-1">
          <div>
            <p class="text-xs font-semibold text-main pr-4 line-clamp-1">
              {{ i?.name }}
            </p>
            <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" />
          </div>
          <div class="flex justify-start gap-1 flex-wrap items-center">
            <p
              class="whitespace-nowrap text-[8px] flex justify-start items-center gap-x-1 py-0.5 rounded-md text-main"
              v-for="(a, index) in i?.cities"
              :key="a"
              :class="index > 2 ? 'hidden' : ''"
            >
              <img :src="Pin" class="w-3 h-3" alt="" /> {{ a.name }}
            </p>
            <p
              class="whitespace-nowrap bg-black/10 text-[8px] px-1 py-0.5 rounded-md text-black/70"
              v-for="(a, index) in i?.cities"
              :key="a"
              :class="index == 3 ? '' : 'hidden'"
            >
              ..
            </p>
          </div>
          <p
            class="text-[8px] h-[73px] line-clamp-6 overflow-hidden"
            v-if="i?.description && i?.description != 'null'"
          >
            {{
              language == "english" ? i?.full_description_en : i?.description
            }}
          </p>
          <p
            class="text-[8px] h-[70px] overflow-hidden"
            v-if="!i?.description || i?.description == 'null'"
          >
            coming soon !
          </p>

          <div class="absolute bottom-0 w-full space-y-0.5">
            <p class="text-xs font-medium pb-1">starting price</p>
            <!-- <p
              class="bg-main text-white text-sm font-semibold px-3 inline-block py-0.5 rounded-full"
            >
              {{ i?.lowest_variation_price }}THB
            </p> -->

            <div class="flex justify-between items-center">
              <button
                class="text-main rounded-base text-xl font-semibold line-clamp-1"
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
              <div>
                <p
                  class="text-xs bg-main text-white rounded-full px-3 py-1 font-medium"
                >
                  book
                </p>
              </div>
            </div>
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
import { ref, defineProps, onMounted, computed, watch } from "vue";
import { HeartIcon } from "@heroicons/vue/24/outline";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";
import Pin from "@/assets/s/pin 1 (1).png";
import ImageCarouselForCart from "./ImageCarouselForCart.vue";

const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

const props = defineProps({
  i: Object,
});

const imageLoaded = ref(false);

// const onImageLoad = () => {
//   imageLoaded.value = true;
//   // console.log("Image loaded");
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
  imageLoaded.value = true;
};

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
