<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { Switch } from "@headlessui/vue";
import SalesItemListVue from "../components/SalesItemList.vue";

const router = useRouter();
const enabled = ref(false);

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div>
    <NavbarVue />
    <div class="py-5 px-4 space-y-4 bg-black/5 min-h-screen">
      <div class="relative">
        <div
          class="flex justify-start items-center gap-2 text-main absolute top-1"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </div>

        <p class="text-main text-xl font-semibold w-full text-center">
          Sales Create
        </p>
      </div>
      <div class="space-y-3 pt-3">
        <div class="flex justify-between items-center bg-white px-4 py-2">
          <p>customer select</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
