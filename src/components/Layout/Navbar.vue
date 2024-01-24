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

const lastScrollPosition = ref(0);
const isNavbarHidden = ref(false);
const currentScrollPosition = ref(window.scrollY);

const handleScroll = () => {
  currentScrollPosition.value = window.scrollY;

  if (currentScrollPosition.value == lastScrollPosition.value) {
    // Scrolling down, hide the navbar
    isNavbarHidden.value = false;
  } else {
    // Scrolling up, show the navbar
    isNavbarHidden.value = true;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <div
    class="bg-white py-2 px-[80px] sticky w-full z-40 top-[-2px] border border-black/10"
  >
    <div class="flex justify-between items-center">
      <div class="flex justify-start items-center gap-2">
        <img
          src="../../../public/logo.png"
          alt=""
          class="w-10 transition hover:rotate-12 hover:translate-y-[-4px] cursor-pointer z-10"
          @click="router.push({ name: 'home' })"
        />
        <p
          class="cursor-pointer text-sm font-semibold text-black/60 p-3 rounded-full"
        >
          Thailand Anywhere
        </p>
      </div>

      <div>
        <div
          class="flex justify-center items-center text-xs font-semibold gap-3"
        >
          <router-link
            to="/product/van-tour"
            active-class="bg-black/5"
            class="cursor-pointer hover:bg-black/5 text-black/60 p-3 rounded-full"
          >
            Van Tours
          </router-link>
          <router-link
            to="/product/attraction"
            active-class="bg-black/5"
            class="cursor-pointer hover:bg-black/5 text-black/60 p-3 rounded-full"
          >
            Attractions
          </router-link>
          <router-link
            to="/product/grouptour"
            active-class="bg-black/5"
            class="cursor-pointer hover:bg-black/5 text-black/60 p-3 rounded-full"
          >
            Group Tours
          </router-link>
          <router-link
            to="/product/hotel"
            active-class="bg-black/5"
            class="cursor-pointer hover:bg-black/5 text-black/60 p-3 rounded-full"
          >
            Hotels
          </router-link>
        </div>
      </div>
      <div class="flex justify-center items-center text-xs font-semibold gap-3">
        <GlobeAltIcon class="w-6 h-6" />
        <div
          class="bg-main text-white rounded-full flex justify-center items-center space-x-2 py-2 px-3 hover:shadow-md"
        >
          <Bars3Icon class="w-4 h-4" /><UserCircleIcon class="w-6 h-6" />
        </div>
      </div>
    </div>
    <div
      class="justify-center items-center absolute w-[93%] top-20 transition-transform"
      :class="isNavbarHidden ? 'hidden' : 'flex'"
    >
      <div
        class="px-4 border border-black/10 shadow-md rounded-full flex justify-center items-center mb-3 py-2 bg-white divide-x-2 divide-black/10"
      >
        <div class="px-4 space-y-1 w-60">
          <p class="text-[10px] font-semibold">Where</p>
          <p class="text-black/60 text-xs">Search destinations</p>
        </div>
        <div class="px-4 space-y-1">
          <p class="text-[10px] font-semibold">Check In</p>
          <p class="text-black/60 text-xs">Add dates</p>
        </div>
        <div class="px-4 space-y-1">
          <p class="text-[10px] font-semibold">Check Out</p>
          <p class="text-black/60 text-xs">Add dates</p>
        </div>
        <div class="px-4 space-y-1 w-60 relative">
          <p class="text-[10px] font-semibold">Who</p>
          <p class="text-black/60 text-xs">Add guests</p>
          <button class="absolute z-10 top-[-4px] right-[-5px]">
            <MagnifyingGlassIcon
              class="w-10 p-3 bg-main text-white rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
