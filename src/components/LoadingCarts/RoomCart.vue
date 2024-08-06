<template>
  <div>
    <div
      v-show="imageLoaded"
      class="bg-white shadow rounded-3xl p-2 border border-black/5 max-w-[220px]"
    >
      <div class="w-[200px] h-[150px] overflow-hidden">
        <img
          :src="
            i?.images[0]?.image
              ? i.images[0]?.image
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
          "
          @load="onImageLoad"
          class="w-full h-full object-cover rounded-2xl"
          alt=""
        />
      </div>
      <div class="bg-white p-2 space-y-2">
        <p class="font-medium text-xs line-clamp-2">
          {{ i?.name }}
        </p>
        <p class="text-green text-[10px]">Breakfast inclusive</p>
        <div class="flex justify-between items-center gap-2">
          <button class="bg-main px-4 py-1 rounded-full text-sm text-white">
            {{ i?.room_price }}THB
          </button>
          <p class="text-[10px] text-main underline">view detail</p>
        </div>
      </div>
    </div>

    <div
      v-show="!imageLoaded"
      class="bg-white shadow rounded-3xl p-2 border border-black/5 max-w-[220px]"
    >
      <div class="w-[200px] h-[150px] overflow-hidden">
        <img
          :src="LoadingImageCover"
          class="w-full h-full object-cover rounded-2xl opacity-20"
          alt=""
        />
      </div>
      <div class="bg-white p-2 space-y-2">
        <p
          class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-1"
        ></p>
        <p
          class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-1"
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
// import { HeartIcon } from "@heroicons/vue/24/outline";
// import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/vue/24/solid";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
// import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";

const settingStore = useSettingStore();
// const { language } = storeToRefs(settingStore);

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
