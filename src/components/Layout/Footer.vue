<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";
import {
  HomeIcon,
  ReceiptPercentIcon,
  FunnelIcon,
  UserIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const route = useRoute();

const isHome = ref(false);

watch(() => {
  isHome.value =
    route.name?.includes("home") ||
    route.name?.includes("attractions") ||
    route.name?.includes("product-hotel");
});
</script>

<template>
  <div
    class="px-4 py-4 border-t border-black/10 grid grid-cols-5 gap-2 sticky bottom-0 bg-white"
  >
    <router-link to="/" class="space-y-1">
      <div
        class="flex justify-center hover:text-white text-black/60 rounded-full"
      >
        <HomeIcon
          class="w-8 h-8 hover:bg-main hover:rounded-full p-1 hover:w-8 hover:h-8"
          :class="isHome ? 'bg-main rounded-full text-white' : ''"
        />
      </div>
      <p class="text-xs float-end text-center text-main">Home</p>
    </router-link>
    <div class="space-y-1">
      <div
        class="flex justify-center hover:text-white text-black/60 rounded-full"
      >
        <ReceiptPercentIcon
          class="w-8 h-8 hover:bg-main hover:rounded-full p-1 hover:w-8 hover:h-8"
        />
      </div>
      <p class="text-xs float-end text-center text-main">Deals</p>
    </div>
    <div class="space-y-1">
      <div
        class="flex justify-center hover:text-white text-black/60 rounded-full"
      >
        <FunnelIcon
          class="w-8 h-8 hover:bg-main hover:rounded-full p-1 hover:w-8 hover:h-8"
        />
      </div>
      <p class="text-xs float-end text-center text-main">Search</p>
    </div>
    <div class="space-y-1">
      <div
        class="flex justify-center hover:text-white text-black/60 rounded-full"
      >
        <UserIcon
          class="w-8 h-8 hover:bg-main hover:rounded-full p-1 hover:w-8 hover:h-8"
        />
      </div>
      <p class="text-xs float-end text-center text-main">Account</p>
    </div>
    <div class="space-y-1">
      <div
        class="flex justify-center hover:text-white text-black/60 rounded-full"
      >
        <ChatBubbleLeftEllipsisIcon
          class="w-8 h-8 hover:bg-main hover:rounded-full p-1 hover:w-8 hover:h-8"
        />
      </div>
      <p class="text-xs float-end text-center text-main">Upcoming</p>
    </div>
  </div>
</template>
