<template>
  <div>
    <div class="grid grid-cols-3 p-3 gap-3" v-show="imageLoaded">
      <div class="relative">
        <div class="w-full h-[140px] overflow-hidden">
          <img
            :src="
              image != null
                ? image
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
            "
            @load="onImageLoad"
            alt=""
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div
          v-if="percent != 0"
          class="text-sm text-white absolute -bottom-3 right-0 bg-red ml-3 px-2 py-1 rounded-xl"
        >
          {{ percent }}% OFF
        </div>
      </div>
      <div class="col-span-2 space-y-1 relative">
        <p class="text-sm font-medium">{{ name }}</p>
        <div
          class="flex justify-start items-center gap-2 pb-2 flex-wrap"
          v-if="!Array.isArray(city_name)"
        >
          <p
            class="text-main text-[12px] flex justify-start items-center gap-x-1 rounded"
          >
            <img :src="Pin" class="w-3 h-3" alt="" />{{ city_name }}
          </p>
        </div>
        <div
          v-else
          class="flex justify-start items-center gap-2 pb-2 flex-wrap"
        >
          <p
            class="text-main text-[12px] flex justify-start items-center gap-x-1 rounded"
            v-for="c in city_name"
            :key="c"
          >
            <img :src="Pin" class="w-3 h-3" alt="" /> {{ c?.name }}
          </p>
        </div>
        <div
          class="flex justify-start items-center gap-2 pb-2 flex-nowrap overflow-scroll scroll-container"
        >
          <p v-for="t in type" :key="t" class="text-xs text-nowrap">
            <span class="w-3 h-3 rounded-full inline-block bg-main mr-2"></span
            >{{ t.name }}
          </p>
        </div>
        <div
          v-if="!type"
          class="flex justify-start items-center gap-2 pb-8 flex-nowrap overflow-scroll scroll-container"
        ></div>

        <div class="flex justify-between items-center pr-1">
          <p
            class="font-semibold text-main text-xl py-1 rounded-lg inline-block"
          >
            <span :class="price == 'read about ' ? 'hidden' : ''">฿</span
            >{{ price }}
            <span
              v-if="price_unit != null"
              class="line-through text-sm text-black/50"
            >
              ฿{{ price_unit }}</span
            >
          </p>
          <div class="bg-main text-white px-3 py-1 rounded-xl shadow-custom">
            book
          </div>
        </div>
      </div>
    </div>

    <div v-show="!imageLoaded" class="">
      <div class="grid grid-cols-3 gap-3 rounded-2xl bg-white shadow px-3 py-3">
        <div class="w-full h-[80px] overflow-hidden">
          <img
            :src="LoadingImageCover"
            alt=""
            class="w-full h-full rounded-xl opacity-50"
          />
        </div>
        <div class="col-span-2 space-y-2">
          <p
            class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-1"
          ></p>
          <p
            class="font-semibold text-sm bg-black/20 w-[50px] h-3 animate-pulse mt-2"
          ></p>

          <button
            class="bg-main animate-pulse text-sm font-semibold text-white px-3 py-1 rounded-lg inline-block"
          >
            loading
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import Pin from "@/assets/s/pin 1 (1).png";

import { useSettingStore } from "../../stores/setting";

const settingStore = useSettingStore();

const props = defineProps({
  image: String,
  name: String,
  city_name: String || Array,
  price: Number || String,
  price_unit: String || Number,
  type: String,
});

const percent = computed(() => {
  if (props?.price_unit && props?.price && props?.price_unit != "null") {
    const calculatedPercent = (
      ((props?.price_unit * 1 - props?.price * 1) / props?.price_unit) *
      100
    ).toFixed(0); // Round to 2 decimal places if necessary
    return `${calculatedPercent}`;
  } else {
    return `0`;
  }
});

const imageLoaded = ref(false);

const onImageLoad = () => {
  imageLoaded.value = true;
  // console.log("Image loaded");
};

onMounted(() => {
  console.log(props.price_unit, "this is i");
  settingStore.getLanguage();
});
</script>
