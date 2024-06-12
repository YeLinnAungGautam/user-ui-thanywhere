<template>
  <div>
    <div
      v-if="loading"
      class="bg-black/30 h-screen flex justify-center items-center"
    >
      <img :src="logo" alt="" />
    </div>
    <div class="relative" v-if="!loading">
      <ImageCarousel :data="detail?.images" />
      <ChevronLeftIcon
        @click="router.back()"
        class="bg-white rounded-full p-1 w-8 h-8 text-main z-20 absolute top-10 left-6"
      />
      <div class="px-4">
        <div
          class="bg-white mt-4 mb-10 p-5 rounded-3xl border border-black/10 space-y-6"
        >
          <div class="space-y-2">
            <h1 class="text-main font-medium">{{ detail?.name }}</h1>
            <p
              class="text-[10px] px-2 py-0.5 bg-black/10 rounded inline-block text-black/80"
            >
              {{ detail?.place }}
            </p>
            <p class="text-[12.5px] text-black/80 leading-6">
              {{ detail?.description }}
            </p>
          </div>
          <div class="space-y-4" v-if="detail?.facilities.length > 0">
            <h1 class="font-medium pt-2">popular amenities</h1>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="f in detail?.facilities"
                :key="f.id"
                class="flex justify-start items-center gap-2"
              >
                <img :src="f.image" alt="" class="w-7 h-7 object-fill" />
                <p class="text-[10px] text-black/80">{{ f.name }}</p>
              </div>
            </div>
          </div>
          <div class="space-y-3">
            <h1 class="font-medium pt-3">select rooms</h1>
            <div
              class="flex flex-1 justify-start space-x-3 mt-6 pb-2 items-center overflow-x-scroll scroll-container"
            >
              <div
                class="bg-white shadow rounded-3xl p-2 border border-black/5"
                v-for="i in detail?.rooms"
                :key="i"
              >
                <div class="w-[200px] h-[150px] overflow-hidden">
                  <img
                    :src="i?.images[0]?.image"
                    v-if="i?.images.length > 0"
                    class="w-full h-full object-cover rounded-2xl"
                    alt=""
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                    v-if="i?.images.length == 0"
                    class="w-full h-full object-cover rounded-2xl"
                    alt=""
                  />
                </div>
                <div class="px-3 py-2 space-y-2">
                  <p class="font-medium text-xs">{{ i?.name }}</p>
                  <p class="text-green text-[10px]">Breakfast inclusive</p>
                  <div class="flex justify-between items-center gap-2">
                    <button
                      class="bg-main px-4 py-1 rounded-full text-sm text-white"
                    >
                      {{ i?.room_price }}THB
                    </button>
                    <p
                      class="text-[10px] text-main underline"
                      @click="goRoomDetail(i?.id)"
                    >
                      view detail
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-4 border-b border-black/10">
            <h1 class="font-medium">location map</h1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d496115.45960499597!2d100.3034458542391!3d13.724380961545613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2sBangkok%2C%20Thailand!5e0!3m2!1sen!2smm!4v1718167339230!5m2!1sen!2smm"
              class="w-[100%] h-[200px] rounded-xl overflow-hidden"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <p class="text-xs">
              9/9 king kaew road, soi 64, pratunam area, bangkok
            </p>
            <p class="text-xs text-main pb-6">view in map</p>
          </div>
          <div class="space-y-6">
            <h1 class="font-medium">nearby places</h1>
            <div class="space-y-2">
              <div
                class="flex justify-between items-center gap-2"
                v-for="i in 4"
                :key="i"
              >
                <div class="flex justify-start items-center gap-2">
                  <img
                    src="https://cdn-icons-png.freepik.com/512/3448/3448609.png"
                    class="w-8 h-8 rounded-lg"
                    alt=""
                  />
                  <p class="text-xs font-medium">fish market restaurant</p>
                </div>
                <p class="text-xs font-medium">5 mins drive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHotelStore } from "../stores/hotel";
import ImageCarousel from "../components/hotelbookings/ImageCarousel.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import logo from "../assets/logo.png";

const route = useRoute();
const router = useRouter();
const hotelStore = useHotelStore();

const detail = ref(null);
const loading = ref(false);

const getDetail = async (id) => {
  loading.value = true;
  const res = await hotelStore.getDetailAction(id);
  console.log("====================================");
  console.log(res);
  console.log("====================================");
  detail.value = res.data;
  loading.value = false;
};

const goRoomDetail = (id) => {
  router.push({ name: "HomeRoomDetail", params: { id: id } });
};

onMounted(async () => {
  await getDetail(route.params.id);
});
</script>
