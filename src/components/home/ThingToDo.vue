<template>
  <div v-if="!loading">
    <div class="flex justify-between items-center">
      <h1 class="text-main font-semibold px-6">things to do in bangkok</h1>
      <div
        @click="router.push(`/home/attraction-result/2/Bangkok`)"
        class="text-[10px] font-semibold text-main flex justify-end items-center gap-1 mr-6"
      >
        see more <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div
      v-if="!entrances?.data"
      class="flex flex-1 justify-start space-x-3 mt-6 items-center overflow-x-scroll scroll-container"
    >
      <!-- <ThingToDoLoadingCartVue /> -->
      <div
        class="bg-white shadow rounded-2xl mb-3"
        :class="index == 0 ? 'ml-6' : 'ml-0'"
        v-for="(i, index) in 4"
        :key="i"
      >
        <!-- <div>
          <div class="w-[200px] h-[100px] overflow-hidden">
            <img
              :src="i?.cover_image"
              v-if="i?.cover_image"
              class="w-full h-full object-cover rounded-2xl"
              alt=""
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
              v-if="!i?.cover_image"
              class="w-full h-full object-cover rounded-2xl"
              alt=""
            />
          </div>
          <div class="px-3 py-2">
            <p class="text-main text-[10px]">bangkok</p>
            <p class="font-semibold text-sm line-clamp-1">{{ i?.name }}</p>
            <button
              class="bg-main px-3 mt-2 mb-2 py-1 rounded-lg text-xs font-semibold text-white"
            >
              {{ i?.lowest_variation_price }} thb
            </button>
          </div>
        </div> -->
        <div>
          <div class="w-[200px] h-[100px] overflow-hidden animate-pulse">
            <img
              :src="LoadingImageCover"
              class="w-full h-full object-cover opacity-30 rounded-2xl"
              alt=""
            />
          </div>
          <div class="px-3 py-2">
            <p
              class="text-main text-[10px] bg-black/20 w-10 h-2 animate-pulse"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-20 h-4 animate-pulse mt-2"
            ></p>
            <button
              class="bg-main animate-pulse px-3 mt-2 mb-2 py-1 rounded-lg text-xs font-semibold text-white"
            >
              loading
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="entrances?.data"
      class="flex flex-1 justify-start space-x-3 mt-6 items-center overflow-x-scroll scroll-container"
    >
      <!-- <ThingToDoLoadingCartVue /> -->
      <div
        class="bg-white shadow rounded-2xl mb-3"
        :class="index == 0 ? 'ml-6' : 'ml-0'"
        v-for="(i, index) in entrances?.data"
        @click="router.push('/home/attraction-detail/' + i.id)"
        :key="i"
      >
        <!-- <div>
          <div class="w-[200px] h-[100px] overflow-hidden">
            <img
              :src="i?.cover_image"
              v-if="i?.cover_image"
              class="w-full h-full object-cover rounded-2xl"
              alt=""
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
              v-if="!i?.cover_image"
              class="w-full h-full object-cover rounded-2xl"
              alt=""
            />
          </div>
          <div class="px-3 py-2">
            <p class="text-main text-[10px]">bangkok</p>
            <p class="font-semibold text-sm line-clamp-1">{{ i?.name }}</p>
            <button
              class="bg-main px-3 mt-2 mb-2 py-1 rounded-lg text-xs font-semibold text-white"
            >
              {{ i?.lowest_variation_price }} thb
            </button>
          </div>
        </div> -->
        <ThingToDoLoadingCartVue :i="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { onMounted } from "vue";
import { useEntranceStore } from "../../stores/entrance";
import { storeToRefs } from "pinia";
import ThingToDoLoadingCartVue from "../LoadingCarts/ThingToDoLoadingCart.vue";
import { useRouter } from "vue-router";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";

const entranceStore = useEntranceStore();
const router = useRouter();

const { entrances, loading } = storeToRefs(entranceStore);

onMounted(async () => {
  await entranceStore.getListAction({ city_id: 2 });
  console.log("====================================");
  console.log(entrances.value);
  console.log("====================================");
});
</script>
