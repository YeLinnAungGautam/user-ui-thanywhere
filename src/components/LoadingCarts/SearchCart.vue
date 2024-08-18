<template>
  <div>
    <div class="grid grid-cols-3 p-3 gap-3" v-show="imageLoaded">
      <img
        :src="
          image != null
            ? image
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
        "
        @load="onImageLoad"
        alt=""
        class="w-full h-full rounded-xl"
      />
      <div class="col-span-2 space-y-1">
        <p class="text-sm font-medium">{{ name }}</p>
        <div
          class="flex justify-start items-center gap-2 pb-2 flex-wrap"
          v-if="!Array.isArray(city_name)"
        >
          <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
            {{ city_name }}
          </p>
        </div>
        <div
          v-else
          class="flex justify-start items-center gap-2 pb-2 flex-wrap"
        >
          <p
            class="bg-black/10 text-[8px] px-2 py-0.5 rounded"
            v-for="c in city_name"
            :key="c"
          >
            {{ c?.name }}
          </p>
        </div>
        <p
          class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
        >
          {{ price }}
          <span :class="price == 'read about ' ? 'hidden' : ''">thb</span>
        </p>
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
import { ref, defineProps, onMounted } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";

import { useSettingStore } from "../../stores/setting";

const settingStore = useSettingStore();

const props = defineProps({
  image: String,
  name: String,
  city_name: String || Array,
  price: Number || String,
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
