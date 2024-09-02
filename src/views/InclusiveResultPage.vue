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

// const data = vantourdb;
const all = ref(false);

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
            @click="router.push('/home/inclusive')"
          />
          <p class="text-white font-semibold">over 30 packages</p>
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
          <h1 class="text-main font-semibold">bangkok all inclusive trips</h1>
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
          v-for="i in 10"
          :key="i"
        >
          <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div class="col-span-6 relative">
            <div class="overflow-hidden space-y-1">
              <div>
                <p class="text-xs font-semibold text-main pr-4">
                  dream world some
                </p>
                <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" />
              </div>
              <div class="flex justify-start gap-1 flex-wrap items-center">
                <p
                  class="whitespace-nowrap bg-black/10 text-[8px] px-1 py-0.5 rounded-md text-black/60"
                  v-for="a in 4"
                  :key="a"
                >
                  bangkok
                </p>
              </div>
              <p class="text-[8px] h-[70px] overflow-hidden">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                id labore fuga esse, nesciunt sapiente impedit odit voluptatibus
                molestiae, consequuntur deleniti, magni quasi expedita velit
                tenetur cum dolorum minus libero!
              </p>
              <div class="absolute bottom-0 space-y-0.5">
                <p class="text-[10px] pb-1">starting price</p>
                <p
                  class="bg-main text-white text-sm font-semibold px-3 inline-block py-0.5 rounded-full"
                >
                  900THB
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
        <div class="border border-black/10 p-4 ml-4 mr-4 rounded-xl">
          <div class="space-y-3 pb-8">
            <div class="flex justify-between items-center">
              <p class="text-sm font-semibold">choose city</p>
              <p
                class="text-black text-[10px] cursor-pointer"
                @click="all = !all"
              >
                {{ all ? "show less" : "show more" }}
              </p>
            </div>
            <!-- v-if="index < 8 || all" -->
            <div class="flex flex-wrap justify-start items-center gap-2">
              <div v-for="(c, index) in cities?.data" :key="index">
                <p
                  class="border border-black/60 text-[10px] rounded-lg px-4 py-1"
                >
                  {{ c?.name }}
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="pb-10 space-y-4">
            <p class="text-sm font-semibold">select activities type</p>
            <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
              <div
                class="px-2 py-2 space-y-1 w-[70px] mx-auto"
                v-for="(i, index) in 12"
                :key="index"
              >
                <div class="flex justify-center items-center gap-1">
                  <StarIcon class="w-10 h-10 text-main" />
                </div>
                <p class="text-[8px] text-black/70 text-center">
                  some text for search
                </p>
              </div>
            </div>
          </div> -->

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
              see 50 inclusives
            </button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </Layout>
</template>

<style></style>
