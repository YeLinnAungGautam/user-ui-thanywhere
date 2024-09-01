<template>
  <div class="relative">
    <transition name="fade">
      <div v-if="loading" class="animate transition">
        <LoadingPageVue />
      </div>
    </transition>
    <div class="relative" v-if="!loading">
      <ImageCarousel :data="images" />
      <ChevronLeftIcon
        @click="router.push('/home/van-tour')"
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

      <transition name="fade">
        <div
          v-if="showDiv"
          class="flex sticky top-0 py-3 bg-white flex-1 justify-start space-x-4 px-5 items-center overflow-x-scroll scroll-container border-b border-black/30"
        >
          <a
            href="#destinations"
            :class="tagsNum == 1 ? 'text-black' : 'text-black/50'"
            @click="tagsNum = 1"
            class="text-xs font-semibold whitespace-nowrap"
            >destinations</a
          >
          <a
            href="#options"
            :class="tagsNum == 2 ? 'text-black' : 'text-black/50'"
            @click="tagsNum = 2"
            class="text-xs font-semibold whitespace-nowrap"
            >select options</a
          >
          <a
            href="#summary"
            :class="tagsNum == 3 ? 'text-black' : 'text-black/50'"
            @click="tagsNum = 3"
            class="text-xs font-semibold whitespace-nowrap"
            >package summary</a
          >
          <a
            href="#faqs"
            :class="tagsNum == 4 ? 'text-black' : 'text-black/50'"
            @click="tagsNum = 4"
            class="text-xs font-semibold whitespace-nowrap"
            >faqs</a
          >
          <a
            href="#other"
            :class="tagsNum == 5 ? 'text-black' : 'text-black/50'"
            @click="tagsNum = 5"
            class="text-xs font-semibold whitespace-nowrap"
            >other packages</a
          >
        </div>
      </transition>

      <div class="bg-black/5">
        <div class="">
          <div class="mt-4 mb-3 space-y-4">
            <div class="">
              <div class="bg-white px-5 py-2" id="destinations">
                <h1 class="text-main font-semibold">{{ detail?.name }}</h1>
                <div class="flex justify-start items-center gap-1">
                  <p
                    class="text-[10px] py-0.5 rounded inline-block text-main font-medium"
                  >
                    {{ detail?.destinations?.length }} destinations
                  </p>
                </div>

                <div
                  class="flex flex-1 justify-start space-x-3 mt-4 items-center overflow-x-scroll scroll-container"
                  v-if="detail?.destinations.length > 0"
                >
                  <div
                    v-for="i in detail?.destinations"
                    :key="i"
                    @click="goDetialDesPage(i.id)"
                  >
                    <div
                      class="w-[200px] h-[120px] overflow-hidden rounded-2xl"
                    >
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
                    <p
                      id="options"
                      class="text-xs pt-2 font-semibold pl-2 whitespace-nowrap"
                    >
                      {{ i?.name }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-white px-5 mt-3 pb-2 pt-5">
                <div class="space-y-3">
                  <h1 class="font-semibold border-l-4 border-main pl-3">
                    Select Options
                  </h1>
                  <div
                    class="flex flex-1 justify-start space-x-3 pt-2 pb-2 items-center overflow-x-scroll scroll-container"
                  >
                    <div
                      v-for="i in detail?.cars"
                      :key="i"
                      class="border border-black/10 min-w-[200px] rounded-2xl shadow-sm"
                      :class="
                        chooseData.name == i.name ? 'bg-main' : 'bg-white'
                      "
                      @click="chooseDataFunction(i)"
                    >
                      <div
                        class="col-span-5 w-[150px] mx-auto h-[120px] overflow-hidden rounded-t-2xl"
                      >
                        <img
                          :src="getCarTypeImage(i?.name)"
                          class="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <div
                        class="px-2 pb-3"
                        :class="
                          chooseData.name == i.name
                            ? 'text-white'
                            : 'text-black'
                        "
                      >
                        <p
                          class="text-sm font-semibold text-center line-clamp-1"
                        >
                          {{ i?.name }}({{ i?.max_person }} pax)
                        </p>

                        <div class="text-center">
                          <p class="inline-block px-4 text-xl font-semibold">
                            {{ i.price }} THB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div
                    class="flex flex-1 justify-start space-x-3 mt-2 pb-2 items-center overflow-x-scroll scroll-container"
                  >
                    <div
                      :class="
                        !choosePax
                          ? 'border-main text-main'
                          : 'border-black/50 text-black/80'
                      "
                      class="border rounded-lg space-y-1 w-[400px] p-3"
                      @click="choosePax = false"
                    >
                      <p class="text-xs font-medium whitespace-nowrap">
                        Private Tour (Without Tickets)
                      </p>
                      <p class="text-xs font-medium">+ 0 thb per pax</p>
                    </div>
                    <div
                      :class="
                        choosePax
                          ? 'border-main text-main'
                          : 'border-black/50 text-black/80'
                      "
                      @click="choosePax = true"
                      class="border rounded-lg space-y-1 w-[400px] p-3"
                    >
                      <p class="text-xs font-medium whitespace-nowrap">
                        Private Tour (With Tickets)
                      </p>
                      <p class="text-xs font-medium">+ 800 thb per pax</p>
                    </div>
                  </div>
                  <div class="space-y-2 pb-2">
                    <p class="text-base font-semibold">What's Included</p>
                    <div class="flex justify-start items-center gap-2">
                      <img :src="TrueIcon" class="w-4 h-4" alt="" />
                      <p class="text-sm font-medium">
                        Professional driver for 12 hours
                      </p>
                    </div>
                    <div class="flex justify-start items-center gap-2">
                      <img :src="TrueIcon" class="w-4 h-4" alt="" />
                      <p class="text-sm font-medium">Toll Fees</p>
                    </div>
                    <div class="flex justify-start items-center gap-2">
                      <img :src="TrueIcon" class="w-4 h-4" alt="" />
                      <p class="text-sm font-medium">Fuel Fees</p>
                    </div>
                    <div class="flex justify-start items-center gap-2">
                      <img :src="TrueIcon" class="w-4 h-4" alt="" />
                      <p class="text-sm font-medium">Liability Insurance</p>
                    </div>
                    <div class="flex justify-start items-center gap-2">
                      <img :src="TrueIcon" class="w-4 h-4" alt="" />
                      <p class="text-sm font-medium">
                        Private car for up to
                        {{ chooseData ? chooseData.max_person : 3 }} people
                      </p>
                    </div>
                    <div class="flex justify-start items-center gap-2">
                      <img :src="CrossIcon" class="w-4 h-4" alt="" />
                      <p class="text-sm font-medium">
                        Admission to Attractions
                      </p>
                    </div>
                    <div
                      class="flex justify-start items-center gap-2"
                      id="summary"
                    >
                      <img :src="CrossIcon" class="w-4 h-4" alt="" />
                      <p class="text-sm font-medium">Meals and Beverages</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="space-y-3">
                <div>
                  <ul class="space-y-2 pb-3">
                    <li
                      v-for="l in detail?.destinations"
                      :key="l.id"
                      class="text-xs font-medium flex justify-start items-center gap-2"
                    >
                      <div class="w-2 h-2 rounded-full bg-main"></div>
                      <p>{{ l.name }}</p>
                    </li>
                  </ul>
                </div>
              </div> -->

              <div class="bg-white px-5 py-4 mt-3">
                <div class="pb-2">
                  <h1 class="font-semibold border-l-4 mb-4 border-main pl-3">
                    Package Summary
                  </h1>
                  <p
                    class="text-[13.5px] text-black/80 leading-6 pb-2"
                    :class="
                      !seeMoreShow
                        ? 'h-[146px] overflow-hidden line-clamp-6'
                        : 'h-auto'
                    "
                    v-html="
                      language == 'english'
                        ? detail?.full_description_en
                        : detail?.long_description
                    "
                  ></p>
                  <div v-if="seeMoreShow">
                    <div
                      v-for="d in detail?.destinations"
                      :key="d"
                      class="space-y-2 pb-2"
                    >
                      <p class="text-sm font-semibold">
                        {{ d.name }}
                      </p>
                      <p class="text-[13.5px]">
                        {{ language == "english" ? d.place_id : d.summary }}
                      </p>
                    </div>
                  </div>
                  <p
                    class="text-[10px] text-main"
                    v-if="!seeMoreShow"
                    id="faqs"
                    @click="seeMoreShow = true"
                  >
                    see more
                  </p>

                  <p
                    class="text-[10px] text-main"
                    v-if="seeMoreShow"
                    id="faqs"
                    @click="seeMoreShow = false"
                  >
                    see less
                  </p>

                  <div class="pt-5">
                    <h1 class="font-semibold border-l-4 mb-4 border-main pl-3">
                      FAQs
                    </h1>
                    <div
                      class="divide-y divide-black/40 border-b border-black/40 border-t mt-3"
                    >
                      <div
                        class="flex justify-between items-center"
                        @click="
                          router.push('/home/van-tour-detail/pages/pickup')
                        "
                      >
                        <p class="py-3 font-semibold">
                          What time can you pick us up?
                        </p>
                        <ChevronRightIcon class="w-5 h-5" />
                      </div>
                      <div
                        class="flex justify-between items-center"
                        @click="
                          router.push('/home/van-tour-detail/pages/booktour')
                        "
                      >
                        <p class="py-3 font-semibold">How to book this tour?</p>
                        <ChevronRightIcon class="w-5 h-5" />
                      </div>
                      <div
                        class="flex justify-between items-center"
                        @click="
                          router.push('/home/van-tour-detail/pages/makepayment')
                        "
                      >
                        <p class="py-3 font-semibold">
                          How do I make a payment?
                        </p>
                        <ChevronRightIcon class="w-5 h-5" />
                      </div>
                      <div
                        class="flex justify-between items-center"
                        id="other"
                        @click="
                          router.push(
                            '/home/van-tour-detail/pages/conformation'
                          )
                        "
                      >
                        <p class="py-3 font-semibold">
                          How do I get conformation letter?
                        </p>
                        <ChevronRightIcon class="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white p-5 border border-black/10 space-y-6">
            <h1 class="font-semibold border-l-4 mb-4 border-main pl-3">
              other packages in {{ detail?.cities[0].name }}
            </h1>
            <div
              class="flex justify-start items-center flex-nowrap overflow-scroll scroll-container pb-2"
            >
              <div
                class="border border-black/10 min-w-[230px] rounded-2xl shadow-sm bg-white mr-4"
                v-for="i in relative_place ?? []"
                :key="i"
                :class="detail?.name == i?.name ? 'hidden' : ''"
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
                  <p class="text-sm font-semibold line-clamp-1">
                    {{ i?.name }}
                  </p>
                  <p class="text-[10px] py-0.5 rounded inline-block text-main">
                    {{ detail?.destinations?.length }} destinations
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
    <div
      v-if="!loading"
      class="px-5 pb-4 sticky z-10 bg-white pt-3 border-t border-black/30 bottom-0"
    >
      <div class="flex justify-between items-end">
        <div>
          <p class="text-sm font-semibold pb-2">Choose pax</p>
          <div class="flex justify-start items-center gap-1" v-if="!choosePax">
            <p class="bg-black/10 px-2 rounded-lg text-black/20 text-xl">-</p>
            <p class="px-3 py-1 font-semibold text-black/20">
              {{ chooseData && choosePax ? chooseData.max_person : 0 }}
            </p>
            <p class="bg-black/10 px-2 rounded-lg text-black/20 text-xl">+</p>
          </div>
          <div class="flex justify-start items-center gap-1" v-if="choosePax">
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
            <p class="px-3 py-1 font-semibold">
              {{ chooseCount }}
            </p>
            <p
              class="bg-main px-2 rounded-lg text-white text-xl"
              @click="chooseCountPlus"
              v-if="chooseCount != chooseData.max_person"
            >
              +
            </p>
            <p
              class="bg-black/10 px-2 rounded-lg text-black/20 text-xl"
              v-if="chooseCount == chooseData.max_person"
            >
              +
            </p>
          </div>
        </div>
        <p class="text-2xl font-semibold text-main" v-if="!choosePax">
          {{ chooseData ? chooseData.price : detail?.lowest_car_price }}
          thb
        </p>
        <p class="text-2xl font-semibold text-main" v-if="choosePax">
          {{
            chooseData
              ? chooseData.price * chooseCount
              : detail?.lowest_car_price
          }}
          thb
        </p>
      </div>
      <div
        class="bg-main py-3 mt-4 rounded-3xl text-center text-white text-sm"
        @click="modalOpen = true"
      >
        <p>talk to sales</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import ImageCarousel from "../components/hotelbookings/ImageCarousel.vue";
import TrueIcon from "../assets/s/circle.png";
import CrossIcon from "../assets/s/close.png";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
// import logo from "../assets/logo.png";
import ShareIcon from "../assets/web/send.png";
import LoadingPageVue from "../components/layout/LoadingPage.vue";
import { useSettingStore } from "../stores/setting";
import messengerIcon from "../assets/Booking icons/messenger.png";
import viberIcon from "../assets/Booking icons/viber.png";
import whatsappIcon from "../assets/Booking icons/whatsapp.png";
import callIcon from "../assets/Booking icons/call.png";
import Modal from "../components/layout/Modal.vue";
import { DialogPanel, DialogTitle } from "@headlessui/vue";
import { useVantourStore } from "../stores/vantour";
// import { StarIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import SaleModalVue from "../components/cart/SaleModalVue.vue";
import car1 from "../assets/s/17-removebg-preview.png";
import car2 from "../assets/s/16-removebg-preview.png";
import car3 from "../assets/s/15-removebg-preview.png";

const route = useRoute();
const router = useRouter();
const vantourStore = useVantourStore();

const detail = ref(null);
const loading = ref(false);
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);
const seeMoreShow = ref(false);
const images = ref([]);

