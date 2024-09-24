<template>
  <div>
    <transition name="fade">
      <div v-if="loading" class="animate transition">
        <LoadingPageVue />
      </div>
    </transition>
    <div class="relative" v-if="!loading">
      <div :style="imageStyles">
        <ImageCarousel :data="detail?.images" />
        <ChevronLeftIcon
          @click="router.push('/home/attraction')"
          class="bg-white rounded-full p-1.5 w-9 h-9 text-main z-20 absolute top-10 left-6"
        />
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

      <transition name="fade">
        <div
          v-if="showDiv"
          class="flex fixed shadow-custom top-0 py-3 bg-white w-full flex-1 justify-start space-x-4 px-5 items-center overflow-x-scroll z-20 scroll-container border-b border-black/10"
        >
          <a
            href="#highlight"
            :class="tagsNum == 1 ? 'text-main' : 'text-black/50'"
            @click="tagsNum = 1"
            class="text-xs font-semibold whitespace-nowrap"
            >highlights</a
          >
          <a
            href="#options"
            :class="tagsNum == 2 ? 'text-main' : 'text-black/50'"
            @click="tagsNum = 2"
            class="text-xs font-semibold whitespace-nowrap"
            >select options</a
          >
          <a
            href="#summary"
            :class="tagsNum == 3 ? 'text-main' : 'text-black/50'"
            @click="tagsNum = 3"
            class="text-xs font-semibold whitespace-nowrap"
            >package summary</a
          >
          <a
            href="#other"
            :class="tagsNum == 4 ? 'text-main' : 'text-black/50'"
            @click="tagsNum = 4"
            class="text-xs font-semibold whitespace-nowrap"
            >other attractions</a
          >
        </div>
      </transition>

      <div class="bg-black/5 relative">
        <div
          class="bg-black w-[45px] rounded-lg h-[6px] mx-auto absolute -top-4 z-30 left-[45%]"
        ></div>
        <div class="mb-4 space-y-3" id="highlight">
          <div class="space-y-2 bg-white px-6 mt-2 pb-6">
            <h1 class="text-main font-medium">{{ detail?.name }}</h1>

            <div class="flex justify-start flex-wrap items-center gap-1">
              <p
                v-for="c in detail?.cities"
                :key="c"
                class="text-[10px] px-2 flex justify-start items-center whitespace-nowrap py-1 bg-black/10 rounded-full text-black/70 gap-x-2"
              >
                <img :src="MapImage" class="w-3 h-3" alt="" />{{ c?.name }}
              </p>
            </div>
            <div class="pt-2">
              <h1 class="font-semibold border-l-4 mb-4 border-main pl-3">
                Highlights
              </h1>
              <div class="grid grid-cols-2 gap-1.5">
                <p v-for="i in 6" :key="i" class="text-xs text-black/20">
                  comming soon !
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-3 bg-white px-6 py-4" id="options">
            <h1 class="font-semibold border-l-4 mb-4 border-main pl-3">
              Select Options
            </h1>
            <div class="flex justify-start flex-nowarp items-center gap-2">
              <p
                class="text-xs px-3 py-1.5 border border-black/10 bg-black/5 rounded-full"
              >
                Ticket Peak Dates
              </p>
              <p
                class="text-xs px-3 py-1.5 border border-black/10 bg-black/5 rounded-full"
              >
                Ticket Off-Peak Dates
              </p>
            </div>
            <div class="space-y-3 pt-3 pb-2">
              <div
                v-for="i in detail?.variations"
                :key="i"
                @click="chooseDataFunction(i)"
                :class="i?.is_add_on != 1 ? '' : 'hidden'"
              >
                <EntranceVariationCartVue :data="i" />
              </div>
            </div>
            <p class="text-center text-xs pt-3">view more tickets</p>
            <!-- <h1 class="font-semibold border-l-4 mb-4 border-main pl-3">
              Select Add On Options
            </h1>

            <div class="space-y-6 pt-3 pb-2">
              <div
                v-for="i in detail?.variations"
                :key="i"
                :class="i?.is_add_on != 0 ? '' : 'hidden'"
              >
                <EntranceVariationCartVue :data="i" />
              </div>
            </div> -->
          </div>
          <div class="bg-white px-5 pt-4 pb-4" id="summary">
            <h1 class="font-semibold border-l-4 mb-4 border-main pl-3">
              Package Summary
            </h1>
            <p
              class="text-[13.5px] text-black/80 leading-6 px-2"
              :class="!seeMoreShow ? 'h-[145px] overflow-hidden' : 'h-auto'"
              v-html="
                language == 'english'
                  ? detail?.full_description_en
                  : detail?.description
              "
            ></p>
            <p
              class="text-[8px] text-main px-2 py-2"
              v-if="!seeMoreShow"
              @click="seeMoreShow = true"
            >
              see more
            </p>
            <p
              class="text-[8px] text-main px-2 py-2"
              v-if="seeMoreShow"
              @click="seeMoreShow = false"
            >
              see less
            </p>
          </div>
          <div class="bg-white mt-4 mb-4 px-6 pt-5 pb-20 space-y-6" id="other">
            <h1 class="font-semibold border-l-4 mb-4 border-main pl-3">
              other attractions in {{ detail?.cities[0]?.name }}
            </h1>
            <div
              class="flex justify-start items-center flex-nowrap overflow-scroll scroll-container pb-2"
            >
              <div
                class="border border-black/10 min-w-[230px] rounded-2xl shadow-sm bg-white mr-4"
                v-for="i in attractionList ?? []"
                :key="i"
                :class="detail?.name == i?.name ? 'hidden' : ''"
                @click="viewDetailFunction(i.id)"
              >
                <div
                  class="w-full col-span-5 h-[150px] overflow-hidden rounded-t-2xl"
                >
                  <img
                    :src="i?.cover_image"
                    class="w-full h-full object-cover"
                    alt=""
                    v-if="i?.cover_image"
                  />
                  <img
                    v-if="!i?.cover_image"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                    class="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div class="py-3 px-2">
                  <p class="text-sm font-semibold line-clamp-1">
                    {{ i?.name }}
                  </p>

                  <div
                    class="text-[10px] flex justify-start items-center gap-0.5 py-1"
                  >
                    <MapPinIcon class="w-3 h-3 text-black/80" />
                    <p class="text-black text-xs font-medium">
                      {{ i?.cities[0]?.name }}
                    </p>
                  </div>
                  <div class="text-[10px] gap-0.5 pt-2 space-y-2">
                    <p class="text-black text-xs font-medium">starting price</p>
                    <p
                      class="text-white bg-main inline-block px-4 text-sm font-semibold py-1 rounded-full"
                    >
                      ฿{{ i.lowest_variation_price }}
                      <span
                        class="text-[10px] line-through text-white/80 pl-3 font-normal"
                        >฿{{ i?.lowest_walk_in_price }}</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-white py-3 fixed bottom-0 text-center border-t shadow-custom border-black/10 w-full right-0 text-sm"
        >
          <div class="flex justify-between items-end px-6">
            <div class="space-y-2">
              <p class="text-xs">starting from</p>
              <p class="text-xl text-start font-semibold text-main">
                ฿ {{ detail?.lowest_variation_price }}
              </p>
            </div>
            <a
              href="#options"
              class="bg-main rounded-full px-6 flex justify-center items-center gap-x-2 py-2.5 text-center text-white"
            >
              <ChevronDoubleUpIcon class="w-5 h-5" />
              Select Options
            </a>
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
        <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
          <div class="font-poppins">
            <div class="h-[45vh]">
              <div class="flex justify-between items-center px-6 pb-4">
                <p class="opacity-0">........</p>
                <p>select options</p>
                <XMarkIcon class="w-5 h-5" @click="close" />
              </div>
              <div
                class="border-t border-black/10 p-4 ml-4 mr-4 overflow-scroll"
              >
                <div>
                  <div class="flex justify-between items-center">
                    <p class="text-sm pb-2">{{ chooseData?.name }}</p>
                    <!-- <p class="underline text-main text-xs">view detail</p> -->
                  </div>
                  <div
                    class="border border-black/10 shadow-custom mt-3 p-5 rounded-2xl flex justify-between items-center"
                  >
                    <p class="text-sm">Ticket Count</p>
                    <div class="flex justify-end items-center gap-x-4">
                      <div class="text-end">
                        <p class="text-main font-semibold text-lg">
                          {{ chooseData?.price }} thb
                        </p>
                        <p class="text-xs line-through">
                          {{
                            chooseData?.owner_price
                              ? chooseData?.owner_price
                              : ""
                          }}
                          thb
                        </p>
                      </div>
                      <div class="flex justify-end items-center">
                        <p
                          class="bg-main px-2 rounded-lg text-white text-xl"
                          v-if="chooseCount != 1"
                          @click="chooseCountMinus"
                        >
                          -
                        </p>
                        <p
                          class="bg-black/10 px-2 rounded-lg text-black/20 text-xl"
                          v-if="chooseCount == 1"
                        >
                          -
                        </p>
                        <p
                          class="px-3 py-1 font-semibold flex justify-start items-center flex-nowrap gap-x-2"
                        >
                          {{ chooseCount
                          }}<span class="text-xs font-normal">pax</span>
                        </p>
                        <p
                          class="bg-main px-2 rounded-lg text-white text-xl"
                          @click="chooseCountPlus"
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-t border-black/10 mt-4 w-full fixed bottom-0 shadow-custom"
              >
                <div class="flex justify-between items-center px-8 pt-3">
                  <p class="text-sm">Total Amount</p>
                  <p class="text-xl font-semibold text-main">
                    ฿
                    {{
                      chooseCount * (chooseData?.price ? chooseData?.price : 0)
                    }}
                  </p>
                </div>
                <div
                  class="flex justify-between px-6 items-center gap-x-4 pb-3"
                >
                  <div
                    class="bg-yellow py-2 mt-2 w-[48%] rounded-2xl text-center text-white text-sm"
                  >
                    <p>Add to Cart</p>
                  </div>
                  <div
                    class="bg-main py-2 mt-2 w-[48%] rounded-2xl text-center text-white text-sm"
                    @click="openDetailModal"
                  >
                    <p>Book now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vue-bottom-sheet>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ImageCarousel from "../components/hotelbookings/ImageCarousel.vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import {
  ChevronDoubleUpIcon,
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
// import { StarIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import EntranceVariationCartVue from "../components/cart/EntranceVariationCart.vue";
import { useSettingStore } from "../stores/setting";
import { storeToRefs } from "pinia";
import SaleModalVue from "../components/cart/SaleModalVue.vue";
import MapImage from "../assets/s/pin 1 (1).png";
import { MapPinIcon } from "@heroicons/vue/24/solid";

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
  const response = await entranceStore.getListAction({
    city_id: detail.value?.cities[0]?.id,
  });
  attractionList.value = response.data;
  console.log("====================================");
  console.log(attractionList.value, "this is attraction list");
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

