<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import {
  ChevronLeftIcon,
  HeartIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import {
  MapPinIcon,
  BuildingOffice2Icon,
  StarIcon,
} from "@heroicons/vue/24/solid";
import stayinbangkok from "../assets/db";
import StarPartVue from "../components/home/StarPart.vue";
import { useRouter } from "vue-router";
import HeaderHome from "../components/layout/HeaderHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { onMounted, ref } from "vue";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";

const cityStore = useCityStore();
const router = useRouter();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);

const open = () => {
  myBottomSheet.value.open();
};

const close = () => {
  myBottomSheet.value.close();
};

const data = stayinbangkok;

onMounted(async () => {
  await cityStore.getSimpleListAction();
});
</script>

<template>
  <Layout>
    <div>
      <HeaderHome :showTitle="false" class="px-6">
        <div class="flex justify-between items-center py-4">
          <ChevronLeftIcon
            class="w-6 h-6 text-white"
            @click="router.push('/home/hotel-bookings')"
          />
          <p class="text-white font-semibold">over 30 hotels</p>
          <p class="opacity-0">..</p>
        </div>
        <div class="relative w-full">
          <input
            type="search"
            name=""
            placeholder=" search"
            class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
            id=""
          />

          <img
            :src="searchIcon"
            class="w-5 h-5 absolute top-3.5 right-5 text-main"
            alt=""
          />
        </div>
      </HeaderHome>
      <div class="space-y-4 px-6 pt-6 pb-20">
        <div class="flex justify-between items-center mb-2">
          <h1 class="text-main font-semibold">hotels in bangkok</h1>
          <div
            class="flex justify-end items-center gap-2 cursor-pointer"
            @click="open"
          >
            <p class="text-[10px] text-main font-semibold">filter by</p>
            <ChevronDownIcon class="w-3 h-3 text-main" />
          </div>
        </div>
        <div
          class="border border-black/10 rounded-2xl shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
          v-for="i in data"
          :key="i"
        >
          <div class="w-full col-span-5 h-[182px] overflow-hidden rounded-2xl">
            <img
              :src="i?.images[0].image"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div class="col-span-6 relative">
            <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" />
            <div class="mr-6 overflow-hidden">
              <p
                class="text-sm font-semibold text-main max-h-[40px] overflow-hidden"
              >
                {{ i.name }}
              </p>
              <div class="flex justify-between items-center">
                <StarPartVue :count="3" />
                <div
                  class="text-[10px] flex justify-end items-center gap-0.5 py-1"
                >
                  <MapPinIcon class="w-3 h-3 text-black/50" />
                  <p>{{ i?.city.name }}</p>
                </div>
              </div>
              <p class="text-[8px] h-[36px] overflow-hidden">
                {{ i.description }}
              </p>
              <div class="absolute bottom-0">
                <p class="text-[8px]">nearby places</p>
                <div class="flex justify-start gap-2 items-center">
                  <div
                    class="text-[8px] flex justify-end text-main items-center gap-0.5 py-1"
                  >
                    <BuildingOffice2Icon class="w-2.5 h-2.5 text-main" />
                    <p>{{ i.place }}</p>
                  </div>
                </div>
                <p class="text-[10px] pb-1">start price</p>
                <p
                  class="bg-main text-white text-sm font-semibold px-3 inline-block py-0.5 rounded-full"
                >
                  {{ i.lowest_room_price }} THB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
      <div class="font-poppins">
        <div class="flex justify-between items-center px-6 pb-4">
          <p class="opacity-0">........</p>
          <p class="text-main text-base">filter</p>
          <XMarkIcon class="w-5 h-5" @click="close" />
        </div>
        <div class="border border-black/10 p-4 ml-4 mr-2 rounded-xl">
          <div class="space-y-3 pb-10">
            <div class="flex justify-between items-center">
              <p class="text-sm font-semibold">choose city</p>
              <ChevronUpIcon class="w-4 h-4" />
            </div>
            <div class="flex flex-wrap justify-start items-center gap-2">
              <div
                class="border border-black/60 rounded-lg px-4 py-1"
                v-for="(i, index) in cities?.data"
                :key="index"
              >
                <p class="text-[10px]">{{ i?.name }}</p>
              </div>
            </div>
          </div>
          <div class="space-y-3 pb-4">
            <div class="flex justify-between items-center">
              <p class="text-sm font-semibold">start rating</p>
              <ChevronUpIcon class="w-4 h-4" />
            </div>
            <div class="flex flex-wrap justify-start items-center gap-2 mr-5">
              <div
                class="border border-black/60 rounded-lg px-2 py-2"
                v-for="(i, index) in 4"
                :key="index"
              >
                <div class="flex justify-center items-center gap-1">
                  <p class="text-sm">{{ index + 2 }}</p>
                  <StarIcon class="w-5 h-5 text-main" />
                </div>
                <p class="text-[8px] text-black/70">6+hotels</p>
              </div>
            </div>
          </div>
          <div class="space-y-3 pb-8 pt-4">
            <div class="flex justify-between items-center">
              <p class="text-sm font-semibold">price range</p>
              <ChevronUpIcon class="w-4 h-4" />
            </div>
            <div class="space-y-2">
              <p class="text-xs font-medium">0 THB - 100000 THB</p>
              <div class="relative">
                <div
                  class="bg-white w-6 h-6 absolute bottom-3.5 rounded-full border border-main"
                ></div>
                <input
                  id="small-range"
                  type="range"
                  min="0"
                  max="100000"
                  value="100000"
                  class="w-full h-0.5 mb-6 focus:outline-none bg-main rounded-lg appearance-none cursor-pointer range-sm"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-between gap-4 items-center pt-4">
            <button
              @click="close"
              class="text-center border border-black/10 rounded-full py-2 w-[40%] text-sm text-main font-semibold"
            >
              clear
            </button>
            <button
              @click="filteredHotel"
              class="text-center border bg-main border-black/10 rounded-full py-2 w-[60%] text-sm text-white font-semibold"
            >
              see 50 hotels
            </button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </Layout>
</template>

<style></style>
