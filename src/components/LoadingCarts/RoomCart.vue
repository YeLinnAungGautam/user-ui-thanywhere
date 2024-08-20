<template>
  <div>
    <div
      v-show="imageLoaded"
      class="bg-white shadow rounded-3xl p-2 border border-black/5 max-w-[220px]"
    >
      <div class="w-[200px] h-[150px] relative overflow-hidden">
        <img
          :src="
            i?.images[0]?.image
              ? i.images[0]?.image
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
          "
          @load="onImageLoad"
          class="w-full h-full object-cover rounded-2xl"
          alt=""
        />
        <p
          v-if="percent != 0 && percent != NaN"
          class="text-xs bg-red/90 text-white rounded-full absolute top-0 z-20 right-0 px-3 py-1 font-medium"
        >
          {{ percent }}% OFF
        </p>
      </div>
      <div class="bg-white p-2 space-y-2">
        <p class="font-medium text-xs line-clamp-2">
          {{ i?.name }}
        </p>
        <p class="text-green text-[10px]">Breakfast inclusive</p>
        <!-- <div class="flex justify-between items-center gap-2">
          <button class="bg-main px-4 py-1 rounded-full text-sm text-white">
            {{ i?.room_price }}THB
          </button>
          <p class="text-[10px] text-main underline">view detail</p>
        </div> -->
        <div class="flex justify-between items-center">
          <button class="text-main rounded-base text-base font-semibold">
            {{ i?.room_price }} thb
            <span
              class="text-[11px] line-through text-black/70"
              v-if="
                i?.owner_price != 'null' &&
                i?.owner_price != 0 &&
                i?.owner_price != i?.room_price
              "
              >{{ i?.owner_price }}thb</span
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
      v-show="!imageLoaded"
      class="bg-white shadow rounded-3xl p-2 border border-black/5 max-w-[220px]"
    >
      <div class="w-[200px] h-[150px] overflow-hidden">
        <img
          :src="LoadingImageCover"
          class="w-full h-full object-cover rounded-2xl opacity-20"
          alt=""
        />
      </div>
      <div class="bg-white p-2 space-y-2">
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
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
// import { HeartIcon } from "@heroicons/vue/24/outline";
// import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/vue/24/solid";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
// import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";

const settingStore = useSettingStore();
// const { language } = storeToRefs(settingStore);

const props = defineProps({
  i: Object,
});

const imageLoaded = ref(false);

const onImageLoad = () => {
  imageLoaded.value = true;
  console.log("Image loaded");
};

const percent = computed(() => {
  if (
    props.i?.owner_price &&
    props.i?.room_price &&
    props.i?.owner_price != "null"
  ) {
    const calculatedPercent = (
      ((props.i?.owner_price * 1 - props.i?.room_price * 1) /
        props.i?.owner_price) *
      100
    ).toFixed(0); // Round to 2 decimal places if necessary
    return `${calculatedPercent}`;
  } else {
    return `0`;
  }
});

onMounted(() => {
  console.log(props.i, "this is i");
  settingStore.getLanguage();
});
</script>
