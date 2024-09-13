<template>
  <div>
    <div
      v-show="imageLoaded"
      class="overflow-hidden relative rounded-xl"
      :class="style ? style : 'w-full h-[100px]'"
    >
      <img
        :src="i"
        alt=""
        @load="onImageLoad"
        class="w-full h-full object-cover"
      />
    </div>
    <div v-show="!imageLoaded" class="w-full h-[100px] overflow-hidden">
      <img :src="LoadingImageCover" alt="" class="w-full h-full object-cover" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";

const props = defineProps({
  i: String,
  style: String,
});

const imageLoaded = ref(false);

const onImageLoad = () => {
  imageLoaded.value = true;
  // console.log("Image loaded");
};

onMounted(() => {
  // console.log(props.i, "this is i");
});
</script>
