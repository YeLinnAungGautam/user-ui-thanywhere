<template>
  <div>
    <div v-show="imageLoaded">
      <div class="w-full h-[140px] p-1.5 overflow-hidden">
        <img
          :src="
            i?.feature_img
              ? i?.feature_img
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
          "
          @load="onImageLoad"
          class="w-full h-full object-cover rounded-xl"
          alt=""
        />
      </div>
      <div class="px-3 py-0">
        <!-- <StarPartVue :count="5" /> -->

        <p class="font-semibold text-sm pt-1 line-clamp-1">{{ i.name }}</p>
        <!-- <p class="text-[8px] bg-black/10 rounded-md py-0.5 px-1 inline-block">
          {{ i?.cities[0]?.name }}
        </p> -->
        <div class="flex justify-between items-center gap-1">
          <div class="text-[10px] flex justify-start items-center gap-0.5 py-1">
            <MapPinIcon class="w-3 h-3 text-main" />
            <p class="pt-0.5 text-main">{{ i?.city?.name }}</p>
          </div>
          <p
            class="text-[10px] text-black font-medium flex justify-start items-center gap-0.5"
          >
            5 <StarIcon class="w-4 h-4 text-main" />
          </p>
        </div>
        <p
          class="text-[9px] pt-1 line-clamp-5"
          v-html="language == 'english' ? i?.place_id : i?.summary"
        ></p>
        <!-- <p class="text-[10px] mt-2 font-medium">starting ticket price</p> -->
        <button
          class="mt-2 mb-3 font-semibold py-0.5 rounded-2xl text-sm text-main"
        >
          read more ...
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
import { ref, defineProps, onMounted } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";
// import StarPartVue from "../home/StarPart.vue";
import { StarIcon, MapPinIcon } from "@heroicons/vue/24/solid";

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
