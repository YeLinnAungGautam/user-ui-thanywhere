<template>
  <div>
    <div class="grid grid-cols-11 gap-3" v-show="imageLoaded">
      <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl">
        <img
          :src="
            i?.images[0]?.image
              ? i?.images[0]?.image
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
          "
          class="w-full h-full object-cover"
          alt=""
          @load="onImageLoad"
        />
      </div>
      <div class="col-span-6 relative">
        <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" />
        <div class="mr-6 overflow-hidden">
          <p class="text-xs font-semibold text-main line-clamp-2">
            {{ i.name }}
          </p>
          <div class="flex justify-between items-center">
            <!-- <StarPartVue :count="i.rating" /> -->
            <p class="text-[10px] text-black font-medium">
              {{ i.rating }}-star rating
            </p>
            <div class="text-[10px] flex justify-end items-center gap-0.5 py-1">
              <MapPinIcon class="w-3 h-3 text-black/50" />
              <p>{{ i?.city.name }}</p>
            </div>
          </div>
          <p
            class="text-[8px] line-clamp-3"
            v-html="
              language == 'english' ? i.full_description_en : i.full_description
            "
          ></p>
          <div class="absolute bottom-0 space-y-0.5">
            <p class="text-[10px]">location area</p>
            <div class="flex justify-start gap-2 items-center">
              <div
                class="text-[8px] flex justify-end text-main items-center gap-0.5 py-1"
              >
                <BuildingOffice2Icon class="w-2.5 h-2.5 text-main" />
                <p>{{ i.place }}</p>
              </div>
            </div>
            <p class="text-[10px] pb-1">start price</p>
            <p
              class="bg-main text-white text-sm font-semibold px-3 inline-block py-0.5 rounded-full"
            >
              {{ i.lowest_room_price }} THB
            </p>
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
import { HeartIcon } from "@heroicons/vue/24/outline";
import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/vue/24/solid";
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
