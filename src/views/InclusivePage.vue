<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { useRouter } from "vue-router";
import { HeartIcon } from "@heroicons/vue/24/outline";

// const data = vantourdb;

const router = useRouter();
</script>

<template>
  <Layout>
    <HeaderHomeVue :showTitle="true">
      <div class="px-6 space-y-6">
        <div class="text-white pt-4">
          <p class="text-base font-semibold tracking-wider">
            all inclusive tours
          </p>
          <p class="text-xs">bangkok, pattaya, phuket, etc...</p>
        </div>
        <div class="relative" @click="router.push('/home/inclusive-search')">
          <input
            type="search"
            name=""
            placeholder="search trips"
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
      <h1 class="text-main font-semibold">popular packages</h1>
      <div
        class="border border-black/10 rounded-2xl shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
        v-for="i in 10"
        :key="i"
      >
        <div
          class="w-full col-span-5 min-h-[180px] max-h-[200px] overflow-hidden rounded-2xl"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
            class="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div class="col-span-6 relative">
          <div class="overflow-hidden space-y-1">
            <div>
              <p class="text-xs font-semibold text-main pr-4">
                dream world some
              </p>
              <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" />
            </div>
            <div class="flex justify-start gap-1 flex-wrap items-center">
              <p
                class="whitespace-nowrap bg-black/10 text-[8px] px-1 py-0.5 rounded-md text-black/60"
                v-for="a in 4"
                :key="a"
              >
                bangkok
              </p>
            </div>
            <p class="text-[8px] h-[70px] overflow-hidden">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe id
              labore fuga esse, nesciunt sapiente impedit odit voluptatibus
              molestiae, consequuntur deleniti, magni quasi expedita velit
              tenetur cum dolorum minus libero!
            </p>
            <div class="absolute bottom-0 space-y-0.5">
              <p class="text-[10px] pb-1">starting price</p>
              <p
                class="bg-main text-white text-sm font-semibold px-3 inline-block py-0.5 rounded-full"
              >
                900THB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
