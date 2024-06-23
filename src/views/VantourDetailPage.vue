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
          class="bg-white mt-4 mb-4 p-5 rounded-3xl border border-black/10 space-y-4"
        >
          <div class="space-y-2 border-b border-black/10 pb-4">
            <h1 class="text-main font-medium">{{ detail?.name }}</h1>
            <div class="flex justify-start items-center gap-1">
              <p class="text-[10px] py-0.5 rounded inline-block text-main">
                {{ detail?.destinations?.length }} destinations
              </p>
            </div>
            <p
              class="text-[13.5px] text-black/80 leading-6"
              :class="!seeMoreShow ? 'h-[147px] overflow-hidden' : 'h-auto'"
              v-html="detail?.long_description"
            ></p>
            <p
              class="text-[10px] text-main"
              v-if="!seeMoreShow"
              @click="seeMoreShow = true"
            >
              see more
            </p>
            <p
              class="text-[10px] text-main"
              v-if="seeMoreShow"
              @click="seeMoreShow = false"
            >
              see less
            </p>
          </div>
          <div class="space-y-3">
            <h1 class="font-medium text-main text-sm">destinations places</h1>
            <div
              class="flex flex-1 justify-start space-x-3 mt-6 pb-2 items-center overflow-x-scroll scroll-container"
              v-if="detail?.destinations.length > 0"
            >
              <div v-for="i in detail?.destinations" :key="i">
                <div class="w-[200px] h-[150px] overflow-hidden rounded-2xl">
                  <img
                    :src="i?.feature_img"
                    alt=""
                    v-if="i?.feature_img"
                    class="w-full h-full object-cover"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                    alt=""
                    v-if="!i?.feature_img"
                    class="w-full h-full object-cover"
                  />
                </div>
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
import ImageCarousel from "../components/hotelbookings/ImageCarousel.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import logo from "../assets/logo.png";
import messengerIcon from "../assets/Booking icons/messenger.png";
import viberIcon from "../assets/Booking icons/viber.png";
import whatsappIcon from "../assets/Booking icons/whatsapp.png";
import callIcon from "../assets/Booking icons/call.png";
import Modal from "../components/layout/Modal.vue";
import { DialogPanel, DialogTitle } from "@headlessui/vue";
import { useVantourStore } from "../stores/vantour";
// import { StarIcon } from "@heroicons/vue/24/solid";

const route = useRoute();
const router = useRouter();
const vantourStore = useVantourStore();

const detail = ref(null);
const loading = ref(false);
const seeMoreShow = ref(false);

const getDetail = async (id) => {
  loading.value = true;
  const res = await vantourStore.getDetailAction(id);
  console.log("====================================");
  console.log(res);
  console.log("====================================");
  detail.value = res.data;
  loading.value = false;
};

const modalOpen = ref(false);

onMounted(async () => {
  await getDetail(route.params.id);
});
</script>

<style></style>
