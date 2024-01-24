<script setup>
import { StarIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { HeartIcon } from "@heroicons/vue/24/outline";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
const router = useRouter();
const slide = [
  {
    id: 1,
    image:
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc28d53c20964e9d7e79285c476ad74ab.cdn.bubble.io%2Ff1701321844319x375539512012161150%2FPTY-Cau-012.jpg?w=384&h=&auto=compress&dpr=1.25&fit=max",
  },
  {
    id: 2,
    image:
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc28d53c20964e9d7e79285c476ad74ab.cdn.bubble.io%2Ff1692769141492x556043665158201300%2FAYU-Cau-1.jpg?w=384&h=&auto=compress&dpr=1.25&fit=max",
  },
  {
    id: 3,
    image:
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc28d53c20964e9d7e79285c476ad74ab.cdn.bubble.io%2Ff1692701497306x948823093388460700%2FCHM-002-Fly.jpg?w=384&h=&auto=compress&dpr=1.25&fit=max",
  },
];
</script>

<template>
  <div>
    <div
      class="rounded-3xl overflow-hidden cursor-pointer border border-black/10 transition hover:shadow-md"
      @click="router.push({ name: 'booking' })"
    >
      <div class="h-[200px] bg-black relative">
        <!-- <img
          src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc28d53c20964e9d7e79285c476ad74ab.cdn.bubble.io%2Ff1701321844319x375539512012161150%2FPTY-Cau-012.jpg?w=384&h=&auto=compress&dpr=1.25&fit=max"
          alt=""
          class="h-full object-cover"
        /> -->
        <Carousel :wrap-around="true">
          <Slide v-for="slide in slide" :key="slide">
            <div
              class="carousel__item h-[200px] relative text-center bg-center"
            >
              <img
                :src="slide.image"
                alt=""
                class="h-full w-full object-cover"
              />
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
            <HeartIcon class="w-6 h-6 text-black" />
          </div>
        </div>
      </div>
      <div class="py-4 px-4">
        <p class="text-base font-semibold">Pattaya Activity Package 3</p>
        <p class="text-[10px] text-red">Pattaya</p>
        <div class="flex justify-start items-center space-x-1">
          <img src="../../../public/star.png" alt="" class="w-3" />
          <p class="text-[11px] text-yellow">4.0</p>
          <p class="text-[11px]">( 100 ratings )</p>
        </div>
        <div class="pt-2 text-[11px] flex justify-start items-center space-x-2">
          <p>From</p>
          <p
            class="text-base text-red font-semibold flex justify-start items-center"
          >
            <img src="../../../public/thailand-baht.png" alt="" class="w-4" />
            3500
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
