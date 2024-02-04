<script setup>
import {
  HomeModernIcon,
  HeartIcon,
  AdjustmentsHorizontalIcon,
  ArrowsRightLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const router = useRouter();
const emit = defineEmits();

const props = defineProps({
  name: String,
  data: [Object],
  total: Number,
});

const searchD = (id) => {
  console.log(id);
  emit("searchD", id);
};

onMounted(async () => {
  console.log(props.data);
});
</script>
<template>
  <div class="cursor-pointer">
    <div class="px-4 border border-black/10 bg-white">
      <div class="flex justify-between items-center pt-4">
        <div>
          <ChevronLeftIcon class="w-5 h-5 text-main" @click="router.go(-1)" />
        </div>
        <div class="font-medium">
          Browse All Hotels
          <span class="text-main">{{ name }} ({{ total }})</span>
        </div>
        <div></div>
      </div>
      <div
        class="flex justify-start items-center gap-2 py-4 overflow-x-scroll scroll-container text-[10px] text-black/80"
      >
        <p
          @click="searchD('')"
          class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold whitespace-nowrap"
        >
          All
        </p>
        <p
          v-for="p in data"
          :key="p"
          @click="searchD(p.place)"
          class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold whitespace-nowrap"
        >
          {{ p.place }}
        </p>
      </div>
    </div>
  </div>
</template>
