<template>
  <div class="space-y-6">
    <h1 class="text-main font-semibold px-6">all products</h1>
    <div
      class="flex flex-1 justify-start space-x-4 pr-4 items-center overflow-x-scroll scroll-container"
    >
      <div class="space-y-2 w-[3.5rem] cursor-pointer ml-6" @click="hotelPage">
        <div
          class="bg-gradient-to-br to-main from-main/40 w-[3rem] p-3 rounded-full mx-auto overflow-hidden"
        >
          <!-- <HomeModernIcon class="max-w-7 max-h-7 text-white" /> -->
          <img :src="hotel" alt="" class="w-6 h-6 mx-auto" />
        </div>
        <p class="text-[10px] text-black text-center text-wrap">
          hotel bookings
        </p>
      </div>
      <div class="space-y-2 w-[3.5rem] cursor-pointer">
        <div
          class="bg-gradient-to-br to-main from-main/40 w-[3rem] p-3 rounded-full mx-auto overflow-hidden"
        >
          <!-- <BriefcaseIcon class="max-w-7 max-h-7 text-white" /> -->
          <img :src="inclusive" alt="" class="w-6 h-6 mx-auto" />
        </div>
        <p class="text-[10px] text-black text-center text-wrap">
          inclusive packages
        </p>
      </div>
      <div class="space-y-2 w-[3.5rem] cursor-pointer">
        <div
          class="bg-gradient-to-br to-main from-main/40 w-[3rem] p-3 rounded-full mx-auto overflow-hidden"
        >
          <!-- <CursorArrowRippleIcon class="max-w-7 max-h-7 text-white" /> -->
          <img :src="attraction" alt="" class="w-6 h-6 mx-auto" />
        </div>
        <p class="text-[10px] text-black text-center text-wrap">
          attraction tickets
        </p>
      </div>
      <div class="space-y-2 w-[3.5rem] cursor-pointer" @click="vantourPage">
        <div
          class="bg-gradient-to-br to-main from-main/40 w-[3rem] p-3 rounded-full mx-auto overflow-hidden"
        >
          <!-- <TruckIcon class="max-w-7 max-h-7 text-white" /> -->
          <img :src="vantour" alt="" class="w-6 h-6 mx-auto" />
        </div>
        <p class="text-[10px] text-black text-center text-wrap">
          private van tours
        </p>
      </div>
      <div class="space-y-2 w-[3.5rem] cursor-pointer">
        <div
          class="bg-gradient-to-br to-main from-main/40 w-[3rem] p-3 rounded-full mx-auto overflow-hidden"
        >
          <!-- <PaperAirplaneIcon class="max-w-7 max-h-7 text-white" /> -->
          <img :src="flight" alt="" class="w-6 h-6 mx-auto" />
        </div>
        <p class="text-[10px] text-black text-center text-wrap">
          flight tickets
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import hotel from "../../assets/icons/products icons/hotel booking icon.svg";
import inclusive from "../../assets/icons/products icons/all inclusive icon.svg";
import attraction from "../../assets/icons/products icons/attractions icon.svg";
import vantour from "../../assets/icons/products icons/van tours icon.svg";
import flight from "../../assets/icons/products icons/flight icon.svg";
import { useRouter } from "vue-router";

const router = useRouter();

const hotelPage = () => {
  router.push("/home/hotel-bookings");
};
const vantourPage = () => {
  router.push("/home/van-tour");
};
</script>
