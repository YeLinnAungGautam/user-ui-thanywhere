<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useHotelStore } from "../stores/hotel";
import { useToastStore } from "../stores/toast";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  id: Number,
  hotels: Object,
});

const router = useRouter();
const hotelStore = useHotelStore();
const toastStore = useToastStore();

const emit = defineEmits();

const goRoom = (id, name) => {
  router.push({
    name: "room",
    params: {
      id: id,
      name: name,
    },
  });
};
const goView = (id) => {
  router.push({
    name: "hotel_view",
    params: {
      id: id,
    },
  });
};

const showEdit = ref(false);
const showSetting = () => {
  showEdit.value = !showEdit.value;
};
</script>

<template>
  <div class="space-y-2 relative overflow-hidden rounded-xl group">
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
        v-if="hotels.images.length == 0"
      />
    </div>
    <div
      class="opacity-0 group-hover:opacity-100 absolute bg-white/80 top-[32%] w-full py-2 grid grid-cols-2 divide-x-2 divide-x-gray-400"
    >
      <p
        class="text-xs text-main text-center"
        @click="goRoom(id, hotels?.name)"
      >
        Relative Rooms
      </p>
      <p class="text-xs text-main text-center" @click="goView(id)">
        View Detail
      </p>
    </div>
    <div class="flex justify-between items-center gap-2">
      <div class="space-y-2 mt-2">
        <p class="text-base pl-2 font-semibold text-main">
          {{ hotels?.name }}
        </p>
        <p class="text-sm pl-2">{{ hotels?.place }}</p>
        <p class="text-sm pl-2">{{ hotels?.city_name }}</p>
        <p class="text-xs pl-2 text-main">Direct Partner</p>
      </div>
      <div class="text-end">
        <p class="text-xl pl-2 font-semibold text-main">
          {{ hotels?.lowest_room_price }}<span class="text-lg"> THB</span>
        </p>
        <p class="text-base pl-2 font-semibold text-main">
          {{ hotels?.rooms.length }} rooms
        </p>
      </div>
    </div>
  </div>
</template>
