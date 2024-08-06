<template>
  <div>
    <div class="relative">
      <carousel v-bind="settings">
        <slide v-for="(slide, index) in showImage" :key="index">
          <div>
            <div class="w-full h-[150px] overflow-hidden rounded-2xl">
              <img
                :src="slide.image"
                @load="onImageLoad"
                class="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
        </slide>

        <template #addons>
          <pagination class="custom" />
        </template>
      </carousel>
    </div>
  </div>
</template>

<script setup>
// import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import "vue3-carousel/dist/carousel.css";

import { Carousel, Slide, Pagination } from "vue3-carousel";
import { onMounted, defineProps, ref, defineEmits } from "vue";
// import homeGradesdb from "../../assets/homeGrades";

const emit = defineEmits();

const settings = {
  itemsToShow: 1,
  snapAlign: "start",
};

const props = defineProps({
  data: Array,
});

const showImage = ref(null);

const simple = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s",
  },
];

const imageLoaded = ref(0);
const loading = ref(true);
const onImageLoad = () => {
  loading.value = true;
  imageLoaded.value += 1;
  console.log("Image loaded", imageLoaded.value);
  if (imageLoaded.value == showImage.value.length) {
    loading.value = false;
    // console.log(loading.value);
    emit("change", loading.value);
  }
};

onMounted(() => {
  console.log("====================================");
  console.log(props?.data);
  console.log("====================================");
  if (props.data == undefined || props.data.length == 0) {
    showImage.value = simple;
    console.log("hello");
  } else {
    showImage.value = props.data;
  }
});
</script>

<style>
.custom {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
</style>
