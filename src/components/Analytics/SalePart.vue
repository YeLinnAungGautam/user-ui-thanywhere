<script setup>
import SaleGraphVue from "./SaleGraph.vue";
</script>

<template>
  <div class="px-4 space-y-4">
    <div class="bg-main rounded-3xl pt-3 pb-4 pr-3 pl-6 space-y-6">
      <div class="flex justify-between items-center">
        <p class="text-white text-xs">Overview</p>
        <p class="text-black px-6 py-2 bg-white rounded-full text-xs">
          November 23
        </p>
      </div>
      <div class="space-y-2">
        <p class="text-white text-5xl font-semibold">+156,000</p>
        <p class="text-white text-xl font-semibold">MMK Comission Earned</p>
      </div>
      <div class="space-y-2">
        <p class="text-white text-5xl font-semibold">+156</p>
        <p class="text-white text-xl font-semibold">Bookings this Month</p>
      </div>
    </div>
    <div>
      <SaleGraphVue />
    </div>
  </div>
</template>
