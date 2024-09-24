<template>
  <div class="relative h-screen">
    <div
      class="flex justify-between items-start h-[40vh] z-10 sticky top-0 bg-gradient-to-b to-main from-main/80 px-6 py-5 shadow-custom"
    >
      <ChevronLeftIcon class="w-5 h-5 text-white" @click="router.back()" />
      <p class="opacity-0">....</p>
    </div>
    <div class="w-[90vw] left-[5%] absolute top-[60px] space-y-5 z-10">
      <p
        class="text-white bg-white/20 rounded-full p-4 py-2 text-center w-[80%] mx-auto"
      >
        Booking expiry : 23:55:42
      </p>
      <p class="text-center text-white text-5xl font-semibold pt-2">
        ฿ 3560.00
      </p>
      <p class="text-center text-white">View booking detail</p>
      <div
        class="pt-3 pb-3 divide-y divide-black/10 rounded-xl w-full shadow-custom bg-white"
      >
        <div
          class="flex justify-between items-center px-6 py-3"
          v-for="m in 5"
          :key="m"
        >
          <div class="flex justify-start items-center space-x-5">
            <!-- <img src="" alt=""> -->
            <p>&&</p>
            <div>
              <p class="text-sm font-normal text-black/70">Mobile Banking</p>
              <p class="text-main text-[10px]">coming soon</p>
            </div>
          </div>
          <div class="my-auto">
            <input type="checkbox" name="" :checked="false" id="" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-black/10 absolute top-0 z-0 left-0 w-[100vw] h-[100vh]"
    ></div>
    <div
      class="fixed bottom-0 w-full py-3 border-t space-y-2 border-black/10 z-10 bg-white shadow-custom px-6"
    >
      <div
        class="bg-main py-2.5 w-full flex justify-center items-center gap-x-4 rounded-full text-center text-white text-sm"
      >
        Pay Now
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
