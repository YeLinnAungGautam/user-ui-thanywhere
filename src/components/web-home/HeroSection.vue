<template>
  <div class="w-full h-[650px] overflow-hidden relative">
    <div class="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
    <img :src="HomeCover" class="w-full h-full object-cover" alt="" />
    <div
      class="absolute z-20 w-full h-full top-0 flex justify-center items-center left-0"
    >
      <div class="mx-auto text-center">
        <p class="text-white text-5xl font-semibold">
          explore around THAILAND!
        </p>
        <p class="text-white pt-6 text-lg">
          from local escapes to far-flung advenytures, find what makes you happy
          anytime, anywhere
        </p>
        <div class="relative mt-6">
          <input
            type="search"
            name=""
            placeholder=" search for all products"
            class="w-full rounded-full px-20 py-6 text-base text-main focus:outline-none"
            id=""
          />
          <img
            :src="searchIcon"
            class="w-7 h-7 absolute top-6 left-8 text-black/50"
            alt=""
          />
          <button
            class="absolute top-3 right-4 bg-main text-white px-10 py-3 rounded-full"
          >
            search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeCover from "../../assets/web/home_cover.jpg";
import searchIcon from "../../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
</script>
