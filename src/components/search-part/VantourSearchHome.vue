<template>
  <div class="space-y-3">
    <div class="relative" @click="openCity">
      <p
        class="w-full rounded-full bg-white pl-12 py-4 shadow-custom-input text-xs text-main focus:outline-none"
        :class="placefaltcondition ? 'text-red' : 'text-main'"
      >
        {{ chooseCityName ? chooseCityName : placeholder }}
      </p>
      <!-- <MapPinIcon class="w-5 h-5 absolute top-3.5 left-5 text-main" /> -->
      <img
        :src="MapImage"
        class="w-5 h-5 absolute top-3.5 left-5 text-main"
        alt=""
      />
      <ChevronRightIcon class="w-5 h-5 absolute top-3.5 right-5 text-main" />
    </div>
    <div class="relative" @click="open">
      <p
        class="w-full rounded-full bg-white pl-12 py-4 shadow-custom-input text-xs focus:outline-none"
        :class="pickupfaltcondition ? 'text-red' : 'text-main'"
      >
        {{ dateSelected ? dateSelected : placeholderPlaceholder }}
      </p>
      <!-- <ClockIcon class="w-5 h-5 absolute top-3.5 left-5 text-main" /> -->
      <img
        :src="CalendarImage"
        class="w-4 h-4 absolute top-3.5 left-5 text-main"
        alt=""
      />
      <ChevronRightIcon class="w-5 h-5 absolute top-3.5 right-5 text-main" />
    </div>
    <div class="relative" @click="opentype">
      <div
        class="w-full rounded-full bg-white flex flex-wrap justify-start items-center pl-12 py-4 shadow-custom-input text-xs text-main focus:outline-none"
      >
        <!-- {{ choose ? choose : "choose acitivity type" }} -->
        <p class=" " v-for="i in chooseType" :key="i.id">{{ i.name }} ,</p>
        <p v-if="chooseType.length == 0">choose acitivity type</p>
      </div>
      <!-- <SparklesIcon class="w-5 h-5 absolute top-3.5 left-5 text-main" /> -->
      <img
        :src="AttractionImage"
        class="w-4 h-4 absolute top-3.5 left-5 text-main"
        alt=""
      />
      <ChevronRightIcon
        v-if="chooseType.length == 0"
        class="w-5 h-5 absolute top-3.5 right-5 text-main"
      />
    </div>
    <div class="gap-3 pb-4">
      <!-- <div
        @click="clearFilterAction"
        class="w-full rounded-full relative bg-white/30 z-0 py-3 text-sm border border-white"
      >
        <p class="text-white text-center">clear</p>
      </div> -->
      <div
        v-if="chooseCityId && dateSelected"
        @click="filteredHotel"
        class="w-full rounded-full shadow-custom-input relative col-span-2 z-0 py-3 text-sm border border-white"
      >
        <p class="text-white text-center">Explore</p>
      </div>
      <div
        v-if="!chooseCityId || !dateSelected"
        @click="filteredError"
        class="w-full rounded-full shadow-custom-input relative col-span-2 z-0 py-3 text-sm border border-white"
      >
        <p class="text-white text-center">Explore</p>
      </div>
    </div>
    <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
      <div class="font-poppins">
        <div class="flex justify-between items-center px-6 pb-4">
          <XMarkIcon class="w-5 h-5" @click="close" />
          <p class="text-black font-semibold text-base">Pick a Date</p>
          <p class="opacity-0">......</p>
        </div>
        <div class="overflow-hidden ml-4 mr-4 rounded-xl">
          <div class="h-auto font-poppins">
            <AboutPageVue @change="changesFromCalendar" />
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
        <div class="ml-4 mr-4 rounded-xl">
          <div class="h-[400px]">
            <div class="flex justify-start items-center gap-3 flex-wrap">
              <div
                class="space-y-1"
                v-for="(i, index) in activitydb"
                :key="index"
                @click="handleActivitySelect(i)"
              >
                <div
                  class="px-4 py-1.5 text-[10px] rounded-full"
                  :class="
                    isActive(i)
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
      <div class="font-poppins relative">
        <div
          class="bg-gradient-to-b to-main from-main/60 absolute top-0 right-0 w-full h-[600px]"
        ></div>
        <div
          class="flex justify-between items-center px-6 pt-2 pb-4 relative z-10"
        >
          <XMarkIcon class="w-5 h-5 text-white" @click="closeCity" />
          <p class="text-white font-semibold text-base">Select a destination</p>
          <p class="opacity-0">......</p>
        </div>
        <div class="rounded-xl">
          <div class="h-[90vh]">
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
import { XMarkIcon } from "@heroicons/vue/24/solid";
// import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
// import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import activitydb from "../../assets/activitydb";
import AboutPageVue from "../../views/AboutPage.vue";
import ChooseCityVue from "./VantourSearchCityHome.vue";
import { useRouter } from "vue-router";
import MapImage from "../../assets/s/pin 1 (1).png";
import CalendarImage from "../../assets/s/calendar_833593 1.png";
import AttractionImage from "../../assets/s/attractions.png";
import { useOrderVantourStore } from "../../stores/orderVantour";
import { storeToRefs } from "pinia";

