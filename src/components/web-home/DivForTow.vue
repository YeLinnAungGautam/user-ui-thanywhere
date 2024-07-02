<template>
  <div class="grid grid-cols-2 gap-6 pt-14 px-10 lg:px-20">
    <div class="space-y-10">
      <h1 class="text-black font-semibold text-xl">
        unique hotels in thailand
      </h1>
      <div class="border border-black/10 rounded-xl px-4 shadow py-3">
        <UniqueHotelVue />
      </div>
    </div>
    <div class="space-y-10">
      <h1 class="text-black font-semibold text-xl">best selling van tours</h1>
      <div class="border border-black/10 rounded-xl shadow px-4 py-3">
        <BestSellingVanTours />
      </div>
    </div>
  </div>
</template>

<script setup>
import UniqueHotelVue from "./UniqueHotel.vue";
import BestSellingVanTours from "./BestSellingVanTours.vue";
</script>