const chooseData = ref(null);
const choosePax = ref(false);
const chooseCount = ref(1);
const tagsNum = ref(1);

const getDetail = async (id) => {
  loading.value = true;
  images.value = [];
  const res = await vantourStore.getDetailAction(id);
  console.log("====================================");
  console.log(res);
  console.log("====================================");
  detail.value = res.data;
  if (res.data.cars.length > 0) {
    chooseData.value = res.data.cars[0];
    if (chooseData.value) {
      chooseCount.value = chooseData.value.max_person;
    }
  }
  if (res.data.cover_image) {
    images.value.push({ image: res.data.cover_image });
  }
  // if (res.data.images.length > 0) {
  //   for (let i = 0; i < res.data.images.length; i++) {
  //     images.value.push({ image: res.data.images[i].image });
  //   }
  // }
  if (res.data.destinations.length > 0) {
    for (let i = 0; i < res.data.destinations.length; i++) {
      // if (res.data.destinations[i].images.length > 0) {
      //   for (let j = 0; j < res.data.destinations[i].images.length; j++) {
      //     images.value.push({
      //       image: res.data.destinations[i].images[j].image,
      //     });
      //   }
      // }
      images.value.push({
        image: res.data.destinations[i].feature_img,
      });
    }
  }
  console.log("====================================");
  console.log(images.value, "this is images");
  console.log("====================================");

  await getRelative(res.data?.cities[0]?.id);
  loading.value = false;
};

