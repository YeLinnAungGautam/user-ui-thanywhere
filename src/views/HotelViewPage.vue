<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { useHotelStore } from "../stores/hotel";
import NoDataPageVue from "../components/NoDataPage.vue";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const router = useRouter();
const route = useRoute();
const hotelStore = useHotelStore();

const hotel = ref(null);
const loading = ref(false);
const detail = async () => {
  loading.value = true;
  const res = await hotelStore.getDetailAction(route.params.id);
  console.log(res, "this is hotel");
  loading.value = false;
  hotel.value = res.data;
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
  <div class="space-y-2 rounded-xl">
    <NavbarVue />
    <div class="px-4">
      <div class="relative pt-2">
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

        <p class="text-main text-lg font-semibold w-full text-center">
          Hotel Detail
        </p>
      </div>
      <div class="pt-4" v-if="!loading">
        <div v-if="hotel?.images.length > 0">
          <Carousel :wrap-around="true" :autoplay="5000">
            <Slide v-for="i in hotel?.images" :key="i.id">
              <div class="carousel__item">
                <div class="h-auto w-full overflow-hidden rounded-xl">
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
          <div class="h-auto w-full overflow-hidden rounded-xl">
            <img
              src="../../public/default-image.jpg"
              alt=""
              class="object-cover"
            />
          </div>
        </div>
        <div class="space-y-4 px-2 text-base font-semibold mt-3 text-main">
          <p class="">{{ hotel?.name }}</p>
          <div class="grid grid-cols-2 gap-2">
            <p class="text-xs text-start py-1">City</p>
            <p class="text-start font-normal text-xs">
              <span class="bg-main/10 py-1 px-2 rounded-md">{{
                hotel?.city?.name
              }}</span>
            </p>
            <p class="text-xs text-start py-1">Place</p>
            <p class="text-start font-normal text-xs">
              <span class="bg-main/10 py-1 px-2 rounded-md">{{
                hotel?.place
              }}</span>
            </p>
            <p class="text-xs text-start py-1">Lowest Price</p>
            <p class="text-start font-normal text-xs">
              <span class="bg-main/10 py-1 px-2 rounded-md"
                >{{ hotel?.lowest_room_price }} THB</span
              >
            </p>
            <p
              class="col-span-2 text-xs text-black/80 text-justify leading-relaxed tracking-wide py-3 font-normal"
            >
              {{ hotel?.description }}
            </p>
          </div>
        </div>
        <div class="py-4 px-2 space-y-3">
          <p class="text-main font-semibold">Hotel Facilities</p>
          <div
            class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
            v-if="hotel?.facilities.length > 0"
          >
            <div
              v-for="f in hotel?.facilities"
              :key="f.id"
              class="flex justify-start gap-4"
            >
              <img :src="f.image" alt="" class="w-6 h-6" />
              <p class="text-xs">{{ f.name }}</p>
            </div>
          </div>
          <div v-if="hotel?.facilities.length == 0">
            <p class="text-xs">Facilities isn't in this detail ! 😒</p>
          </div>
        </div>
        <div class="px-2 pt-4 pb-6 space-y-4 text-main font-semibold">
          <p class="pb-3 pt-2">Related Rooms</p>
          <div class="flex mb-5 pb-4 space-x-4 overflow-x-scroll">
            <div
              class="bg-white text-xs rounded-md my-auto text-black min-w-[250px] overflow-hidden space-y-1 h-auto"
              v-for="(r, index) in hotel?.rooms"
              :key="index"
              @click="roomView(r.id)"
            >
              <div class="h-[150px] w-full overflow-hidden rounded-xl">
                <img
                  v-if="r.images.length > 0"
                  :src="r.images[0]?.image"
                  alt=""
                  class="object-cover w-full h-full object-center"
                />
                <img
                  v-if="r.images.length == 0"
                  src="https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg"
                  alt=""
                  class="object-cover w-full h-full object-center"
                />
              </div>

              <div class="h-[180px] space-y-3 py-4 px-2">
                <p class="text-main">Room Name</p>
                <p class="font-normal">{{ r.name }}</p>
                <p class="text-main">Room Price</p>
                <p class="font-normal">
                  {{ r.room_price }} THB for {{ r.max_person }} Max Person
                </p>
              </div>
              <!-- <div
                class="col-span-2 bg-main pl-2 text-white text-center py-2"
                
              >
                More Detail
              </div> -->
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
