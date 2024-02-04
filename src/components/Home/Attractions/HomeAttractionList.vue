<script setup>
import ProductCartVue from "../../ProductCart/VantourCart.vue";
</script>

<template>
  <div>
    <div class="">
      <div class="flex justify-between items-center">
        <p class="text-lg font-semibold">Attractions Name :</p>
        <div>
          <p
            class="text-[10px] px-2 rounded-lg bg-main text-white py-0.5 cursor-pointer font-semibold"
          >
            See more
          </p>
        </div>
      </div>

      <div
        class="flex justify-start items-center gap-2 py-4 overflow-x-scroll scroll-container text-[10px] text-black/80"
      >
        <p
          v-for="p in 12"
          :key="p"
          class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold whitespace-nowrap"
        >
          City or Place
        </p>
      </div>
    </div>
    <div class="flex overflow-x-scroll scroll-container space-x-4 pb-4">
      <div v-for="a in 4" :key="a">
        <ProductCartVue />
      </div>
    </div>
  </div>
</template>
