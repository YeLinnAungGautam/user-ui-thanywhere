<template>
  <div class="space-y-4 border border-black/10 px-5 mb-4 py-5 rounded-lg">
    <h1 class="text-xl font-medium">Inclusives</h1>
    <div class="grid grid-cols-2 gap-6 border-b border-black/10 pb-6">
      <div class="flex justify-start items-center space-x-4">
        <GlobeAltIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Tolls</p>
      </div>
      <div class="flex justify-start items-center space-x-4">
        <LockClosedIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Fuel</p>
      </div>
      <div class="flex justify-start items-center space-x-4">
        <FireIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Driver</p>
      </div>
      <div class="flex justify-start items-center space-x-4">
        <HomeModernIcon class="w-6 h-6" />
        <p class="text-xs font-medium">Hotel Pickup & Dropoff</p>
      </div>
    </div>
    <div class="py-2 space-y-2">
      <img
        src="https://img.freepik.com/free-vector/blue-hatchback-car-isolated-white-vector_53876-64419.jpg?size=626&ext=jpg&ga=GA1.2.302966112.1678379959&semt=ais"
        alt=""
      />
      <h1 class="text-xl font-medium flex justify-start items-center">
        <img
          src="../../../public/thailand-baht.png"
          alt=""
          class="w-5 h-5"
        />400 for 5 Seater
      </h1>
      <div class="space-y-2">
        <label for="" class="text-xs">TRAVEL DATE</label>
        <input
          type="date"
          name=""
          id=""
          class="w-full px-4 py-2 border border-black/30 focus:outline-none rounded-md"
        />
      </div>
      <div class="space-y-2">
        <label for="" class="text-xs">CAR TYPE</label>
        <v-select class="border border-black/30 px-4 rounded-md py-1" />
      </div>
      <div class="pt-3">
        <input
          type="submite"
          name=""
          value="Contact Sales"
          id=""
          class="w-full text-center px-4 py-3 text-white font-semibold bg-main border border-black/30 focus:outline-none rounded-md"
        />
      </div>
      <p class="text-xs text-black/90 text-center">You won't be charged yet.</p>
    </div>
  </div>
</template>

<script setup>
import {
  HeartIcon,
  ArrowUpTrayIcon,
  GlobeAltIcon,
  LockClosedIcon,
  FireIcon,
  HomeModernIcon,
} from "@heroicons/vue/24/outline";
</script>
