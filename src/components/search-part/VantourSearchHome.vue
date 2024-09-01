<template>
  <div class="space-y-3">
    <div class="relative" @click="openCity">
      <input
        type="text"
        name=""
        v-model="chooseCityName"
        disabled
        :placeholder="placeholder"
        class="w-full rounded-full bg-white pl-12 py-4 text-xs text-main focus:outline-none"
        id=""
      />
      <MapPinIcon class="w-5 h-5 absolute top-3.5 left-5 text-main" />
      <ChevronRightIcon class="w-5 h-5 absolute top-3.5 right-5 text-main" />
    </div>
    <div class="relative" @click="open">
      <input
        type="text"
        disabled
        name=""
        v-model="dateSelected"
        placeholder=" pick a date of travel"
        class="w-full rounded-full relative z-0 bg-white pl-12 py-4 text-xs text-main focus:outline-none"
        id=""
      />
      <ClockIcon class="w-5 h-5 absolute top-3.5 left-5 text-main" />
      <ChevronRightIcon class="w-5 h-5 absolute top-3.5 right-5 text-main" />
    </div>
    <div class="relative" @click="opentype">
      <input
        type="text"
        disabled
        name=""
        v-model="chooseTypeLetter"
        placeholder=" choose activity type"
        class="w-full rounded-full relative z-0 bg-white pl-12 py-4 text-xs text-main focus:outline-none"
        id=""
      />
      <SparklesIcon class="w-5 h-5 absolute top-3.5 left-5 text-main" />
      <ChevronRightIcon class="w-5 h-5 absolute top-3.5 right-5 text-main" />
    </div>
    <div
      v-if="chooseCityId"
      @click="filteredHotel"
      class="w-full rounded-full relative z-0 py-3 text-sm border border-white"
    >
      <p class="text-white text-center">explore</p>
    </div>
    <div
      v-if="!chooseCityId"
      @click="filteredError"
      class="w-full rounded-full relative z-0 py-3 text-sm border border-white"
    >
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
            <!-- <VueDatePicker
              v-model="date"
              inline
              auto-apply
              :format="format"
              :enable-time="false"
              :type="date"
            ></VueDatePicker> -->
            <AboutPageVue @change="changesFromCalendar" />
          </div>

          <!-- <div
            class="flex justify-between gap-4 px-4 items-center py-4 border-t border-black/10"
          >
            <p class="text-main font-semibold text-base">{{ dateSelected }}</p>
            <button
              @click="close"
              class="text-center border bg-main border-black/10 rounded-full py-2 w-[40%] text-sm text-white font-semibold"
            >
              choose
            </button>
          </div> -->
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
            <div class="flex justify-start items-center gap-3 flex-wrap">
              <div
                class="space-y-1"
                v-for="(i, index) in activitydb"
                :key="index"
                @click="handleActivitySelect(i.name)"
              >
                <div
                  class="px-4 py-1.5 text-[10px] rounded-full"
                  :class="
                    isActive(i.name)
                      ? 'bg-main border font-semibold border-white  text-white'
                      : ' bg-white text-black/80 border font-semibold  border-black/10'
                  "
                >
                  {{ i.name }}
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
    <vue-bottom-sheet ref="myBottomSheetCity" :max-height="5000">
      <div class="font-poppins">
        <div class="flex justify-between items-center px-6 pb-4">
          <XMarkIcon class="w-5 h-5" @click="closeCity" />
          <p class="text-black font-semibold text-base">Select a destination</p>
          <p class="opacity-0">......</p>
        </div>
        <div class="ml-4 mr-2 rounded-xl">
          <div class="h-[80vh]">
            <ChooseCityVue
              @changeCity="chooseCityChange"
              @clearChange="closeCityClean"
            />
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
// import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
// import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import activitydb from "../../assets/activitydb";
import AboutPageVue from "../../views/AboutPage.vue";
import ChooseCityVue from "./VantourSearchCityHome.vue";
import { useRouter } from "vue-router";
const router = useRouter();

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

const myBottomSheetCity = ref(null);
const openCity = () => {
  myBottomSheetCity.value.open();
};
const closeCity = () => {
  myBottomSheetCity.value.close();
};
const chooseCityName = ref("");
const chooseCityId = ref("");
const closeCityClean = () => {
  chooseCityName.value = "";
  chooseCityId.value = "";
  myBottomSheetCity.value.close();
};
const chooseCityChange = (data) => {
  console.log("====================================");
  console.log(data, "this is change");
  console.log("====================================");
  chooseCityName.value = data.name;
  chooseCityId.value = data.id;
  myBottomSheetCity.value.close();
};

// const router = useRouter();

// const format = (date) => {
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();

//   return `Selected date is ${day}/${month}/${year}`;
// };

const filteredHotel = async () => {
  router.push({
    name: "HomeVantourResult",
    params: {
      id: chooseCityId.value ? chooseCityId.value : null,
      name: chooseCityName.value ? chooseCityName.value : null,
    },
  });
};

const placeholder = ref("choose your destination");
const filteredError = () => {
  console.log("====================================");
  console.log("hello");
  placeholder.value = "need to choose a destination";
  console.log("====================================");
};

const dateSelected = ref("");

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

const changesFromCalendar = (data) => {
  console.log("====================================");
  console.log(data);
  dateSelected.value = data;
  close();
  console.log("====================================");
};

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
