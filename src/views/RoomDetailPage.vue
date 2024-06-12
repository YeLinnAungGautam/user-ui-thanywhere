<script setup>
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRoomStore } from "../stores/room";
import ImageCarousel from "../components/hotelbookings/ImageCarouselRoom.vue";
import Modal from "../components/layout/Modal.vue";
import { DialogPanel, DialogTitle } from "@headlessui/vue";
import messengerIcon from "../assets/Booking icons/messenger.png";
import viberIcon from "../assets/Booking icons/viber.png";
import whatsappIcon from "../assets/Booking icons/whatsapp.png";
import callIcon from "../assets/Booking icons/call.png";
import logo from "../assets/logo.png";

const route = useRoute();
const router = useRouter();
const roomStore = useRoomStore();
const loading = ref(false);

const detail = ref(null);

const getDetail = async (id) => {
  loading.value = true;
  const res = await roomStore.getDetailAction(id);
  console.log(res);
  detail.value = res.data;
  loading.value = false;
};

const bathroom = [
  { id: 1, name: "bathropes" },
  { id: 2, name: "free toiletries" },
  { id: 3, name: "hair dryer" },
  { id: 4, name: "private bedroom" },
  { id: 5, name: "rainfall showerhead" },
  { id: 6, name: "shampoo" },
  { id: 7, name: "shower" },
  { id: 8, name: "slippers" },
  { id: 9, name: "toothpaste" },
  { id: 10, name: "toothbrush" },
];

const food = [
  { id: 1, name: "electric kettle" },
  { id: 2, name: "free bottled water" },
  { id: 3, name: "refrigerator" },
  { id: 4, name: "hydrated drinks" },
];

const modalOpen = ref(false);

onMounted(async () => {
  await getDetail(route.params.id);
});
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="bg-black/30 h-screen flex justify-center items-center"
    >
      <img :src="logo" alt="" />
    </div>
    <div class="py-5" v-if="!loading">
      <div
        class="flex justify-between items-center gap-2 border-b border-black/5 shadow-sm px-6 pb-4"
      >
        <ChevronLeftIcon class="w-6 h-6 text-main" @click="router.back()" />
        <p class="font-medium text-main">{{ detail?.hotel?.name }}</p>
        <p class="opacity-0">....</p>
      </div>
      <div class="px-6 py-6 space-y-4">
        <ImageCarousel :data="detail?.images" />
        <p class="text-main font-medium text-center">{{ detail?.name }}</p>
        <div
          class="bg-white mt-4 mb-10 p-5 rounded-3xl border border-black/10 space-y-3"
        >
          <h1 class="font-medium">room amenities</h1>
          <div class="space-y-2 border-b border-black/10">
            <p class="text-sm font-medium pb-2 pt-2">bathroom</p>
            <div
              class="flex justify-start items-center gap-2"
              v-for="(b, index) in bathroom"
              :key="b.id"
              :class="index == bathroom.length - 1 ? 'pb-5' : ''"
            >
              <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
              <p class="text-[12px]">{{ b.name }}</p>
            </div>
          </div>

          <div class="space-y-2 pt-2">
            <p class="text-sm font-medium pb-2">food & drinks</p>
            <div
              class="flex justify-start items-center gap-2"
              v-for="b in food"
              :key="b.id"
            >
              <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
              <p class="text-[12px]">{{ b.name }}</p>
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <h1 class="font-medium">room options</h1>
          <p class="text-sm font-medium">extras</p>
          <div class="flex justify-between items-center">
            <div class="flex justify-start items-center gap-2">
              <input type="checkbox" name="" id="" />
              <p class="text-xs">no extra</p>
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
        </div>
        <div class="flex justify-between items-center pt-4">
          <p class="text-xs font-medium">taxs & fees included</p>
          <div class="text-end">
            <p class="text-[8px]">total amount</p>
            <p class="font-semibold text-main text-lg">
              {{ detail?.room_price }} THB
            </p>
          </div>
        </div>
        <div
          class="bg-main py-3 rounded-3xl text-center text-white text-sm"
          @click="modalOpen = true"
        >
          <p>talk to sales</p>
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
</template>

<style>
/* Custom CSS for black circle list markers */
</style>
