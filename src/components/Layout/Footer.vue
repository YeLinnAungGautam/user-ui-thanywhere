<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="mt-[60px]">
    <div class="border-t border-t-black/5 grid grid-cols-4 gap-10 py-12">
      <div class="flex justify-center items-center">
        <div class="space-y-2 h-[130px]">
          <p class="text-black cursor-pointer font-semibold">TRAVEL</p>
          <p class="text-black cursor-pointer hover:font-semibold text-xs">
            Browse
          </p>
          <p class="text-black cursor-pointer hover:font-semibold text-xs">
            Trips
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <div class="space-y-2 h-[130px]">
          <p class="text-black cursor-pointer font-semibold">HOST</p>
          <p class="text-black cursor-pointer hover:font-semibold text-xs">
            Listings
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <div class="space-y-2 h-[130px]">
          <p class="text-black cursor-pointer font-semibold">SUPPORT</p>
          <p
            class="text-black cursor-pointer hover:font-semibold text-xs"
            @click="router.push({ name: 'about' })"
          >
            About Us
          </p>
          <p class="text-black cursor-pointer hover:font-semibold text-xs">
            Terms of Service
          </p>
          <p class="text-black cursor-pointer hover:font-semibold text-xs">
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center px-[8%] pb-6">
      <div class="flex justify-center text-xs">
        <p>© 2023 Th Anywhere</p>
      </div>
      <div class="flex justify-end items-center gap-4">
        <a href="">
          <img
            src="../../../public/facebookIcon.png"
            alt=""
            class="w-10 opacity-60 hover:opacity-100 hover:scale-110"
          />
        </a>
      </div>
    </div>
  </div>
</template>