// const router = useRouter();
const orderVantourStore = useOrderVantourStore();
const { pickup_date } = storeToRefs(orderVantourStore);

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

const router = useRouter();

// const format = (date) => {
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();

//   return `Selected date is ${day}/${month}/${year}`;
// };

const filteredHotel = async () => {
  const res = await orderVantourStore.changeStoreData({
    pickup_date: dateSelected.value,
  });
  console.log(res);

  if (res == "success") {
    router.push({
      name: "HomeVantourResult",
      params: {
        id: chooseCityId.value ? chooseCityId.value : null,
        name: chooseCityName.value ? chooseCityName.value : null,
      },
      query: {
        category_ids:
          chooseType.value.length > 0
            ? chooseType.value.map((item) => item.id).join(",")
            : "null",
      },
    });
  }
};

const placeholder = ref("choose your destination * ");
const placeholderPlaceholder = ref("pick a date of travel * ");
const placefaltcondition = ref(false);
const pickupfaltcondition = ref(false);
const filteredError = () => {
  console.log("====================================");
  console.log("hello");
  placeholder.value = "choose your destination * (required)";
  placeholderPlaceholder.value = "pick a date of travel * (required)";
  if (!chooseCityName.value) {
    placefaltcondition.value = true;
  }
  if (!dateSelected.value) {
    pickupfaltcondition.value = true;
  }

  console.log("====================================");
};

const dateSelected = ref("");

const chooseType = ref([]);

const handleActivitySelect = (activity) => {
  // Check if the activity with the given id already exists in the array
  const index = chooseType.value.findIndex((item) => item.id === activity.id);

  if (index !== -1) {
    // If it exists (index is not -1), remove it from the array
    chooseType.value.splice(index, 1);
  } else {
    // If it doesn't exist, add it to the array
    chooseType.value.push(activity);
  }

  console.log(chooseType.value);
};

// const chooseTypeLetter = computed(() => {
//   if (chooseType.value.length > 0) {
//     return chooseType.value.join(", ");
//   } else {
//     return "";
//   }
// });

const changesFromCalendar = (data) => {
  console.log("====================================");
  console.log(data);
  dateSelected.value = data;
  close();
  console.log("====================================");
};

const isActive = (activity) => {
  // Loop through each item in the chooseType.value array
  for (let index = 0; index < chooseType.value.length; index++) {
    // Check if the current item's id matches the activity's id
    if (chooseType.value[index].id === activity.id) {
      return true; // Return true if a match is found
    }
  }
  return false; // Return false if no matches are found
};

const clearFilterAction = async () => {
  await orderVantourStore.removeVantourData();
  chooseType.value = [];
  chooseCityName.value = "";
  chooseCityId.value = "";
  dateSelected.value = "";
};

onMounted(async () => {
  await orderVantourStore.getVantourData();
  dateSelected.value = pickup_date.value;
});
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
