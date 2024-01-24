<script setup>
import ProductCartVue from "../ProductCart/GroupTourCart.vue";
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <p class="text-3xl font-semibold">Join Group Trips :</p>
      </div>
      <div class="flex justify-end items-center gap-10">
        <div
          class="flex justify-end items-center gap-2 text-[10px] text-black/80"
        >
          <p
            class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold"
          >
            Beach
          </p>
          <p
            class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold"
          >
            Mountain
          </p>
          <p
            class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold"
          >
            Island
          </p>
          <p
            class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold"
          >
            City
          </p>
          <p
            class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold"
          >
            Town
          </p>
        </div>
        <p
          class="text-xs text-red py-1 border-b border-red cursor-pointer font-semibold"
        >
          See all
        </p>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-10 py-8">
      <div v-for="a in 4" :key="a">
        <ProductCartVue />
      </div>
    </div>
  </div>
</template>
