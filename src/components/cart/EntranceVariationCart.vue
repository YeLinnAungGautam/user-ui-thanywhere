<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";
import { defineProps, ref, computed, onMounted } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
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

const loading = ref(true);

const getstatus = (status) => {
  console.log(status, "this is from emit");
  loading.value = status;
};

onMounted(() => {
  console.log(props.data);
});
</script>

<template>
  <div>
    <div
      class="bg-white shadow rounded-3xl p-2 border border-black/5"
      v-show="!loading"
    >
      <div class="w-[200px] h-[150px] overflow-hidden">
        <ImageCarousel :data="data?.image_links" @change="getstatus" />
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
    <div
      class="bg-white shadow rounded-3xl p-2 border border-black/5"
      v-show="loading"
    >
      <div class="w-[200px] h-[150px] overflow-hidden">
        <img
          :src="LoadingImageCover"
          class="w-full h-full object-cover rounded-2xl opacity-20"
          alt=""
        />
      </div>
      <div class="px-3 py-2 space-y-2">
        <p class="font-medium text-xs">{{ data?.name }}</p>
        <div class="space-y-2">
          <p
            class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-1"
          ></p>
          <p
            class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-1"
          ></p>
          <button
            class="bg-main animate-pulse px-3 mt-2 mb-2 py-1 rounded-xl text-xs font-semibold text-white"
          >
            loading
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
