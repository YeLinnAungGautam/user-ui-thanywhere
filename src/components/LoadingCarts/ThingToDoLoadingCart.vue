<template>
  <div>
    <div v-show="imageLoaded" class="">
      <div class="relative">
        <div class="w-[200px] h-[100px] overflow-hidden">
          <img
            :src="
              i?.cover_image
                ? i?.cover_image
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
            "
            @load="onImageLoad"
            class="w-full h-full object-cover rounded-2xl"
            alt=""
          />
        </div>
        <p
          class="text-xs hidden bg-red/90 text-white rounded-full absolute -bottom-3 right-1 px-3 py-1 font-medium"
        >
          10% OFF
        </p>
      </div>

      <div class="px-1 pb-2 pt-4">
        <p class="font-semibold text-sm line-clamp-1">{{ i?.name }}</p>
        <div class="text-[10px] flex justify-start items-center gap-0.5 py-1">
          <MapPinIcon class="w-3 h-3 text-main" />
          <p class="pt-0.5 text-main">Bangkok</p>
        </div>
        <p class="text-[10px] pt-1">starting price</p>
        <div class="flex justify-between items-center">
          <button
            class="text-main mt-2 mb-2 py-1 rounded-base text-xl font-semibold"
          >
            {{ i?.lowest_variation_price }} thb
            <span class="text-[10px] line-through text-black/70 hidden"
              >100 thb</span
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
import { ref, defineProps, onMounted } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import { MapPinIcon } from "@heroicons/vue/24/solid";

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
});
</script>
