<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { useRestaurantStore } from "../stores/restaurant";
import NoDataPageVue from "../components/NoDataPage.vue";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const router = useRouter();
const route = useRoute();
const restaurantStore = useRestaurantStore();

const hotel = ref(null);
const loading = ref(false);
const detail = async () => {
  loading.value = true;
  const res = await restaurantStore.getDetailAction(route.params.id);
  console.log(res);
  loading.value = false;
  hotel.value = res.result;
};

const roomView = (id) => {
  router.push({
    name: "room_view",
    params: {
      id: id,
    },
  });
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
          class="flex justify-start items-center gap-2 text-main absolute top-1"
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

        <p class="text-main text-lg pt-1 font-semibold w-full text-center">
          Restaurant Detail
        </p>
      </div>
      <div class="pt-4" v-if="!loading">
        <div v-if="hotel?.images.length > 0">
          <Carousel :wrap-around="true" :autoplay="5000">
            <Slide v-for="i in hotel?.images" :key="i.id">
              <div class="carousel__item">
                <div class="h-auto w-full overflow-hidden rounded-lg">
                  <img
                    :src="i.image"
                    alt=""
                    class="object-cover"
                    v-if="i.image != null"
                  />
                  <img
                    src="../../public/default-image.jpg"
                    alt=""
                    class="object-cover"
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
        <div v-if="hotel?.images.length == 0">
          <div class="h-auto w-full overflow-hidden rounded-lg">
            <img
              src="../../public/default-image.jpg"
              alt=""
              class="object-cover"
            />
          </div>
        </div>
        <div class="space-y-4 px-2 text-lg font-semibold mt-3 text-main">
          <p class="">{{ hotel?.name }}</p>
          <div class="grid grid-cols-2 gap-2">
            <p class="border border-main text-xs text-start px-4 py-1">City</p>
            <p
              class="border border-main text-start px-4 py-1 font-normal text-xs"
            >
              {{ hotel?.city?.name }}
            </p>
            <p class="border border-main text-xs text-start px-4 py-1">Place</p>
            <p
              class="border border-main text-start px-4 py-1 font-normal text-xs"
            >
              {{ hotel?.place }}
            </p>
            <p class="border border-main text-xs text-start px-4 py-1">
              Lowest Price
            </p>
            <p
              class="border border-main text-start px-4 py-1 font-normal text-xs"
            >
              {{ hotel?.lowest_meal_price }} THB
            </p>
          </div>
        </div>

        <div class="px-2 pt-4 pb-6 space-y-4 text-main font-semibold">
          <p>Related Meals</p>
          <div
            class="flex mb-5 pb-4 space-x-3 rounded-lg shadow-sm overflow-x-scroll"
          >
            <div
              class="bg-white text-xs rounded shadow-md my-auto text-black min-w-[200px] space-y-1 h-auto border border-main"
              v-for="(r, index) in hotel?.meals"
              :key="index"
            >
              <div class="h-[120px] w-full overflow-hidden">
                <img
                  v-if="r.images.length > 0"
                  :src="r.images[0]?.image"
                  alt=""
                  class="object-cover w-full h-[120px]"
                />
                <img
                  v-if="r.images.length == 0"
                  src="https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg"
                  alt=""
                  class="object-cover w-full h-[120px]"
                />
              </div>

              <div class="h-[180px] space-y-1 py-4 px-4">
                <p class="text-main">Meal Name</p>
                <p class="font-normal">{{ r.name }}</p>
                <p class="text-main">Meal Price</p>
                <p class="font-normal">{{ r.meal_price }} THB</p>
                <p class="text-main">Max Person</p>
                <p class="font-normal">{{ r.max_person }}</p>
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
