<template>
  <div class="space-y-3">
    <div class="relative" @click="router.push('/home/van-tour/home/search')">
      <input
        type="text"
        name=""
        placeholder=" choose your destination"
        class="w-full rounded-full pl-12 py-4 text-xs text-main focus:outline-none"
        id=""
      />
      <MapPinIcon class="w-5 h-5 absolute top-3.5 left-5 text-main" />
      <ChevronRightIcon class="w-5 h-5 absolute top-3.5 right-5 text-main" />
    </div>
    <div class="relative" @click="open">
      <input
        type="text"
        name=""
        v-model="dateSelected"
        placeholder=" pick a date of travel"
        class="w-full rounded-full pl-12 py-4 text-xs text-main focus:outline-none"
        id=""
      />
      <ClockIcon class="w-5 h-5 absolute top-3.5 left-5 text-main" />
      <ChevronRightIcon class="w-5 h-5 absolute top-3.5 right-5 text-main" />
    </div>
    <div class="relative" @click="opentype">
      <input
        type="text"
        name=""
        v-model="chooseTypeLetter"
        placeholder=" choose activity type"
        class="w-full rounded-full pl-12 py-4 text-xs text-main focus:outline-none"
        id=""
      />
      <SparklesIcon class="w-5 h-5 absolute top-3.5 left-5 text-main" />
      <ChevronRightIcon class="w-5 h-5 absolute top-3.5 right-5 text-main" />
    </div>
    <div class="w-full rounded-full py-3 text-sm border border-white">
      <p class="text-white text-center">explore</p>
    </div>
    <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
      <div class="font-poppins">
        <div class="flex justify-between items-center px-6 pb-4">
          <XMarkIcon class="w-5 h-5" @click="close" />
          <p class="text-black font-semibold text-base">Pick a Date</p>
          <p class="opacity-0">......</p>
        </div>
        <div class="overflow-hidden ml-4 mr-2 rounded-xl">
          <div class="h-auto font-poppins">
            <VueDatePicker
              v-model="date"
              inline
              auto-apply
              :format="format"
              :enable-time="false"
              :type="date"
            ></VueDatePicker>
          </div>

          <div
            class="flex justify-between gap-4 px-4 items-center py-4 border-t border-black/10"
          >
            <p class="text-main font-semibold text-base">{{ dateSelected }}</p>
            <button
              @click="close"
              class="text-center border bg-main border-black/10 rounded-full py-2 w-[40%] text-sm text-white font-semibold"
            >
              choose
            </button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
    <vue-bottom-sheet ref="myBottomSheetType" :max-height="1500">
      <div class="font-poppins">
        <div class="flex justify-between items-center px-6 pb-4">
          <XMarkIcon class="w-5 h-5" @click="closetype" />
          <p class="text-black font-semibold text-base">Select activity type</p>
          <p class="opacity-0">......</p>
        </div>
        <div class="ml-4 mr-2 rounded-xl">
          <div class="h-[400px]">
            <div class="grid grid-cols-4 gap-2">
              <div
                class="px-2 py-2 space-y-1 w-full mx-auto"
                v-for="(i, index) in activitydb"
                :key="index"
                @click="handleActivitySelect(i.name)"
              >
                <div
                  class="p-1 w-full"
                  :class="
                    isActive(i.name) ? 'border border-main rounded-lg' : ''
                  "
                >
                  <div class="flex justify-center items-center gap-1">
                    <!-- <StarIcon class="w-10 h-10 text-main" /> -->
                    <img :src="i.image" class="w-10 h-10" alt="" />
                  </div>
                  <p class="text-[8px] text-black/70 text-center">
                    {{ i.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex justify-between gap-4 px-4 items-center py-4 border-t border-black/10"
          >
            <p class="text-main text-sm underline" @click="closetypeClean">
              Clear
            </p>
            <button
              @click="closetype"
              class="text-center border bg-main border-black/10 rounded-full py-2 w-[40%] text-sm text-white font-semibold"
            >
              choose
            </button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script setup>
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import {
  MapPinIcon,
  ClockIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import activitydb from "../../assets/activitydb";

const myBottomSheet = ref(null);
const open = () => {
  myBottomSheet.value.open();
};
const close = () => {
  myBottomSheet.value.close();
};

const myBottomSheetType = ref(null);
const opentype = () => {
  myBottomSheetType.value.open();
};
const closetype = () => {
  myBottomSheetType.value.close();
};
const closetypeClean = () => {
  chooseType.value = [];
  myBottomSheetType.value.close();
};

const router = useRouter();

const date = ref("");

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `Selected date is ${day}/${month}/${year}`;
};

const dateSelected = computed(() => {
  if (date.value) {
    const day = date.value.getDate();
    const year = date.value.getFullYear();

    // Convert the month number to a short name
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.value.getMonth()];

    return `${day} ${month} ${year}`;
  } else {
    return "";
  }
});

const chooseType = ref([]);

const handleActivitySelect = (activity) => {
  if (chooseType.value.includes(activity)) {
    // If it exists, remove it from the array
    chooseType.value = chooseType.value.filter((item) => item !== activity);
  } else {
    // If it doesn't exist, add it to the array
    chooseType.value.push(activity);
  }
  console.log(chooseType.value);
};

const chooseTypeLetter = computed(() => {
  if (chooseType.value.length > 0) {
    return chooseType.value.join(", ");
  } else {
    return "";
  }
});

const isActive = (activity) => {
  return chooseType.value.includes(activity);
};
</script>

<style>
.dp__button {
  width: 100%;
  text-align: center;
  color: var(--dp-icon-color);
  cursor: pointer;
  display: flex;
  opacity: 0 !important;
  align-items: center;
  place-content: center center;
  padding: var(--dp-common-padding);
  box-sizing: border-box;
  height: var(--dp-button-height);
}

.dp__range_end,
.dp__range_start,
.dp__active_date {
  background: #ff8b0f !important;
  color: var(--dp-primary-text-color);
  border-radius: 100% !important;
}
.dp__today {
  border: 1px solid #ff8b0f !important;
  border-radius: 100% !important;
}
.dp__calendar_header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6e6e6e !important ;
  white-space: nowrap;
  font-weight: 400 !important;
}

.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1976d2;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ffffff !important;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
  --dp-loader: 5px solid #1976d2;
}
</style>
