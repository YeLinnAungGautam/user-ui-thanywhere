<template>
  <div
    class="flex justify-between items-center gap-4 px-10 lg:px-20 py-4 border-b border-black/10"
  >
    <div class="flex justify-start items-center gap-2">
      <img :src="Logo" class="w-20 h-20" alt="" />
      <p class="text-main font-semibold text-2xl">TH ANYWHERE</p>
    </div>
    <div class="flex justify-end items-center gap-10">
      <p class="text-black font-medium">about us</p>
      <p class="text-black font-medium">help</p>
      <p class="text-black font-medium">sign up</p>
      <p class="bg-main text-white px-6 font-medium py-1 rounded-full">
        log in
      </p>
    </div>
  </div>
</template>

<script setup>
import Logo from "../../assets/icons/web-logo.png";
</script>
