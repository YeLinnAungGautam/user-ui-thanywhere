<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import HotelsGradesVue from "../components/hotelbookings/HotelsGrades.vue";
import stayinbangkok from "../assets/db";
import { HeartIcon } from "@heroicons/vue/24/outline";
import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/vue/24/solid";
import StarPartVue from "../components/home/StarPart.vue";
// import { DialogPanel, DialogTitle } from "@headlessui/vue";
// import { ref } from "vue";
import { useRouter } from "vue-router";

// const filterModal = ref(false);

const data = stayinbangkok;

const router = useRouter();

const filteredHotel = () => {
  router.push("/home/hotel-search");
};
</script>

<template>
  <Layout>
    <HeaderHomeVue :showTitle="true">
      <div class="px-6 space-y-6">
        <div class="text-white">
          <p class="text-base font-semibold tracking-wider">hotel bookings</p>
          <p class="text-xs">bangkok, pattaya, phuket, etc...</p>
        </div>
        <div class="relative">
          <input
            type="search"
            @focus="filteredHotel"
            name=""
            placeholder=" search would you like to stay"
            class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
            id=""
          />

          <img
            :src="searchIcon"
            class="w-5 h-5 absolute top-3.5 right-5 text-main"
            alt=""
          />
        </div>
      </div>
    </HeaderHomeVue>
    <div class="h-auto pb-20 pt-8 space-y-10">
      <HotelsGradesVue />
      <div class="space-y-4 px-6">
        <div class="flex justify-between items-center mb-2">
          <h1 class="text-main font-semibold">recommanded hotels</h1>
        </div>
        <div
          class="border border-black/10 rounded-2xl shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
          v-for="i in data"
          :key="i"
        >
          <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl">
            <img
              :src="i?.images[0].image"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div class="col-span-6 relative">
            <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" />
            <div class="mr-6 overflow-hidden">
              <p class="text-sm font-semibold text-main">{{ i.name }}</p>
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
              <div class="absolute bottom-0 space-y-0.5">
                <p class="text-[10px]">nearby places</p>
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
  </Layout>
</template>
