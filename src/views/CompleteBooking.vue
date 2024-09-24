<template>
  <div class="relative h-screen">
    <div
      class="flex justify-between sticky top-0 items-center bg-gradient-to-b to-main from-main/80 px-6 py-5 shadow-custom"
    >
      <ChevronLeftIcon class="w-5 h-5 text-white" @click="router.back()" />
      <p class="text-white">Complete booking</p>
      <p class="opacity-0">....</p>
    </div>
    <div class="pt-3 pb-20 divide-y-8 divide-black/10">
      <div
        class="flex justify-start items-center px-6 gap-4 pb-5 pt-1"
        v-for="o in 6"
        :key="o"
      >
        <div class="pt-4 w-full">
          <p class="text-sm text-main font-medium line-clamp-1">
            Sea life ocean world
          </p>
          <p class="text-[10px] line-clamp-1">
            sea life ocean world ( peak dates)
          </p>

          <p class="text-[10px] pt-4">29 sept 2024</p>
          <p class="text-[10px] pt-1">1X Child (2-1)</p>
          <div class="flex justify-between items-center pt-4">
            <p class="text-lg font-medium text-main">฿ 2550</p>
          </div>
        </div>
      </div>
      <div class="px-6 pt-4 pb-20">
        <h1 class="font-semibold border-l-4 border-main text-main pl-3">
          contact Info
        </h1>
        <div class="pt-3">
          <label for="" class="text-xs text-black/50">First Name *</label>
          <input
            type="text"
            placeholder=""
            class="w-full px-2 py-1 text-sm border-gray-300 focus:outline-none border-b border-black"
          />
        </div>
        <div class="pt-3">
          <label for="" class="text-xs text-black/50">Last Name *</label>
          <input
            type="text"
            class="w-full px-2 py-1 text-sm border-gray-300 focus:outline-none border-b border-black"
          />
        </div>
        <div class="pt-3">
          <label for="" class="text-xs text-black/50">Phone Number *</label>
          <div class="flex justify-start items-center gap-x-2">
            <input
              type="text"
              placeholder="+ 66"
              class="w-[100px] px-2 py-1 text-sm border-gray-300 focus:outline-none border-b border-black"
            />
            <input
              type="number"
              placeholder="XXXXXXXXXX"
              class="w-full px-2 py-1 text-sm border-gray-300 focus:outline-none border-b border-black"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-0 w-full py-3 border-t space-y-2 border-black/10 z-10 bg-white shadow-custom px-6"
    >
      <div class="flex justify-between items-center">
        <p class="text-sm">Total Payment :</p>
        <p class="text-2xl pt-1 font-medium text-main">฿ 1800</p>
      </div>
      <div
        @click="router.push('/home/booking/order/cart/complete/payment')"
        class="bg-main py-2.5 w-full flex justify-center items-center gap-x-4 rounded-full text-center text-white text-sm"
      >
        Complete booking
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
