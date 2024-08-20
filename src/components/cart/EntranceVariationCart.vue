<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";
import { defineProps, ref, computed, onMounted } from "vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import ImageCarousel from "../hotelbookings/EntranceVariationImage.vue";

const props = defineProps({
  data: Object,
});

const showMore = ref(false);

const items = ref(["data empty", "data empty", "data empty"]);

const filteredItems = computed(() => {
  return showMore.value ? items.value : items.value.slice(0, 3);
});

const percent = computed(() => {
  if (
    props.data?.owner_price &&
    props.data?.price &&
    props.data?.owner_price != "null"
  ) {
    const calculatedPercent = (
      ((props.data?.owner_price * 1 - props.data?.price * 1) /
        props.data?.owner_price) *
      100
    ).toFixed(0); // Round to 2 decimal places if necessary
    return `${calculatedPercent}`;
  } else {
    return `0`;
  }
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
      class="bg-white shadow relative rounded-3xl p-2 border border-black/5"
      v-show="!loading"
    >
      <p
        v-if="percent != 0 && percent != NaN"
        class="text-xs bg-red/90 text-white rounded-full absolute top-[145px] z-20 right-4 px-3 py-1 font-medium"
      >
        {{ percent }}% OFF
      </p>
      <div class="w-[200px] h-[150px] overflow-hidden">
        <ImageCarousel :data="data?.image_links" @change="getstatus" />
      </div>
      <div class="px-3 pb-2 pt-3 space-y-2">
        <p class="font-medium text-xs">{{ data?.name }}</p>
        <div class="space-y-1" v-if="data?.including_services">
          <div
            class="flex justify-start items-center gap-1"
            v-for="i in JSON.parse(data?.including_services)"
            :key="i"
          >
            <StarIcon class="w-3 h-3 text-main" />
            <p class="text-[10px] text-black font-medium">{{ i }}</p>
          </div>

          <p @click="toggleShowMore" class="text-[8px] font-medium text-main">
            {{ showMore ? "show less" : "show more" }}
          </p>
        </div>
        <div class="space-y-1" v-if="!data?.including_services">
          <div
            class="flex justify-start items-center gap-1"
            v-for="i in items"
            :key="i"
          >
            <StarIcon class="w-3 h-3 text-main" />
            <p class="text-[10px] text-black font-medium">{{ i }}</p>
          </div>

          <p @click="toggleShowMore" class="text-[8px] font-medium text-main">
            {{ showMore ? "show less" : "show more" }}
          </p>
        </div>
        <p class="text-black/80 text-[10px]">starting price (adult/child)</p>
        <div class="flex justify-between items-center">
          <button class="text-main py-1 rounded-base text-base font-semibold">
            {{ data?.price }} thb
            <span
              class="text-[11px] line-through text-black/70"
              v-if="
                data?.owner_price != 'null' &&
                data?.owner_price != 0 &&
                data?.owner_price != data?.price
              "
              >{{ data?.owner_price }}thb</span
            >
          </button>
          <p
            class="text-xs bg-main text-white rounded-full px-3 py-1 font-medium"
          >
            book
          </p>
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
