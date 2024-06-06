<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-main font-semibold px-6">best selling van tours</h1>
      <div
        @click="seeMore = !seeMore"
        class="text-[10px] font-semibold text-main flex justify-end items-center gap-1 mr-6"
      >
        <p>{{ !seeMore ? "show less" : "see more" }}</p>
        <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-6 mt-6">
      <div
        class="bg-white shadow-sm rounded-2xl mb-2 border border-black/10"
        v-for="(i, index) in data"
        :key="index"
        :class="index < 6 || !seeMore ? '' : 'hidden'"
      >
        <div class="w-full h-[140px] p-1.5 overflow-hidden">
          <img
            :src="i.cover_image"
            class="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </div>
        <div class="px-3 py-0">
          <StarPartVue :count="3" />
          <p class="font-semibold text-sm pt-1">{{ i.name }}</p>
          <p class="text-[8px] bg-black/10 rounded-md py-0.5 px-1 inline-block">
            {{ i?.cities[0]?.name }}
          </p>
          <p class="text-[9px] pt-1 max-h-[44px] overflow-hidden">
            {{ i?.long_description }}
          </p>
          <p class="text-xs mt-2 font-medium">starting car price</p>
          <button
            class="bg-main px-4 mt-2 mb-3 py-0.5 rounded-2xl text-sm text-white"
          >
            {{ i?.lowest_car_price }}THB
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
import StarPartVue from "./StarPart.vue";
import vantourdb from "../../assets/vantourdb";

const seeMore = ref(true);
const data = ref(null);

onMounted(() => {
  data.value = vantourdb;
  console.log("====================================");
  console.log(data.value);
  console.log("====================================");
});
</script>
