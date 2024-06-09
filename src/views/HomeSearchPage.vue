<script setup>
import HeaderHome from "../components/layout/HeaderHome.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Layout from "../components/layout/LayoutHome.vue";

const router = useRouter();

const searchTag = ref(1);
</script>

<template>
  <Layout>
    <HeaderHome :showTitle="false">
      <div class="px-6">
        <div class="flex justify-start items-center gap-6">
          <ChevronLeftIcon class="w-6 h-6 text-white" @click="router.back()" />
          <div class="relative w-full">
            <input
              type="search"
              name=""
              placeholder=" search"
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
        <div class="pt-5 space-y-2">
          <p class="text-sm font-semibold text-white pb-2">most popular</p>
          <div class="flex justify-start items-center gap-2 flex-wrap">
            <p class="px-4 py-1.5 bg-white text-xs text-main rounded-full">
              vantours
            </p>
            <p class="px-4 py-1.5 bg-white text-xs text-main rounded-full">
              hotels
            </p>
            <p class="px-4 py-1.5 bg-white text-xs text-main rounded-full">
              entrance tickets
            </p>
            <p class="px-4 py-1.5 bg-white text-xs text-main rounded-full">
              all inclusive
            </p>
            <p class="px-4 py-1.5 bg-white text-xs text-main rounded-full">
              activities
            </p>
            <p class="px-4 py-1.5 bg-white text-xs text-main rounded-full">
              flight tickets
            </p>
          </div>
        </div>
      </div>
    </HeaderHome>
    <div class="h-auto pb-20 pt-8 space-y-6">
      <div
        class="flex flex-1 justify-start space-x-4 pr-4 items-center overflow-x-scroll scroll-container"
      >
        <div
          class="space-y-2 w-[8.5rem] cursor-pointer ml-6"
          :class="searchTag == 1 ? 'border-b-2 border-main' : ''"
          @click="searchTag = 1"
        >
          <p
            class="text-xs text-main font-semibold text-center whitespace-nowrap"
          >
            all products
          </p>
        </div>
        <div
          class="space-y-2 w-[9rem] cursor-pointer ml-6"
          :class="searchTag == 2 ? 'border-b-2 border-main' : ''"
          @click="searchTag = 2"
        >
          <p
            class="text-xs text-main font-semibold text-center whitespace-nowrap"
          >
            van tours
          </p>
        </div>
        <div
          class="space-y-2 w-[9.5rem] cursor-pointer ml-6"
          :class="searchTag == 3 ? 'border-b-2 border-main' : ''"
          @click="searchTag = 3"
        >
          <p
            class="text-xs text-main font-semibold text-center whitespace-nowrap"
          >
            hotel bookings
          </p>
        </div>
        <div
          class="space-y-2 w-[9rem] cursor-pointer ml-6"
          :class="searchTag == 4 ? 'border-b-2 border-main' : ''"
          @click="searchTag = 4"
        >
          <p
            class="text-xs text-main font-semibold text-center whitespace-nowrap"
          >
            attractions
          </p>
        </div>
        <div
          class="space-y-2 w-[9.5rem] cursor-pointer ml-6"
          :class="searchTag == 5 ? 'border-b-2 border-main' : ''"
          @click="searchTag = 5"
        >
          <p
            class="text-xs text-main font-semibold text-center whitespace-nowrap"
          >
            flight tickets
          </p>
        </div>
      </div>
      <div class="px-6">
        <transition-group name="slide" mode="out-in">
          <div class="space-y-3 min-h-[600px]" v-if="searchTag == 1">
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in 5"
              :key="i"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">product name</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    water activities
                  </p>
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    pattaya
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  1100THB
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-3 min-h-[600px]" v-if="searchTag == 2">
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in 2"
              :key="i"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">product name</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    water activities
                  </p>
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    pattaya
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  1100THB
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-3 min-h-[600px]" v-if="searchTag == 3">
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in 3"
              :key="i"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">product name</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    water activities
                  </p>
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    pattaya
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  1100THB
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-3 min-h-[600px]" v-if="searchTag == 4">
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in 5"
              :key="i"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">product name</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    water activities
                  </p>
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    pattaya
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  1100THB
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-3 min-h-[600px]" v-if="searchTag == 5">
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in 5"
              :key="i"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">product name</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    water activities
                  </p>
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    pattaya
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  1100THB
                </p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </Layout>
</template>

<style></style>