const backLeftFunction = () => {
  type.value = "";
  viberModalOpen.value = false;
  modalOpen.value = true;
};

const attractionList = ref([]);

const scrollY = ref(0);
const tagsNum = ref(1);
const showDiv = ref(false);
const handleScroll = () => {
  scrollY.value = window.scrollY;
  showDiv.value = window.scrollY > 427;
  // console.log(window.scrollY);
};

const imageStyles = computed(() => {
  const opacity = Math.max(1 - scrollY.value / 300, 0); // Reduce opacity as user scrolls
  return {
    opacity: opacity,
  };
});

const myBottomSheet = ref(null);
const open = () => {
  myBottomSheet.value.open();
};
const close = () => {
  myBottomSheet.value.close();
};

const chooseCount = ref(1);
const chooseCountMinus = () => {
  if (chooseCount.value > 1) {
    chooseCount.value--;
  }
};
const chooseCountPlus = () => {
  chooseCount.value++;
};

const chooseData = ref(null);

const chooseDataFunction = (data) => {
  chooseData.value = data;
  open();
};

const viewDetailFunction = (id) => {
  router.push(`/home/attraction-detail/${id}`);
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  if (route.query.language) {
    await settingStore.changeLanguage(route.query.language);
    await settingStore.getLanguage();
  } else {
    await settingStore.getLanguage();
  }
  console.log("route.params.id", route.params.id);
  await getDetail(route.params.id);
});
watch(
  () => route.params.id,
  (newId) => {
    getDetail(newId); // Re-fetch data when the ID changes
  }
);

onBeforeUnmount(() => {
  // Clean up the scroll event listener when the component is destroyed
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
/* Define the fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease; /* Adjust duration and easing as needed */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0; /* Start or end with opacity 0 */
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1; /* End or start with opacity 1 */
}
</style>