const chooseDataFunction = (data) => {
  chooseData.value = data;
  chooseCount.value = chooseData.value.max_person;
};

const chooseCountMinus = () => {
  chooseCount.value = chooseCount.value - 1;
};
const chooseCountPlus = () => {
  chooseCount.value = chooseCount.value + 1;
};

const getCarTypeImage = (cartype) => {
  switch (cartype.toLowerCase()) {
    case "saloon":
      return car1;
    case "suv":
      return car2;
    case "vip van":
      return car3;
    case "vvip van (luxury)":
      return car3;
    case "bus (30 seaters)":
      return car3;
    case "bus (20 seaters)":
      return car3;
    case "50 seaters bus":
      return car3;
    case "40 seaters bus":
      return car3;
    case "14 seater":
      return car3;
    default:
      return car1; // Default image
  }
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

const relative_place = ref(null);
const getRelative = async (city_id) => {
  const res = await vantourStore.getSimpleListAction({
    city_id: city_id,
    type: "vantour",
  });
  console.log("====================================");
  console.log(res, "this is relative");
  console.log("====================================");
  relative_place.value = res.data;
};

const goDetailPage = (id) => {
  router.push({
    name: "HomeVantourDetail",
    params: { id: id },
  });
};

const goDetialDesPage = (id) => {
  router.push({ name: "HomeDestinationDetail", params: { id: id } });
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

const showDiv = ref(false);
const handleScroll = () => {
  // Set showDiv to true if the scroll position is over 300px, otherwise false
  showDiv.value = window.scrollY > 427;
  // console.log(window.scrollY);
};

watch(
  () => route.params.id,
  (newId) => {
    getDetail(newId); // Re-fetch data when the ID changes
  }
);

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  await settingStore.getLanguage();
  await getDetail(route.params.id);

  if (window.location.hash) {
    const hash = window.location.hash.substring(1); // Remove the '#' from the hash
    const element = document.getElementById(hash);
    if (element) {
      // Scroll to the element smoothly
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
});

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
