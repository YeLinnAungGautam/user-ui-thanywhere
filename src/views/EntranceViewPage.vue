<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { useEntranceStore } from "../stores/entrance";
import NoDataPageVue from "../components/NoDataPage.vue";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const router = useRouter();
const route = useRoute();
const entranceStore = useEntranceStore();

const hotel = ref(null);
const loading = ref(false);
const images = ref([]);
const detail = async () => {
  loading.value = true;
  const res = await entranceStore.getDetailAction(route.params.id);
  console.log(res);
  loading.value = false;
  hotel.value = res.data;
  images.value.push(res.data.cover_image);
  if (res.data.images.length > 0) {
    for (let i = 0; i < res.data.images.length; i++) {
      images.value.push(res.data.images[i].image);
    }
  }
  console.log(images.value, "thisis ");
};

const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  await detail();
});
</script>

<template>
  <div class="space-y-2 rounded-lg">
    <NavbarVue />
    <div class="px-4">
      <div class="relative">
        <div
          class="flex justify-start items-center gap-2 text-main absolute top-2 text-sm"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </div>

        <p class="text-main text-lg font-semibold pt-2 w-full text-center">
          Attraction Detail
        </p>
      </div>
      <div class="pt-4" v-if="!loading">
        <div v-if="images.length > 1" class="">
          <Carousel :wrap-around="true" :autoplay="5000">
            <Slide v-for="(i, index) in images" :key="index">
              <div class="carousel__item">
                <div class="h-auto w-full overflow-hidden rounded-lg">
                  <img :src="i" alt="" class="object-cover" />
                </div>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
        <div v-if="hotel?.cover_image && hotel?.images.length == 0">
          <div class="h-auto w-full overflow-hidden rounded-lg">
            <img :src="hotel?.cover_image" alt="" class="object-cover" />
          </div>
        </div>
        <div v-if="!hotel?.cover_image && hotel?.images.length == 0">
          <div class="h-auto w-full overflow-hidden rounded-lg">
            <img
              src="../../public/attraction.jpg"
              alt=""
              class="object-cover"
            />
          </div>
        </div>
        <div class="space-y-4 px-2 text-base font-semibold mt-3 text-main">
          <p class="">{{ hotel?.name }}</p>
          <p class="text-xs text-black font-normal">{{ hotel?.legal_name }}</p>

          <div class="grid grid-cols-2 gap-3">
            <p class="text-xs text-start py-1">City</p>
            <div
              class="text-start font-normal text-xs col-span-2 flex flex-wrap gap-2"
            >
              <p
                class="text-start font-normal text-xs mt-1"
                v-for="(i, index) in hotel?.cities"
                :key="index"
              >
                <span class="bg-main/10 py-1 px-2 rounded-md">{{
                  i.name
                }}</span>
              </p>
            </div>
          </div>
          <p class="text-xs text-black font-normal pt-2">
            {{ hotel?.description }}
          </p>
        </div>

        <div class="px-2 pt-6 pb-6 space-y-4 text-main font-semibold">
          <p>Related Variation Tickets</p>

          <div class="flex mb-5 pb-4 space-x-4 overflow-x-scroll">
            <div
              class="bg-white text-xs rounded-md my-auto text-black min-w-[250px] overflow-hidden space-y-1 h-auto"
              v-for="(r, index) in hotel?.variations"
              :key="index"
            >
              <div class="h-[150px] w-full overflow-hidden rounded-xl shadow">
                <img
                  src="https://img.freepik.com/free-photo/vintage-cinema-tickets_23-2148115333.jpg?t=st=1711831135~exp=1711834735~hmac=b33e38cdd9f8ca612bb415d054b411f089b68e3fe8701157a788c1ff107b22c9&w=740"
                  alt=""
                  class="object-cover w-full h-full object-center"
                />
              </div>

              <div class="h-[280px] space-y-3 py-4 px-2">
                <p class="text-main">Variation Name</p>
                <p class="font-normal">{{ r.name }}</p>
                <p class="text-main">Price</p>
                <p class="font-normal">{{ r.price }} THB</p>
                <p class="text-main">Description</p>
                <p class="font-normal">{{ r.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="pt-4">
        <div
          class="relative flex justify-center items-center py-[50%]"
          v-if="loading"
        >
          <div
            class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-main"
          ></div>
          <img src="../../public/logo.jpg" class="rounded-full h-16 w-16" />
        </div>
      </div>
    </div>
  </div>
</template>
