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
          class="bg-white mt-4 mb-4 p-5 rounded-3xl border border-black/10 space-y-6"
        >
          <div class="space-y-2">
            <h1 class="text-main font-medium">{{ detail?.name }}</h1>
            <div class="flex justify-start items-center gap-1">
              <p
                class="text-[10px] px-2 py-0.5 bg-black/10 rounded inline-block text-black/70"
              >
                {{ detail?.city?.name }}
              </p>
            </div>
            <p
              class="text-[13.5px] text-black/80 leading-6"
              :class="!seeMoreShow ? 'h-[147px] overflow-hidden' : 'h-auto'"
              v-html="
                language == 'english' ? detail?.description : detail?.detail
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
            <h1 class="font-medium pt-3 text-main">relative car packages</h1>
            <div
              class="flex flex-1 justify-start space-x-3 mt-6 pb-2 items-center overflow-x-scroll scroll-container"
            >
              <div
                class="border border-black/10 min-w-[230px] rounded-2xl shadow-sm bg-white mr-4"
                v-for="i in related_list ?? []"
                :key="i"
              >
                <!-- @click="goDetialPage(i?.id)" -->
                <div
                  @click="goDetailPage(i?.id)"
                  class="w-full col-span-5 h-[150px] overflow-hidden rounded-t-2xl"
                >
                  <img
                    :src="i?.cover_image"
                    class="w-full h-full object-cover"
                    alt=""
                    v-if="i?.cover_image != null"
                  />
                  <img
                    v-if="i?.cover_image == null"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                    class="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div class="py-3 px-2">
                  <p class="text-sm font-semibold min-h-[40px]">
                    {{ i?.name }}
                  </p>
                  <p class="text-[10px] py-0.5 rounded inline-block text-main">
                    {{ i?.destinations?.length }} destinations
                  </p>

                  <div class="text-[10px] gap-0.5 pt-1 space-y-2">
                    <p class="text-black text-xs font-medium">
                      starting car price
                    </p>
                    <p
                      class="text-white bg-main inline-block px-4 text-sm font-semibold py-1 rounded-full"
                    >
                      {{ i.lowest_car_price }} THB
                    </p>
                  </div>
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
              <div class="">
                <img
                  :src="viberIcon"
                  class="w-10 h-10"
                  alt=""
                  v-if="type == 'viber'"
                />
                <img
                  :src="whatsappIcon"
                  class="w-10 h-10"
                  alt=""
                  v-if="type == 'whatsapp'"
                />
                <img
                  :src="callIcon"
                  class="w-10 h-10"
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
import { useDestinationStore } from "../stores/destination";
// import { useVantourStore } from "../stores/vantour";
// import { StarIcon } from "@heroicons/vue/24/solid";
// import EntranceVariationCartVue from "../components/cart/EntranceVariationCart.vue";
import { useSettingStore } from "../stores/setting";
import { storeToRefs } from "pinia";
import SaleModalVue from "../components/cart/SaleModalVue.vue";

const route = useRoute();
const router = useRouter();
const destinationStore = useDestinationStore();
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);
// const vantourStore = useVantourStore();

const detail = ref(null);
const loading = ref(false);
const seeMoreShow = ref(false);
const related_list = ref(null);

const getDetail = async (id) => {
  loading.value = true;
  const res = await destinationStore.getDetailAction(id);
  console.log("====================================");
  console.log(res);
  console.log("====================================");
  detail.value = res.data;
  // loading.value = false;

  const relative = await destinationStore.getRelativeTour(res.data.id);
  console.log("====================================");
  console.log(relative, "this is relative");
  related_list.value = relative?.data;
  console.log("====================================");

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

// const goRoomDetail = (id) => {
//   router.push({ name: "HomeRoomDetail", params: { id: id } });
// };

const goDetailPage = (id) => {
  router.push({
    name: "HomeVantourDetail",
    params: { id: id },
  });
};

watch(
  () => route.params.id,
  (newId) => {
    getDetail(newId); // Re-fetch data when the ID changes
  }
);

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
