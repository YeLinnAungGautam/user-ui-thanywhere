<template>
  <div>
    <div v-show="imageLoaded" class="w-full h-[420px] overflow-hidden">
      <img
        :src="i"
        alt=""
        @load="onImageLoad"
        class="w-full h-full object-cover rounded-b-[60px]"
      />
    </div>
    <div v-show="!imageLoaded" class="w-full h-[420px] overflow-hidden">
      <img
        :src="LoadingImageCover"
        alt=""
        class="w-full h-full object-cover rounded-b-[60px]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";

const props = defineProps({
  i: String,
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
