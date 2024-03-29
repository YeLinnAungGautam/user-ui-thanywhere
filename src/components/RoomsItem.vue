<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
// import { useHotelStore } from "../stores/hotel";
import { useRoomStore } from "../stores/room";
import { useToastStore } from "../stores/toast";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  id: Number,
  rooms: Object,
});

const router = useRouter();
// const hotelStore = useHotelStore();
const toastStore = useToastStore();
const roomStore = useRoomStore();

const emit = defineEmits();

const goView = (id) => {
  router.push({
    name: "room_view",
    params: {
      id: id,
    },
  });
};
</script>

<template>
  <div
    class="space-y-2 relative overflow-hidden rounded-xl"
    @click="goView(id)"
  >
    <div
      class="h-[230px] sm:h-[300px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-xl"
    >
      <div v-if="rooms?.images.length > 0">
        <Carousel :wrap-around="true">
          <Slide v-for="i in rooms?.images" :key="i.id">
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
          </template>
        </Carousel>
      </div>
      <img
        src="../../public/default-image.jpg"
        alt=""
        class="w-full h-full object-cover object-center"
        v-if="rooms.images.length == 0"
      />
    </div>

    <div class="space-y-3">
      <div class="space-y-2 mt-4">
        <p class="text-base pl-2 font-semibold text-main">
          {{ rooms.name }}
        </p>
        <p class="text-sm pl-2">{{ rooms.max_person }} Person Max</p>
      </div>
      <div class="text-start mt-2 flex justify-between items-center">
        <p class="text-xl pl-2 font-semibold text-main">
          {{ rooms.room_price }} THB
        </p>
        <p
          class="text-sm bg-main/10 px-2 py-1 rounded-md font-semibold text-main"
        >
          For {{ rooms.total_night }} Night
        </p>
      </div>
    </div>
  </div>
</template>
