<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useRestaurantStore } from "../stores/restaurant";
import { useToastStore } from "../stores/toast";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  id: Number,
  hotels: Object,
});

const router = useRouter();
const restaurantStore = useRestaurantStore();
const toastStore = useToastStore();

const emit = defineEmits();

const goRoom = (id, name) => {
  router.push({
    name: "meal",
    params: {
      id: id,
      name: name,
    },
  });
};
const goView = (id) => {
  router.push({
    name: "restaurant-view",
    params: {
      id: id,
    },
  });
};
</script>

<template>
  <div class="space-y-2 relative group overflow-hidden rounded-lg">
    <div
      class="h-[230px] sm:h-[300px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-xl"
    >
      <div v-if="hotels?.images.length > 0">
        <Carousel :wrap-around="true">
          <Slide v-for="i in hotels?.images" :key="i.id">
            <div class="carousel__item">
              <div class="h-full w-full overflow-hidden rounded-xl">
                <img
                  :src="i.image"
                  alt=""
                  class="object-cover w-full h-full object-center"
                  v-if="i.image != null"
                />
                <img
                  src="../../public/default-image.jpg"
                  alt=""
                  class="object-cover w-full h-full object-center"
                  v-if="i.image == null"
                />
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <img
        src="../../public/default-image.jpg"
        alt=""
        class="object-cover w-full h-full object-center"
        v-if="hotels.images.length == 0"
      />
    </div>

    <div
      class="opacity-0 group-hover:opacity-100 absolute bg-white/80 top-[32%] w-full py-2 grid grid-cols-2 divide-x-2 divide-x-gray-400"
    >
      <p class="text-xs text-main text-center" @click="goRoom(id, hotels.name)">
        Relative Rooms
      </p>
      <p class="text-xs text-main text-center" @click="goView(id)">
        View Detail
      </p>
    </div>

    <div class="flex justify-between items-center gap-2">
      <div class="space-y-1 mt-2">
        <p class="text-base pl-2 font-semibold text-main">
          {{ hotels.name }}
        </p>
        <p class="text-sm pl-2">{{ hotels.place }}</p>
        <p class="text-sm pl-2">{{ hotels.city_name }}</p>
        <p class="text-sm pl-2 text-main">Allowment Available</p>
      </div>
      <div class="text-end">
        <p class="text-lg sm:text-lg pl-2 font-semibold text-main">
          {{ hotels.lowest_meal_price }}<span class="text-lg"> THB</span>
        </p>
        <p class="text-base pl-2 font-semibold text-main">
          {{ hotels?.meals?.length }} meals
        </p>
      </div>
    </div>
  </div>
</template>
