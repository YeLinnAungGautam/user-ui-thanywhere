<template>
  <div
    class="w-[100vw] h-[100vh] grid grid-cols-2 overflow-hidden bg-gradient-to-t to-[#e67c1d] from-[#e61c1c] relative"
  >
    <!-- <img
      :src="line"
      class="w-full h-full absolute top-0 left-0 opacity-10"
      alt=""
    /> -->
    <div class="py-14 px-14 space-y-20 relative">
      <div class="flex justify-start items-center">
        <img :src="logo" class="w-14" alt="" />
        <p class="text-white font-medium tracking-normal text-3xl">
          THAILAND ANYWHERE
        </p>
      </div>
      <div class="space-y-5">
        <p
          class="text-white font-semibold tracking-normal pb-4 text-4xl flex justify-start items-center gap-x-2"
        >
          Only available on Mobile
          <ArrowRightCircleIcon class="w-10 text-white" />
        </p>
        <p class="text-white text-3xl font-medium">Travel App for Thailand</p>
        <p class="text-white text-3xl font-medium">200+ packages</p>
      </div>
      <div class="absolute bottom-20 space-y-6">
        <img :src="icon" alt="" class="w-40" />
        <p class="text-[#ffbd38] font-medium tracking-normal text-3xl">
          Coming soon on
        </p>
        <p class="text-white text-3xl font-medium">Andriod and App stores</p>
      </div>
    </div>
    <div class="relative">
      <!-- show mobile version with iframe -->
      <div class="flex justify-center items-center w-full h-full relative">
        <img
          :src="iphone"
          alt=""
          class="absolute w-[412px] h-[85vh] right-[21%] z-0"
        />
        <iframe
          src="https://thanywhere.com"
          class="w-[452px] h-full rounded-[55px] border-4 border-black/10 absolute right-[18%]"
          style="transform: scale(0.8); transform-origin: center"
          allowfullscreen
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from "@/assets/logo.png";
import icon from "@/assets/icon_download.png";
import iphone from "@/assets/iphone.png";
// import line from "@/assets/line.png";
import { ArrowRightCircleIcon } from "@heroicons/vue/24/outline";
</script>
