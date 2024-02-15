<template>
  <div>
    <!-- :autoplay="5000" -->
    <Carousel :wrap-around="true">
      <Slide v-for="slide in slide" :key="slide">
        <div
          class="carousel__item w-[608px] h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden text-center relative bg-center"
        >
          <img
            :src="slide.image"
            alt=""
            class="min-w-[608px] h-full object-cover"
          />
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
import { useRoute } from "vue-router";

const route = useRoute();

const slide = [
  {
    id: 1,
    image:
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc28d53c20964e9d7e79285c476ad74ab.cdn.bubble.io%2Ff1690456451250x715678793440642600%2FWebsite%20%281%29.jpg?w=&auto=compress,&dpr=2&fit=max",
  },
  {
    id: 2,
    image:
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc28d53c20964e9d7e79285c476ad74ab.cdn.bubble.io%2Ff1690456451250x715678793440642600%2FWebsite%20%281%29.jpg?w=&auto=compress,&dpr=2&fit=max",
  },
  {
    id: 3,
    image:
      "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fc28d53c20964e9d7e79285c476ad74ab.cdn.bubble.io%2Ff1690456451250x715678793440642600%2FWebsite%20%281%29.jpg?w=&auto=compress,&dpr=2&fit=max",
  },
];
</script>

<style>
.carousel__item {
  width: 100%;
  border-radius: 0px;
  border-radius: 0px 50px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 0 10px;
}

.carousel__pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  line-height: 0;
  margin: 10px 0 0;
  position: absolute;
  bottom: 20px;
  left: 50%;
}
.carousel__pagination-item {
  background: rgba(84, 147, 218, 0.486);
  margin-left: 6px;
  border-radius: 100%;
  padding: 1px 1px;
}
.carousel__pagination-button--active {
  background: rgb(0, 110, 235);
  border-radius: 100%;
}
.carousel__pagination-button::after {
  display: none !important;
  content: "";
  width: var(--vc-pgn-width);
  height: var(--vc-pgn-height);
  border-radius: var(--vc-pgn-border-radius);
  background-color: var(--vc-pgn-background-color);
}
</style>
