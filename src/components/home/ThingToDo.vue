<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-main font-semibold px-6">things to do in bangkok</h1>
      <div
        class="text-[10px] font-semibold text-main flex justify-end items-center gap-1 mr-6"
      >
        see more <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div
      class="flex flex-1 justify-start space-x-3 mt-6 items-center overflow-x-scroll scroll-container"
    >
      <div
        class="bg-white shadow rounded-2xl mb-3"
        :class="i == 1 ? 'ml-6' : 'ml-0'"
        v-for="i in 5"
        :key="i"
      >
        <div class="w-[200px] h-[100px] overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0va-Y5gI_CwfAIlHes8kpl0pa_H5A1eAwYlRLivX-LiFpwQHA4VC0adh1Ng1ZDvLETII&usqp=CAU"
            class="w-full h-full object-cover rounded-2xl"
            alt=""
          />
        </div>
        <div class="px-3 py-2">
          <p class="text-main text-[10px]">amusement part</p>
          <p class="font-semibold text-sm">drean world</p>
          <button
            class="bg-main px-3 mt-2 mb-2 py-1 rounded-lg text-[10px] text-white"
          >
            show detail
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
</script>
