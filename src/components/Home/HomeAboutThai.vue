<script setup>
import AboutThailCartVue from "../Layout/AboutThailCart.vue";
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <p class="text-lg font-semibold">Explore by Cities</p>
      </div>
    </div>
    <div class="flex py-4 space-x-4 rounded-lg shadow-sm overflow-x-scroll">
      <div v-for="a in 10" :key="a">
        <AboutThailCartVue />
      </div>
    </div>
  </div>
</template>
