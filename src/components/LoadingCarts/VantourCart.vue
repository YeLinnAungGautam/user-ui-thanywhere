<template>
  <div>
    <div class="grid grid-cols-11 gap-3" v-show="imageLoaded">
      <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-xl">
        <img
          :src="
            i?.cover_image
              ? i?.cover_image
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
          "
          @load="onImageLoad"
          class="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div class="col-span-6 relative">
        <div class="overflow-hidden space-y-1">
          <p class="text-xs font-semibold text-main">{{ i.name }}</p>
          <div class="flex justify-start gap-1 flex-wrap items-center">
            <p
              v-for="c in i?.cities"
              :key="c"
              class="bg-black/10 px-1 text-[8px] py-0.5 rounded-md"
            >
              {{ c.name }}
            </p>
          </div>
          <p
            class="text-[8px] h-[73px] line-clamp-6 overflow-hidden"
            v-html="
              language == 'english' ? i.full_description_en : i.long_description
            "
          ></p>
          <!-- <div class="absolute bottom-0 space-y-0.5 w-full"> -->
          <!-- <div class="flex justify-between items-center w-full">
              <p class="text-[8px] pb-1">starting price</p>
              <p class="text-xs text-main font-semibold">
                {{ i.lowest_car_price }}THB
                <span class="text-[8px] text-black/50">/car</span>
              </p>
            </div> -->
          <!-- <p
              class="bg-main text-white text-xs font-medium px-3 inline-block py-1 rounded-full"
            >
              view more
            </p> -->
          <!-- </div> -->
          <div class="absolute bottom-0 space-y-0.5">
            <p class="text-xs font-medium">starting price</p>
            <!-- <p
            class="bg-main text-white text-sm font-semibold px-3 inline-block py-0.5 rounded-full"
          >
            {{ i?.lowest_variation_price }}THB
          </p> -->
            <div class="flex justify-between items-center">
              <button class="text-main rounded-base text-xl font-semibold">
                {{ i?.lowest_car_price }} thb
                <span class="text-[11px] text-black/70"> / car</span>
              </button>
              <!-- <p
              class="text-xs bg-main text-white rounded-full px-3 py-1 font-medium"
            >
              book
            </p> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="!imageLoaded" class="">
      <div class="grid grid-cols-11 gap-3">
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
import { ref, defineProps, onMounted } from "vue";
// import { HeartIcon } from "@heroicons/vue/24/outline";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";

const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

const props = defineProps({
  i: Object,
});

const imageLoaded = ref(false);

const onImageLoad = () => {
  imageLoaded.value = true;
  console.log("Image loaded");
};

onMounted(() => {
  console.log(props.i, "this is i");
  settingStore.getLanguage();
});
</script>
