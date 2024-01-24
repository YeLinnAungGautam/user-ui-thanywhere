<script setup>
import AboutThailCartVue from "../Layout/AboutThailCart.vue";
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <p class="text-3xl font-semibold">Read about Thailand</p>
      </div>
      <div>
        <p
          class="text-xs text-red py-1 border-b border-red cursor-pointer font-semibold"
        >
          about us
        </p>
      </div>
    </div>
    <div
      class="flex py-10 mb-5 space-x-10 rounded-lg shadow-sm overflow-x-scroll"
    >
      <div v-for="a in 10" :key="a">
        <AboutThailCartVue />
      </div>
    </div>
  </div>
</template>
