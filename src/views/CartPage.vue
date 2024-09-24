<template>
  <div class="relative h-screen">
    <div
      class="flex justify-between sticky top-0 items-center bg-gradient-to-b to-main from-main/80 px-6 py-5 shadow-custom"
    >
      <ChevronLeftIcon class="w-5 h-5 text-white" @click="router.back()" />
      <p class="text-white">Cart ( 5 items )</p>
      <p class="opacity-0">....</p>
    </div>
    <div class="px-6 pt-3 pb-20 divide-y divide-black/10">
      <div
        class="flex justify-start items-center gap-4 pb-5 pt-1"
        v-for="o in 4"
        :key="o"
      >
        <div class="my-auto">
          <input type="checkbox" name="" :checked="false" id="" />
        </div>
        <img
          src="https://placehold.co/400"
          alt=""
          class="w-[100px] rounded-2xl shadow-custom my-auto"
        />
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
            <div class="flex justify-end items-center gap-x-2">
              <PencilSquareIcon class="w-5 h-5 text-main" />
              <TrashIcon class="w-5 h-5 text-main" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-0 w-full py-3 border-t border-black/10 z-10 bg-white shadow-custom px-6 flex justify-between items-end"
    >
      <div>
        <p class="text-sm">Seleted items (1)</p>
        <p class="text-2xl pt-1 font-medium text-main">฿ 1800</p>
      </div>
      <div
        @click="router.push('/home/booking/order/cart/complete')"
        class="bg-main py-2.5 w-[150px] flex justify-center items-center gap-x-4 rounded-full text-center text-white text-sm"
      >
        Book now
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
