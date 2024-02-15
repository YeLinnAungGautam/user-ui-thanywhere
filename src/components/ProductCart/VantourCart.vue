<script setup>
import { useRouter } from "vue-router";
import {
  HeartIcon,
  StarIcon,
  MapPinIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { ref, defineProps, defineEmits, onMounted } from "vue";
import Pin from "../../../public/pin-1-svgrepo-com.svg";

const props = defineProps({
  data: [Object],
});

onMounted(() => {
  // console.log(props.data);
});

import "vue3-carousel/dist/carousel.css";
const router = useRouter();
const slide = ref([]);

onMounted(() => {
  for (let x = 0; x < props.data?.images.length; x++) {
    let image = props.data?.images[x].image;
    slide.value.push(image);
  }
  slide.value = [...slide.value, props.data?.cover_image];
  // console.log(slide.value, "this is image");
});
</script>

<template>
  <div>
    <div
      class="cursor-pointer mx-auto min-w-[300px] max-w-[320px] transition"
      @click="
        router.push({
          name: 'vantour-detail',
          params: {
            id: data.id,
          },
        })
      "
    >
      <div
        class="h-[200px] bg-black relative rounded-lg shadow-md overflow-hidden"
      >
        <Carousel :wrap-around="true">
          <Slide v-for="slide in slide" :key="slide">
            <div
              class="carousel__item h-[200px] relative text-center bg-center"
            >
              <img :src="slide" alt="" class="h-full w-full object-cover" />
            </div>
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
        <div
          class="w-[90%] absolute top-3.5 mx-4 flex justify-between items-center"
        >
          <div
            class="bg-white w-auto text-xs rounded-3xl px-2 py-1 font-semibold shadow-2xl"
          >
            Guest favorite
          </div>
          <div>
            <!-- <HeartIcon class="w-6 h-6 text-black" /> -->
          </div>
        </div>
      </div>
      <div class="py-4 px-4">
        <div class="flex justify-between items-center pb-1">
          <p class="text-base font-semibold">{{ data?.name }}</p>
          <div class="flex justify-start items-center space-x-1">
            <img src="../../../public/star.png" alt="" class="w-3" />
            <p class="text-[11px] text-black">4.0</p>
          </div>
        </div>
        <div class="flex justify-start items-center gap-1">
          <!-- <MapPinIcon class="h-3 text-red" /> -->
          <img :src="Pin" class="h-4" alt="" />
          <div class="flex justify-start items-center gap-1">
            <p
              class="text-[10px] text-red"
              v-for="(c, index) in data?.cities"
              :key="index"
            >
              {{ c.name }}
            </p>
          </div>
        </div>
        <div class="flex justify-start items-start gap-1">
          <!-- <DocumentMagnifyingGlassIcon class="h-3 mt-1 text-red" /> -->
          <img :src="Pin" class="h-4" alt="" />

          <div class="flex justify-start items-start flex-wrap">
            <p
              class="text-[10px] text-red whitespace-nowrap"
              v-for="(d, index) in data?.destinations"
              :key="index"
            >
              {{ d.name }} ,
            </p>
          </div>
        </div>
        <div class="pt-2 text-[11px] flex justify-start items-center space-x-2">
          <p>Starting at</p>
          <p
            class="text-base text-red font-semibold flex justify-start items-center"
          >
            <img src="../../../public/thailand-baht.png" alt="" class="w-4" />
            {{ data?.lowest_car_price }} / car
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel__slide {
  padding: 0px !important;
}
.carousel__pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  line-height: 0;
  margin: 10px 0 0;
  position: absolute;
  bottom: 20px;
  left: 5% !important;
}
</style>
