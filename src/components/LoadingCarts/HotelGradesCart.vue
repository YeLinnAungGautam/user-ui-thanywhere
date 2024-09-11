<template>
  <div class="w-full">
    <div v-show="imageLoaded">
      <div class="w-full h-[120px] overflow-hidden">
        <img
          :src="i"
          @load="onImageLoad"
          class="w-full h-full object-cover rounded-2xl"
          alt=""
        />
      </div>
    </div>
    <div v-show="!imageLoaded">
      <div class="w-[210px] h-[120px] overflow-hidden">
        <img
          :src="LoadingImageCover"
          class="w-full h-full object-cover opacity-30 rounded-2xl"
          alt=""
        />
      </div>
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
  // console.log("Image loaded");
};

onMounted(() => {
  // console.log(props.i, "this is i");
});
</script>
