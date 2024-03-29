<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { useVantourStore } from "../stores/vantour";
import NoDataPageVue from "../components/NoDataPage.vue";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const router = useRouter();
const route = useRoute();
const vantourStore = useVantourStore();

const vantour = ref(null);
const loading = ref(false);
const detail = async () => {
  loading.value = true;
  const res = await vantourStore.getDetailAction(route.params.id);
  console.log(res);
  loading.value = false;
  vantour.value = res.data;
};

const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  await detail();
});
</script>

<template>
  <div class="space-y-2 rounded-xl">
    <NavbarVue />
    <div class="px-4 pt-3">
      <div class="relative">
        <div
          class="flex justify-start items-center gap-2 text-main absolute top-1 text-sm"
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

        <p class="text-main text-lg font-semibold w-full text-center">
          Vantour Detail
        </p>
      </div>
      <div class="pt-4" v-if="!loading">
        <div v-if="vantour?.images.length > 0">
          <Carousel :wrap-around="true" :autoplay="5000">
            <Slide v-for="i in vantour?.images" :key="i.id">
              <div class="carousel__item">
                <div class="h-auto w-full overflow-hidden rounded-xl">
                  <img
                    :src="i.image"
                    alt=""
                    class="w-full h-full object-cover object-center"
                    v-if="i.image != null"
                  />
                  <img
                    src="../../public/default-image.jpg"
                    alt=""
                    class="w-full h-full object-cover object-center"
                    v-if="i.image == null"
                  />
                </div>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
        <div v-if="vantour?.images.length == 0">
          <div class="h-auto w-full overflow-hidden rounded-xl">
            <img
              src="../../public/default-image.jpg"
              alt=""
              class="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        <div class="space-y-4 px-2 font-semibold mt-3 text-main">
          <p class="text-base">{{ vantour?.name }}</p>
          <div
            class="text-base mt-3 font-semibold flex justify-start items-center gap-2 flex-wrap"
          >
            <p
              v-for="(city, index) in vantour?.cities"
              :key="index"
              class="inline-block bg-main/20 text-xs px-1.5 py-1 rounded text-main"
            >
              {{ city.name }}
            </p>
            <!-- <p>{{ vantours?.cars.length }}</p> -->
          </div>
          <p class="text-sm text-black/80 text-justify font-normal">
            {{ vantour?.long_description }}
          </p>
        </div>

        <div class="space-y-4 px-2 text-lg my-4 text-main">
          <p class="text-xs text-main">Route Plan</p>
          <p class="text-sm text-black/80">
            {{ vantour?.description }}
          </p>
        </div>
        <div class="space-y-4 mb-5 mt-5">
          <p class="text-xs text-main px-2">Car Types</p>
          <div
            class="text-sm font-semibold grid grid-cols-2 gap-3 mx-2 px-5 text-black/70 bg-main/5 py-3 rounded-xl shadow"
            v-for="(c, index) in vantour?.cars"
            :key="index"
          >
            <p>{{ c.name }}</p>

            <p class="text-end"></p>
            <p>Max Person</p>
            <p class="text-end">{{ c.max_person }}</p>
            <p>Price</p>
            <p class="text-end">{{ c.price }} THB</p>
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
