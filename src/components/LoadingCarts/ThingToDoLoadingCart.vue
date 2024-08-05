<template>
  <div>
    <div v-show="imageLoaded">
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
      <div class="px-1 py-2">
        <p class="font-semibold text-sm line-clamp-1">{{ i?.name }}</p>
        <div class="text-[10px] flex justify-start items-center gap-0.5 py-1">
          <MapPinIcon class="w-3 h-3 text-black/50" />
          <p class="pt-0.5">Bangkok</p>
        </div>
        <p class="text-[10px] pt-1">starting price</p>
        <button
          class="bg-main px-3 mt-2 mb-2 py-1 rounded-lg text-xs font-semibold text-white"
        >
          {{ i?.lowest_variation_price }} thb
        </button>
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
