<script setup>
import {
  HeartIcon,
  ArrowUpTrayIcon,
  GlobeAltIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/24/outline";
import BookingVue from "../components/Detail/HotelBooking.vue";
import DescriPartVue from "../components/Detail/HotelDescriPart.vue";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import Modal from "../components/Layout/Modal.vue";
import ImagePartVue from "../components/Detail/ImagePart.vue";
import LayoutVue from "../components/Layout/Layout.vue";
import ProductCartVue from "../components/Layout/ProductHotelCart.vue";
import { useRoute, useRouter } from "vue-router";
import { useHotelStore } from "../stores/hotel";
import { onMounted, ref, watch } from "vue";
import Pin from "../../public/pin-1-svgrepo-com.svg";

const route = useRoute();
const router = useRouter();
const hotelStore = useHotelStore();
const data = ref(null);

const getDetail = async (id) => {
  const res = await hotelStore.getDetailAction(id);
  data.value = res.result;
  console.log(data.value, "this is res");
  for (let x = 0; x < data?.value.images.length; x++) {
    let image = data?.value.images[x].image;
    imageSlide.value.push(image);
  }
};

const relate = ref(null);
const getRelate = async (id) => {
  const res = await hotelStore.getRelateAction(id);
  console.log(res, "this is relate");
  relate.value = res;
};

const imageSlide = ref([]);

const showModal = ref(false);
const ShowImage = () => {
  // console.log("image");
  showModal.value = !showModal.value;
};

const changeAgain = async (id) => {
  if (id && id != route.params.id) {
    router.push({
      name: "hotel-detail",
      params: {
        id: id,
      },
    });
    data.value = null;
    imageSlide.value = [];
    relate.value = null;
    await getDetail(id);
    await getRelate(id);
  }
};

onMounted(async () => {
  // console.log(route.params.id);
  // console.log(data.value);
  await getDetail(route.params.id);
  await getRelate(route.params.id);
});
</script>

<template>
  <div>
    <div class="px-4 border border-black/10 space-y-6">
      <div class="flex justify-between items-center relative">
        <h1
          class="text-lg font-medium flex justify-start items-center gap-2 absolute left-4 bottom-[-60px] z-50"
          @click="router.go(-1)"
        >
          <ChevronLeftIcon class="w-5 h-5 text-black" />
        </h1>
        <div
          class="flex justify-end items-center gap-8 absolute right-4 bottom-[-60px] z-50"
        >
          <div class="flex justify-start items-start gap-3">
            <HeartIcon class="w-5 h-5" />
          </div>
        </div>
      </div>

      <!-- modal -->
      <Modal :isOpen="showModal" @closeModal="showModal = false">
        <DialogPanel
          class="w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl"
        >
          <DialogTitle
            as="h3"
            class="mb-5 text-lg font-medium leading-6 text-gray-900"
          >
            <div class="flex justify-between items-center pb-2">
              <p class="font-poppins text-xs">Images</p>
              <p
                @click="ShowImage"
                class="bg-main py-1 px-1 rounded-3xl text-xs text-white"
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </p>
            </div>
            <div v-for="image in imageSlide" :key="image" class="">
              <a :href="image" target="_blink">
                <img :src="image" alt="" class="w-full h-auto mb-2" />
              </a>
            </div>
          </DialogTitle>
        </DialogPanel>
      </Modal>

      <ImagePartVue :image="imageSlide" @click="ShowImage" />
      <div class="">
        <div class="">
          <div class="space-y-2 pb-4 pt-4 border-b border-b-black/10">
            <h1 class="text-xl font-medium">{{ data?.name }}</h1>
            <div class="flex justify-start items-center gap-2">
              <img :src="Pin" class="h-4" alt="" />
              <p class="text-sm text-main">{{ data?.city?.name }}</p>
            </div>
            <div class="flex justify-start items-center gap-2 flex-wrap">
              <p class="text-main" v-for="t in data?.tags" :key="t.id">
                {{ t.name }}
              </p>
            </div>
          </div>
          <div class="space-y-4 py-4 border-b border-b-black/10">
            <h1 class="text-lg font-medium">Location :</h1>
            <div class="space-y-3">
              <div class="flex justify-start gap-3 items-center px-6">
                <GlobeAltIcon class="w-4 h-4" />
                <p v-if="data != null">
                  {{ data.place }}
                </p>
              </div>
            </div>
          </div>
          <DescriPartVue :data="data && data" />
          <div class="col-span-1" v-if="data?.rooms">
            <BookingVue
              :data="data?.rooms"
              :facility="data?.facilities"
              :lowest="data?.lowest_room_price"
            />
          </div>
        </div>

        <div class="">
          <h1 class="text-lg font-medium pb-5">Explore the Top Deals !</h1>
          <div class="flex overflow-x-scroll space-x-4 pb-6">
            <div v-for="a in relate?.data" :key="a.id">
              <ProductCartVue :data="a" @change="changeAgain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
