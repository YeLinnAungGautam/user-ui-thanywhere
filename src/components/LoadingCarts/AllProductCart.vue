<template>
  <div>
    <div v-show="imageLoaded">
      <img :src="i" alt="" @load="onImageLoad" class="w-6 h-6 mx-auto" />
    </div>
    <div v-show="!imageLoaded">
      <img
        :src="LoadingImageCover"
        alt=""
        class="w-6 h-6 opacity-0 rounded-full mx-auto"
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
  // console.log("Image loaded");
};

onMounted(() => {
  // console.log(props.i, "this is i");
});
</script>
