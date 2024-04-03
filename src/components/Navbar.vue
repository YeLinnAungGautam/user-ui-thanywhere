<script setup>
import { XCircleIcon } from "@heroicons/vue/24/outline";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
</script>

<template>
  <div
    class="flex justify-between items-center py-2 px-4 space-x-4 h-[60px] bg-white drop-shadow"
  >
    <div class="flex justify-start items-center gap-2">
      <img src="../../public/web-logo.png" class="h-[30px]" alt="" />
      <p class="text-main text-base font-semibold">thailand anywhere</p>
    </div>
    <div v-if="route.path != '/'">
      <router-link to="/" class="">
        <XCircleIcon class="w-8 h-8 text-main" />
      </router-link>
    </div>
  </div>
</template>
