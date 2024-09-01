<template>
  <div>
    <transition name="fade">
      <div v-if="loading" class="animate transition">
        <LoadingPageVue />
      </div>
    </transition>
    <div class="relative" v-if="!loading">
      <ImageCarousel :data="detail?.images" />
      <ChevronLeftIcon
        @click="router.push('/home/hotel-bookings')"
        class="bg-white rounded-full p-1.5 w-9 h-9 text-main z-20 absolute top-10 left-6"
      />
      <!-- <ArrowUpTrayIcon
        class="bg-white rounded-full p-1.5 w-9 h-9 text-main z-20 absolute top-10 right-[70px]"
      /> -->
      <div
        @click="shareContent"
        class="bg-white rounded-full p-2 w-9 h-9 text-main z-20 absolute top-10 right-[70px]"
      >
        <img :src="ShareIcon" class="w-full h-full object-cover" alt="" />
      </div>
      <HeartIcon
        class="bg-white rounded-full p-1.5 w-9 h-9 text-main z-20 absolute top-10 right-6"
      />
      <div class="px-4">
        <div
          class="bg-white mb-4 p-5 rounded-3xl border border-black/10 space-y-6"
        >
          <div class="space-y-2">
            <h1 class="text-main font-medium">{{ detail?.name }}</h1>
            <!-- <p
              class="text-[10px] px-2 py-0.5 bg-black/10 rounded inline-block text-black/80"
            >
              {{ detail?.place }}
            </p> -->

            <div
              class="text-[10px] flex justify-start items-center gap-0.5 py-1"
            >
              <MapPinIcon class="w-3 h-3 text-black/50" />
              <p class="pt-0.5">
                {{ detail?.city?.name }} , {{ detail?.place }}
              </p>
            </div>

            <p
              class="text-[13.5px] text-black/80 leading-6"
              :class="!seeMoreShow ? 'h-[147px] overflow-hidden' : 'h-auto'"
              v-html="
                language == 'english'
                  ? detail?.full_description_en
                  : detail?.full_description
              "
            ></p>
            <p
              class="text-[12px] text-main"
              v-if="!seeMoreShow"
              @click="seeMoreShow = true"
            >
              see more
            </p>
            <p
              class="text-[12px] text-main"
              v-if="seeMoreShow"
              @click="seeMoreShow = false"
            >
              see less
            </p>
          </div>
          <div class="space-y-4">
            <h1 class="font-medium pt-2">popular amenities</h1>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="f in detail?.facilities"
                :key="f.id"
                class="flex justify-start items-center gap-2"
              >
                <img :src="f.image" alt="" class="w-6 h-6 object-fill" />
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
                v-for="i in detail?.rooms"
                :key="i"
                :class="i?.is_extra != 1 ? '' : 'hidden'"
                @click="goRoomDetail(i?.id)"
              >
                <div v-if="i?.is_extra != 1">
                  <RoomCart :i="i" />
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-3">
            <h1 class="font-medium pt-3">other options</h1>
            <div
              class="flex flex-1 justify-start space-x-3 mt-6 pb-2 items-center overflow-x-scroll scroll-container"
            >
              <div
                v-for="i in detail?.rooms"
                :key="i"
                @click="goRoomDetail(i?.id)"
                :class="i?.is_extra == 1 ? '' : 'hidden'"
              >
                <div v-if="i?.is_extra == 1">
                  <RoomCart :i="i" />
                </div>
              </div>
            </div>
          </div>
          <div
            class="space-y-4 border-b border-black/10"
            v-if="detail?.location_map != 'null'"
          >
            <h1 class="font-medium">location map</h1>
            <iframe
              :src="detail?.location_map"
              class="w-[100%] h-[200px] rounded-xl overflow-hidden"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <p class="text-xs pb-4 leading-5">
              {{ detail?.location_map_title }}
            </p>
            <!-- <p class="text-xs text-main pb-6">view in map</p> -->
          </div>
          <div class="space-y-6">
            <h1 class="font-medium">nearby places</h1>
            <div class="space-y-2 pb-3">
              <div
                class="flex justify-between items-center gap-2"
                v-for="i in detail?.nearby_places"
                :key="i"
              >
                <div class="flex justify-start items-center gap-2">
                  <img
                    :src="i?.image"
                    class="w-7 h-7 rounded-lg"
                    alt=""
                    v-if="i.image != 'undefined'"
                  />
                  <img
                    :src="locationMap"
                    class="w-5 h-5 rounded-lg"
                    alt=""
                    v-if="i.image == 'undefined'"
                  />

                  <p class="text-xs font-medium">{{ i?.name }}</p>
                </div>
                <p class="text-xs font-medium">{{ i?.distance }}</p>
              </div>
            </div>
          </div>
          <div
            class="bg-main py-3 mb-10 rounded-3xl text-center text-white text-sm"
            @click="modalOpen = true"
          >
            <p>talk to sales</p>
          </div>
        </div>
        <div
          class="bg-white mt-4 mb-4 p-5 rounded-3xl border border-black/10 space-y-6"
        >
          <h1 class="font-medium">other hotels in {{ detail?.place }}</h1>
          <div
            class="flex justify-start items-center flex-nowrap overflow-scroll scroll-container pb-2"
          >
            <div
              class="border border-black/10 min-w-[230px] rounded-2xl shadow-sm bg-white mr-4"
              v-for="i in placeList ?? []"
              :key="i"
              :class="detail?.name == i?.name ? 'hidden' : ''"
            >
              <div
                @click="goDetialPage(i?.id)"
                class="w-full col-span-5 h-[150px] overflow-hidden rounded-t-2xl"
              >
                <img
                  :src="i?.images[0]?.image"
                  class="w-full h-full object-cover"
                  alt=""
                  v-if="i?.images.length > 0"
                />
                <img
                  v-if="i?.images.length == 0"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                  class="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div class="py-3 px-2">
                <p class="text-sm font-semibold line-clamp-2">{{ i?.name }}</p>
                <p class="text-[10px] text-black font-medium">
                  {{ i.rating }}-star rating
                </p>
                <div
                  class="text-[10px] flex justify-start items-center gap-0.5 py-1"
                >
                  <MapPinIcon class="w-3 h-3 text-black/80" />
                  <p class="text-black text-xs font-medium">
                    {{ i?.city.name }} , {{ i?.place }}
                  </p>
                </div>
                <div class="text-[10px] gap-0.5 pt-2 space-y-2">
                  <p class="text-black text-xs font-medium">
                    starting room price
                  </p>
                  <p
                    class="text-white bg-main inline-block px-4 text-sm font-semibold py-1 rounded-full"
                  >
                    {{ i.lowest_room_price }} THB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal :isOpen="modalOpen" @closeModal="modalOpen = false">
          <DialogPanel
            class="w-full font-poppins max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <DialogTitle
              as="div"
              class="text-lg flex justify-between items-center font-medium leading-6 text-gray-900 mb-5"
            >
              <p class="opacity-0">...</p>
              <p class="text-sm font-medium text-main">
                select on option to book
              </p>
              <XMarkIcon class="w-5 h-5 text-main" @click="modalOpen = false" />
            </DialogTitle>
            <div class="grid grid-cols-2 gap-5">
              <a
                href="https://www.facebook.com/thailandanywherevip"
                target="_blink"
                class="outline-none text-center bg-main/20 border border-main flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
              >
                <img
                  :src="messengerIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">messenger</p>
                </div>
              </a>
              <div
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
                @click="viberModalOpenFunction('viber')"
              >
                <img
                  :src="viberIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">viber</p>
                </div>
              </div>
              <div
                @click="viberModalOpenFunction('whatsapp')"
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
              >
                <img
                  :src="whatsappIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">whats app</p>
                </div>
              </div>
              <div
                @click="viberModalOpenFunction('phone')"
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
              >
                <img
                  :src="callIcon"
                  alt=""
                  class="w-14 h-14 my-3 object-cover mx-auto"
                />
                <div class="pt-1">
                  <p class="text-[10px]">book with</p>
                  <p class="text-xs font-medium">call center</p>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Modal>
        <Modal :isOpen="viberModalOpen" @closeModal="viberModalCloseFunction">
          <DialogPanel
            class="w-full font-poppins max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <DialogTitle
              as="div"
              class="text-lg flex justify-between items-center font-medium leading-6 text-gray-900 mb-5"
            >
              <div class="flex justify-start items-center gap-1">
                <ChevronLeftIcon
                  class="w-5 h-5 text-main"
                  @click="backLeftFunction"
                />
                <img
                  :src="viberIcon"
                  class="w-8 h-8"
                  alt=""
                  v-if="type == 'viber'"
                />
                <img
                  :src="whatsappIcon"
                  class="w-8 h-8"
                  alt=""
                  v-if="type == 'whatsapp'"
                />
                <img
                  :src="callIcon"
                  class="w-8 h-8"
                  alt=""
                  v-if="type == 'phone'"
                />
              </div>
              <p class="text-sm font-medium text-main">
                select on option to book
              </p>
              <XMarkIcon
                class="w-5 h-5 text-main"
                @click="viberModalCloseFunction"
              />
            </DialogTitle>
            <div>
              <SaleModalVue :type="type" />
            </div>
          </DialogPanel>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHotelStore } from "../stores/hotel";
