<template>
  <div>
    <transition name="fade">
      <div v-if="loading" class="animate transition">
        <LoadingPageVue />
      </div>
    </transition>
    <div class="relative h-[100vh] w-[100vw] overflow-hidden" v-if="!loading">
      <!-- Image Div -->
      <div class="absolute w-full h-[30vh] bg-blue-400">
        <ImageCarousel :data="detail?.images" />
        <ChevronLeftIcon
          @click="router.push('/home/attraction')"
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
      </div>

      <!-- Content Div -->
      <div
        class="absolute left-0 right-0 z-30 bg-white shadow-lg pt-4 rounded-md transition-all duration-500"
        :class="contentPosition"
      >
        <div
          class="mx-auto h-2 rounded-2xl bg-black w-[50px] mb-4"
          @click="togglePosition"
          @touchstart="togglePosition"
        ></div>
        <div class="overflow-y-scroll" :class="contentdivPosition">
          <div class="px-4 bg-white">
            <div
              class="bg-white mb-4 p-5 rounded-3xl border border-black/10 space-y-6"
            >
              <div class="space-y-2">
                <h1 class="text-main font-medium">{{ detail?.name }}</h1>

                <div class="flex justify-start flex-wrap items-center gap-1">
                  <p
                    v-for="c in detail?.cities"
                    :key="c"
                    class="text-[10px] px-2 whitespace-nowrap py-0.5 bg-black/10 rounded inline-block text-black/70"
                  >
                    {{ c?.name }}
                  </p>
                </div>

                <p
                  class="text-[13.5px] text-black/80 leading-6"
                  :class="!seeMoreShow ? 'h-[145px] overflow-hidden' : 'h-auto'"
                  v-html="
                    language == 'english'
                      ? detail?.full_description_en
                      : detail?.description
                  "
                ></p>
                <p
                  class="text-[8px] text-main"
                  v-if="!seeMoreShow"
                  @click="seeMoreShow = true"
                >
                  see more
                </p>
                <p
                  class="text-[8px] text-main"
                  v-if="seeMoreShow"
                  @click="seeMoreShow = false"
                >
                  see less
                </p>
              </div>
              <div class="space-y-3">
                <h1 class="font-medium pt-3">ticket variations</h1>
                <div
                  class="flex flex-1 justify-start space-x-3 mt-6 pb-2 items-center overflow-x-scroll scroll-container"
                >
                  <div
                    v-for="i in detail?.variations"
                    :key="i"
                    :class="i?.is_add_on != 1 ? '' : 'hidden'"
                  >
                    <EntranceVariationCartVue :data="i" />
                  </div>
                </div>
              </div>
              <div class="space-y-3">
                <h1 class="font-medium pt-3">other options</h1>
                <div
                  class="flex flex-1 justify-start space-x-3 mt-6 pb-2 items-center overflow-x-scroll scroll-container"
                >
                  <div
                    v-for="i in detail?.variations"
                    :key="i"
                    :class="i?.is_add_on != 0 ? '' : 'hidden'"
                  >
                    <EntranceVariationCartVue :data="i" />
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
                  <XMarkIcon
                    class="w-5 h-5 text-main"
                    @click="modalOpen = false"
                  />
                </DialogTitle>
                <div class="grid grid-cols-2 gap-5">
                  <a
                    href="https://www.facebook.com/thailandanywherevip"
                    target="_blink"
                    class="outline-none text-center border border-black/20 flex flex-col justify-center items-center p-3 rounded-2xl space-y-1"
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
            <Modal
              :isOpen="viberModalOpen"
              @closeModal="viberModalCloseFunction"
            >
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ImageCarousel from "../components/hotelbookings/ImageCarousel.vue";
import {
  ChevronLeftIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
// import logo from "../assets/logo.png";
import ShareIcon from "../assets/web/send.png";
import LoadingPageVue from "../components/layout/LoadingPage.vue";
import messengerIcon from "../assets/Booking icons/messenger.png";
import viberIcon from "../assets/Booking icons/viber.png";
import whatsappIcon from "../assets/Booking icons/whatsapp.png";
import callIcon from "../assets/Booking icons/call.png";
import Modal from "../components/layout/Modal.vue";
import { DialogPanel, DialogTitle } from "@headlessui/vue";
import { useEntranceStore } from "../stores/entrance";
// import { StarIcon } from "@heroicons/vue/24/solid";
import EntranceVariationCartVue from "../components/cart/EntranceVariationCart.vue";
import { useSettingStore } from "../stores/setting";
import { storeToRefs } from "pinia";
import SaleModalVue from "../components/cart/SaleModalVue.vue";

const route = useRoute();
const router = useRouter();
const entranceStore = useEntranceStore();
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

const detail = ref(null);
const loading = ref(false);
const seeMoreShow = ref(false);

const getDetail = async (id) => {
  loading.value = true;
  const res = await entranceStore.getDetailAction(id);
  console.log("====================================");
  console.log(res);
  console.log("====================================");
  detail.value = res.data;
  loading.value = false;
};

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

onMounted(async () => {
  if (route.query.language) {
    await settingStore.changeLanguage(route.query.language);
    await settingStore.getLanguage();
  } else {
    await settingStore.getLanguage();
  }
  await getDetail(route.params.id);
});

// State to track the position of the content div
const isAtTop = ref(false);

// Compute the class based on the position
const contentPosition = computed(() => {
  return isAtTop.value ? "top-0 " : "top-[375px] rounded-t-3xl";
});
const contentdivPosition = computed(() => {
  return isAtTop.value ? "h-[100vh]" : "h-[56vh]";
});

// Function to toggle the position of the content div
const togglePosition = () => {
  isAtTop.value = !isAtTop.value;
};
</script>

<style scoped>
/* Optional additional styling */
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
