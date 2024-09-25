<template>
  <div>
    <div
      v-show="imageLoaded"
      class="overflow-hidden relative rounded-xl"
      :class="containerClass"
    >
      <img
        :src="i"
        :alt="alt"
        @load="onImageLoad"
        class="w-full h-full object-cover"
        :class="{
          'opacity-0': !imageLoaded,
          'opacity-100 transition-opacity duration-300': imageLoaded,
        }"
      />
    </div>
    <div
      v-show="!imageLoaded"
      class="rounded-xl overflow-hidden"
      :class="containerClass"
    >
      <img
        :src="LoadingImageCover"
        :alt="loadingAlt"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";

const props = defineProps({
  i: {
    type: String,
    required: true,
  },
  style: String,
  alt: {
    type: String,
    default: "Image",
  },
  loadingAlt: {
    type: String,
    default: "Loading image",
  },
});

const imageLoaded = ref(false);

const containerClass = computed(() => props.style || "w-full h-[100px]");

const onImageLoad = () => {
  imageLoaded.value = true;
};
</script>
