<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";
import { defineProps, ref, computed } from "vue";
import ImageCarousel from "../hotelbookings/EntranceVariationImage.vue";

const props = defineProps({
  data: Object,
});

const showMore = ref(false);

const items = ref([
  "all rides included",
  "some rides included",
  "few rides included",
  "no rides included",
  "extra rides included",
]);

const filteredItems = computed(() => {
  return showMore.value ? items.value : items.value.slice(0, 3);
});

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};
</script>

<template>
  <div>
    <div class="bg-white shadow rounded-3xl p-2 border border-black/5">
      <div class="w-[200px] h-[150px] overflow-hidden">
        <ImageCarousel :data="data?.image_links" />
      </div>
      <div class="px-3 py-2 space-y-2">
        <p class="font-medium text-xs">{{ data?.name }}</p>
        <div class="space-y-1">
          <div
            class="flex justify-start items-center gap-1"
            v-for="i in filteredItems"
            :key="i"
          >
            <StarIcon class="w-3 h-3 text-main" />
            <p class="text-[10px] text-black font-medium">all rides included</p>
          </div>
          <p @click="toggleShowMore" class="text-[8px] font-medium text-main">
            {{ showMore ? "show less" : "show more" }}
          </p>
        </div>
        <p class="text-black/80 text-[10px]">starting price (adult/child)</p>
        <div class="flex justify-between items-center gap-2">
          <button class="bg-main px-4 py-1 rounded-full text-sm text-white">
            {{ data?.price }}THB
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
