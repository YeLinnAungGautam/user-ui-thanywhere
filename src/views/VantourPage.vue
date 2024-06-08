<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import vantourdb from "../assets/vantourdb";
// import stayinbangkok from "../assets/db";
import StarPartVue from "../components/home/StarPart.vue";
// import { ref } from "vue";
import { useRouter } from "vue-router";

const data = vantourdb;

const router = useRouter();
</script>

<template>
  <Layout>
    <HeaderHomeVue :showTitle="true">
      <div class="px-6 space-y-6">
        <div class="text-white pt-4">
          <p class="text-base font-semibold tracking-wider">
            van tour packages
          </p>
          <p class="text-xs">bangkok, pattaya, phuket, etc...</p>
        </div>
        <div class="relative" @click="router.push('/home/van-tour-search')">
          <input
            type="search"
            name=""
            placeholder=" search your vantour packages here"
            class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
            id=""
          />

          <img
            :src="searchIcon"
            class="w-5 h-5 absolute top-3.5 right-5 text-main"
            alt=""
          />
        </div>
      </div>
    </HeaderHomeVue>
    <div class="h-auto pb-20 pt-8 space-y-4 px-6">
      <h1 class="text-main font-semibold">popular van tours</h1>
      <div
        class="border border-black/10 rounded-2xl shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
        v-for="i in data"
        :key="i"
      >
        <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl">
          <img
            :src="i?.cover_image"
            class="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div class="col-span-6 relative">
          <div class="overflow-hidden space-y-1">
            <p class="text-sm font-semibold text-main">{{ i.name }}</p>
            <div class="flex justify-between items-center">
              <StarPartVue :count="5" />
            </div>
            <p class="text-[8px] h-[70px] overflow-hidden">
              {{ i.long_description }}
            </p>
            <div class="absolute bottom-0 space-y-0.5 w-full">
              <div class="flex justify-between items-center w-full">
                <p class="text-[8px] pb-1">starting price</p>
                <p class="text-xs text-main font-semibold">
                  {{ i.lowest_car_price }}THB
                  <span class="text-[8px] text-black/50">/person</span>
                </p>
              </div>
              <p
                class="bg-main text-white text-xs font-medium px-3 inline-block py-1 rounded-full"
              >
                view more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
