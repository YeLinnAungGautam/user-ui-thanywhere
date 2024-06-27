<template>
  <div
    class="bg-gradient-to-t relative to-[#FF8541] from-[#EA5300] h-screen flex justify-center items-center"
  >
    <div class="mx-auto text-center text-white">
      <img :src="logo" alt="" class="mx-auto" />

      <h1 class="font-semibold text-lg">thailand anywhere</h1>
      <p class="text-[10px] font-medium pt-2">
        van tours . attractions . hotels . flights . all inclusives
      </p>
    </div>
    <img
      :src="background"
      alt=""
      class="absolute top-0 w-full h-full object-cover"
    />
  </div>
</template>

<script setup>
import logo from "../../assets/logo.png";
import background from "../../assets/onboarding screns/background opacity image.png";
</script>
