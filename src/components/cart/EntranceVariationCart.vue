<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";
import { defineProps, ref, computed } from "vue";
// import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
// import ImageCarousel from "../hotelbookings/EntranceVariationImage.vue";

const props = defineProps({
  data: Object,
  show: Boolean,
  index: Number,
});

const showMore = ref(false);
const viewDetail = ref(true);

const items = ref(["data empty", "data empty", "data empty"]);

// const filteredItems = computed(() => {
//   return showMore.value ? items.value : items.value.slice(0, 3);
// });

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

const showCart = () => {
  console.log("====================================");
  console.log(props.show, props.index);
  console.log("====================================");
  if (props.show) {
    return true;
  } else if (props.show == false) {
    if (props.index < 2) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// const loading = ref(true);

// const getstatus = (status) => {
//   console.log(status, "this is from emit");
//   loading.value = status;
// };
</script>

<template>
  <div v-if="showCart()">
    <div
      class="bg-white shadow-custom relative rounded-3xl p-2 border border-black/5"
      v-show="!loading"
    >
      <!-- <div class="w-[200px] h-[150px] overflow-hidden">
        <ImageCarousel :data="data?.image_links" @change="getstatus" />
      </div> -->
      <div class="px-3 pb-2 pt-3 space-y-2">
        <p class="font-medium text-xs">{{ data?.name }}</p>
        <div class="space-y-1" v-if="data?.including_services && viewDetail">
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
        <div class="space-y-1" v-if="!data?.including_services && viewDetail">
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
        <div
          @click="viewDetail = !viewDetail"
          class="flex justify-between items-center"
        >
          <p class="text-black/80 text-[10px]">starting price</p>
          <p class="text-black/80 text-[10px] underline">view detail</p>
        </div>
        <div class="flex justify-between items-center">
          <button
            class="text-main py-1 flex justify-start items-center gap-x-3 rounded-base text-base font-semibold"
          >
            ฿ {{ data?.price }}
            <span
              class="text-[11px] line-through text-black/70"
              v-if="
                data?.owner_price != 'null' &&
                data?.owner_price != 0 &&
                data?.owner_price != data?.price
              "
              >฿ {{ data?.owner_price }}</span
            >
            <p
              v-if="percent != 0 && percent != NaN"
              class="text-xs bg-red/90 text-white rounded-full px-3 py-1 font-medium"
            >
              {{ percent }}% OFF
            </p>
          </button>
          <p
            class="text-xs bg-main text-white rounded-2xl px-5 py-1.5 font-medium"
          >
            book
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
