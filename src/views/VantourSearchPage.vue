<script setup>
import HeaderHome from "../components/layout/HeaderHome.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import searchIcon from "../assets/icons/search.png";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import Layout from "../components/layout/LayoutHome.vue";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
import vantourdb from "../assets/vantourdb";

const cityStore = useCityStore();

const { cities, loading } = storeToRefs(cityStore);

const router = useRouter();

const searchTag = ref(1);

const goResultPage = () => {
  router.push("/home/van-tour-result");
};

const all = ref(false);
const data = vantourdb;

onMounted(async () => {
  await cityStore.getSimpleListAction();
  console.log(cities.value);
});
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

            <div
              @click="goResultPage"
              class="absolute top-2 right-2 bg-main px-3 py-2 rounded-full shadow-custom flex justify-end items-center gap-1"
            >
              <img :src="searchIcon" class="w-4 h-4" alt="" />
              <p class="text-white text-xs">search</p>
            </div>
          </div>
        </div>
        <div class="pt-5 space-y-2">
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-white pb-2">
              most popular cities
            </p>
            <p
              class="text-white text-[10px] cursor-pointer"
              @click="all = !all"
            >
              {{ all ? "show less" : "show more" }}
            </p>
          </div>
          <div
            class="flex justify-start items-center gap-2 flex-wrap"
            v-if="!loading"
          >
            <div v-for="(c, index) in cities?.data" :key="c.id">
              <p
                v-if="index < 6 || all"
                class="px-4 py-1.5 bg-white text-[10px] text-main rounded-full"
              >
                {{ c?.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeaderHome>
    <div class="h-auto pb-20 pt-8 space-y-6">
      <div
        class="flex flex-1 justify-start space-x-4 pr-4 items-center overflow-x-scroll scroll-container"
      >
        <div
          class="space-y-2 w-[5.5rem] cursor-pointer ml-6"
          :class="searchTag == 1 ? 'border-b-2 border-main' : ''"
          @click="searchTag = 1"
        >
          <p class="text-xs text-main font-semibold text-center text-nowrap">
            top searches
          </p>
        </div>
        <div
          class="space-y-2 w-[6.5rem] cursor-pointer ml-6"
          :class="searchTag == 2 ? 'border-b-2 border-main' : ''"
          @click="searchTag = 2"
        >
          <p class="text-xs text-main font-semibold text-center text-nowrap">
            trending van tours
          </p>
        </div>
      </div>
      <div class="px-6">
        <transition-group name="slide" mode="out-in">
          <div class="space-y-3 min-h-[600px]" v-if="searchTag == 1">
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in data"
              :key="i"
            >
              <img
                :src="i?.cover_image"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">{{ i?.name }}</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    {{ i?.cities[0].name }}
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  {{ i?.lowest_car_price }}THB
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-3 min-h-[600px]" v-if="searchTag == 2">
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in data"
              :key="i"
            >
              <img
                :src="i?.cover_image"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">{{ i?.name }}</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    {{ i?.cities[0].name }}
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  {{ i?.lowest_car_price }}THB
                </p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </Layout>
</template>