import ImageCarousel from "../components/hotelbookings/ImageCarousel.vue";
import { useSettingStore } from "../stores/setting";
import {
  ChevronLeftIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import locationMap from "../assets/web/pin.svg";
import ShareIcon from "../assets/web/send.png";
import messengerIcon from "../assets/Booking icons/messenger.png";
import viberIcon from "../assets/Booking icons/viber.png";
import whatsappIcon from "../assets/Booking icons/whatsapp.png";
import callIcon from "../assets/Booking icons/call.png";
import Modal from "../components/layout/Modal.vue";
import { DialogPanel, DialogTitle } from "@headlessui/vue";
import LoadingPageVue from "../components/layout/LoadingPage.vue";
import { MapPinIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import RoomCart from "../components/LoadingCarts/RoomCart.vue";
import SaleModalVue from "../components/cart/SaleModalVue.vue";

const route = useRoute();
const router = useRouter();
const hotelStore = useHotelStore();
const settingStore = useSettingStore();

const detail = ref(null);
const loading = ref(false);
const seeMoreShow = ref(false);
const { language } = storeToRefs(settingStore);

const placeList = ref(null);

const getDetail = async (id) => {
  loading.value = true;
  const res = await hotelStore.getDetailAction(id);
  console.log("====================================");
  console.log(res);
  console.log("====================================");
  detail.value = res.data;
  const response = await hotelStore.getSimpleListAction({
    place: detail.value?.place,
  });
  console.log(response, "this is list");
  placeList.value = response.data;
  loading.value = false;
};

const modalOpen = ref(false);
const viberModalOpen = ref(false);
const type = ref("");

const viberModalOpenFunction = (data) => {
  modalOpen.value = false;
  type.value = data;
  viberModalOpen.value = true;
};

const viberModalCloseFunction = () => {
  type.value = "";
  viberModalOpen.value = false;
};

const backLeftFunction = () => {
  type.value = "";
  viberModalOpen.value = false;
  modalOpen.value = true;
};

const goRoomDetail = (id) => {
  router.push({ name: "HomeRoomDetail", params: { id: id } });
};

const goDetialPage = (id) => {
  router.push({ name: "HomeDetail", params: { id: id } });
};

watch(
  () => route.params.id,
  (newId) => {
    getDetail(newId); // Re-fetch data when the ID changes
  }
);

const shareContent = () => {
  // Check if the Web Share API is supported
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this awesome content!",
        text: "Here is some interesting content you might like.",
        url: window.location.href, // Current page URL
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.error("Error sharing", error));
  } else {
    console.error("Web Share API not supported");
  }
};

onMounted(async () => {
  await settingStore.getLanguage();
  await getDetail(route.params.id);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
