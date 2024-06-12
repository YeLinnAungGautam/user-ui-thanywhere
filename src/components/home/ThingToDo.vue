<template>
  <div v-if="!loading">
    <div class="flex justify-between items-center">
      <h1 class="text-main font-semibold px-6">things to do in bangkok</h1>
      <div
        class="text-[10px] font-semibold text-main flex justify-end items-center gap-1 mr-6"
      >
        see more <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div
      class="flex flex-1 justify-start space-x-3 mt-6 items-center overflow-x-scroll scroll-container"
    >
      <div
        class="bg-white shadow rounded-2xl mb-3"
        :class="index == 0 ? 'ml-6' : 'ml-0'"
        v-for="(i, index) in entrances?.data"
        :key="i"
      >
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
          <p class="font-semibold text-sm">{{ i?.name }}</p>
          <button
            class="bg-black/30 px-3 mt-2 mb-2 py-1 rounded-lg text-[10px] text-white"
          >
            show detail
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { onMounted } from "vue";
import { useEntranceStore } from "../../stores/entrance";
import { storeToRefs } from "pinia";

const entranceStore = useEntranceStore();

const { entrances, loading } = storeToRefs(entranceStore);

onMounted(async () => {
  await entranceStore.getListAction({ city_id: 2 });
  console.log("====================================");
  console.log(entrances.value);
  console.log("====================================");
});
</script>
