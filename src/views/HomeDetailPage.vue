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
        @click="router.back()"
        class="bg-white rounded-full p-1 w-8 h-8 text-main z-20 absolute top-10 left-6"
      />
      <div class="px-4">
        <div
          class="bg-white mt-4 mb-4 p-5 rounded-3xl border border-black/10 space-y-6"
        >
          <div class="space-y-2">
            <h1 class="text-main font-medium">{{ detail?.name }}</h1>
            <p
              class="text-[10px] px-2 py-0.5 bg-black/10 rounded inline-block text-black/80"
            >
              {{ detail?.place }}
            </p>
            <p
              class="text-[13.5px] text-black/80 leading-6"
              :class="!seeMoreShow ? 'h-[147px] overflow-hidden' : 'h-auto'"
              v-html="detail?.full_description"
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
            <!-- <div class="space-y-3">
              <p class="text-sm font-medium">room options</p>
              <div class="flex justify-between items-center">
                <div class="flex justify-start items-center gap-2">
                  <input type="checkbox" name="" id="" />
                  <p class="text-xs">non breakfast</p>
                </div>
                <p class="text-xs">+ 0 THB</p>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex justify-start items-center gap-2">
                  <input type="checkbox" name="" id="" />
                  <p class="text-xs">breakfast</p>
                </div>
                <p class="text-xs">+ 0 THB</p>
              </div>
            </div> -->
            <div
              class="flex flex-1 justify-start space-x-3 mt-6 pb-2 items-center overflow-x-scroll scroll-container"
            >
              <div v-for="i in detail?.rooms" :key="i">
                <div
                  class="bg-white shadow rounded-3xl p-2 border border-black/5 max-w-[220px]"
                  v-if="i?.is_extra != 1"
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
          </div>
          <div class="space-y-4 border-b border-black/10">
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
            <div class="space-y-2">
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
                    class="w-7 h-7 rounded-lg"
                    alt=""
                    v-if="i.image == 'undefined'"
                  />

                  <p class="text-xs font-medium">{{ i?.name }}</p>
                </div>
                <p class="text-xs font-medium">{{ i?.distance }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-main py-3 mb-10 rounded-3xl text-center text-white text-sm"
          @click="modalOpen = true"
        >
          <p>talk to sales</p>
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
              <XMarkIcon class="w-5 h-5" @click="modalOpen = false" />
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
              <a
                href=""
                class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
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
              </a>
              <a
                href=""
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
              </a>
              <a
                href=""
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
              </a>
            </div>
          </DialogPanel>
        </Modal>
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
import locationMap from "../assets/location.png";
import messengerIcon from "../assets/Booking icons/messenger.png";
import viberIcon from "../assets/Booking icons/viber.png";
import whatsappIcon from "../assets/Booking icons/whatsapp.png";
import callIcon from "../assets/Booking icons/call.png";
import Modal from "../components/layout/Modal.vue";
import { DialogPanel, DialogTitle } from "@headlessui/vue";
import LoadingPageVue from "../components/layout/LoadingPage.vue";

const route = useRoute();
const router = useRouter();
const hotelStore = useHotelStore();

const detail = ref(null);
const loading = ref(false);
const seeMoreShow = ref(false);

const getDetail = async (id) => {
  loading.value = true;
  const res = await hotelStore.getDetailAction(id);
  console.log("====================================");
  console.log(res);
  console.log("====================================");
  detail.value = res.data;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

const modalOpen = ref(false);

const goRoomDetail = (id) => {
  router.push({ name: "HomeRoomDetail", params: { id: id } });
};

onMounted(async () => {
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
