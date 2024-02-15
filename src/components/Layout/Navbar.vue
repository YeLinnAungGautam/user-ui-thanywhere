<script setup>
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  Bars3Icon,
  GlobeAltIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { onMounted, ref, watch, onBeforeUnmount } from "vue";

const router = useRouter();
</script>

<template>
  <div
    class="bg-white flex justify-between items-center py-2 gap-4 px-4 sticky w-full z-40 top-[-2px]"
  >
    <img
      src="../../../public/logo.png"
      alt=""
      class="w-10 transition hover:rotate-12 hover:translate-y-[-4px] cursor-pointer z-10"
      @click="router.push({ name: 'home' })"
    />

    <div class="relative w-[85%]">
      <input
        type="text"
        name=""
        class="px-4 py-3 text-xs border border-main rounded-3xl w-full"
        placeholder="Your Holiday Journey Begins Here"
        id=""
      />
      <MagnifyingGlassIcon
        class="text-white rounded-full w-8 absolute top-1 right-1.5 bg-main p-2"
      />
    </div>
  </div>
</template>
