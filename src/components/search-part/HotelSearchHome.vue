<template>
  <div class="space-y-3">
    <div class="relative shadow-lg rounded-full" @click="openCity">
      <p
        class="w-full rounded-full bg-white pl-12 py-4 text-xs text-main focus:outline-none"
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
    <div class="grid grid-cols-2 gap-3">
      <div class="relative shadow-xl rounded-full" @click="open">
        <p
          class="w-full rounded-full bg-white pl-12 py-4 text-xs focus:outline-none"
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
        <!-- <ChevronRightIcon class="w-5 h-5 absolute top-3.5 right-5 text-main" /> -->
      </div>
      <div class="relative shadow-lg rounded-full" @click="openOut">
        <p
          class="w-full rounded-full bg-white pl-12 py-4 text-xs focus:outline-none"
          :class="pickupfaltOutcondition ? 'text-red' : 'text-main'"
        >
          {{ dateOutSelected ? dateOutSelected : placeholderPlaceOutholder }}
        </p>
        <!-- <ClockIcon class="w-5 h-5 absolute top-3.5 left-5 text-main" /> -->
        <img
          :src="CalendarImage"
          class="w-4 h-4 absolute top-3.5 left-5 text-main"
          alt=""
        />
        <!-- <ChevronRightIcon class="w-5 h-5 absolute top-3.5 right-5 text-main" /> -->
      </div>
    </div>
    <div class="relative shadow-lg rounded-full">
      <div
        class="w-full rounded-full bg-white flex flex-wrap justify-start items-center pl-12 py-4 text-xs text-main focus:outline-none"
      >
        {{ totalRoom }} room
      </div>
      <img
        :src="AttractionImage"
        class="w-4 h-4 absolute top-3.5 left-5 text-main"
        alt=""
      />
      <PlusIcon
        @click="plusAction"
        class="w-7 h-7 absolute top-2.5 shadow-lg right-3 bg-main rounded-full font-semibold p-1 text-white"
      />
      <MinusIcon
        @click="minusAction"
        class="w-7 h-7 absolute top-2.5 shadow-lg right-[50px] bg-main rounded-full font-semibold p-1 text-white"
      />
    </div>
    <div class="gap-3 pb-3">
      <!-- <div
        @click="clearFilterAction"
        class="w-full rounded-full relative bg-white/30 z-0 py-3 text-sm border border-white"
      >
        <p class="text-white text-center">clear</p>
      </div> -->
      <div
        v-if="chooseCityId && dateSelected && dateOutSelected"
        @click="filteredHotel"
        class="w-full rounded-full relative col-span-2 z-0 py-3 text-sm border border-white"
      >
        <p class="text-white text-center">Explore</p>
      </div>
      <div
        v-if="!chooseCityId || !dateSelected || !dateOutSelected"
        @click="filteredError"
        class="w-full rounded-full relative col-span-2 z-0 py-3 text-sm border border-white"
      >
        <p class="text-white text-center">Explore</p>
      </div>
    </div>
    <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
      <div class="font-poppins">
        <div class="flex justify-between items-center px-6 pb-4">
          <XMarkIcon class="w-5 h-5" @click="close" />
          <p class="text-black font-semibold text-base">Pick a Check in Date</p>
          <p class="opacity-0">......</p>
        </div>
        <div class="overflow-hidden ml-4 mr-4 rounded-xl">
          <div class="h-auto font-poppins">
            <AboutPageVue @change="changesFromCalendar" />
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
    <vue-bottom-sheet ref="myBottomSheetOut" :max-height="1500">
      <div class="font-poppins">
        <div class="flex justify-between items-center px-6 pb-4">
          <XMarkIcon class="w-5 h-5" @click="closeOut" />
          <p class="text-black font-semibold text-base">
            Pick a Check out Date
          </p>
          <p class="opacity-0">......</p>
        </div>
        <div class="overflow-hidden ml-4 mr-4 rounded-xl">
          <div class="h-auto font-poppins">
            <AboutPageVue @change="chooseOutCalendar" />
          </div>
        </div>
      </div>
    </vue-bottom-sheet>

    <vue-bottom-sheet ref="myBottomSheetCity" :max-height="5000">
      <div class="font-poppins relative h-[100vh]">
        <!-- <div
          class="bg-gradient-to-b to-main from-main/60 absolute top-0 right-0 w-full h-[300px] sm:h-[250px]"
        ></div> -->
        <div class="">
          <div
            class="flex justify-between items-center px-6 pt-2 pb-4 relative z-10"
          >
            <XMarkIcon class="w-5 h-5 text-black" @click="closeCity" />
            <p class="text-balck font-semibold text-base">
              Select a destination
            </p>
            <p class="opacity-0">......</p>
          </div>
        </div>
        <div class="">
          <div class="">
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
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/vue/24/solid";
// import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
// import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import AboutPageVue from "../../views/AboutPage.vue";
import ChooseCityVue from "./VantourSearchCityHome.vue";
import { useRouter } from "vue-router";
import MapImage from "../../assets/s/pin 1 (1).png";
import CalendarImage from "../../assets/s/calendar_833593 1.png";
import AttractionImage from "../../assets/s/Group 533.png";
import { useOrderVantourStore } from "../../stores/orderVantour";
import { storeToRefs } from "pinia";

const router = useRouter();
const orderVantourStore = useOrderVantourStore();
const { checkin_date, checkout_date, room_qty } =
  storeToRefs(orderVantourStore);

const myBottomSheet = ref(null);
const open = () => {
  myBottomSheet.value.open();
};
const close = () => {
  myBottomSheet.value.close();
};

const myBottomSheetOut = ref(null);
const openOut = () => {
  myBottomSheetOut.value.open();
};
const closeOut = () => {
  myBottomSheetOut.value.close();
};

const totalRoom = ref(1);
const plusAction = () => {
  totalRoom.value++;
};
const minusAction = () => {
  if (totalRoom.value > 1) {
    totalRoom.value--;
  }
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
  let data = {
    checkin_date: dateSelected.value,
    checkout_date: dateOutSelected.value,
    room_qty: totalRoom.value,
  };
  const res = await orderVantourStore.changeHotelStoreData(data);
  if (res == "success") {
    router.push({
      name: "FilteredHotelBookings",
      params: {
        id: chooseCityId.value ? chooseCityId.value : "null",
        name: chooseCityName.value ? chooseCityName.value : "null",
      },
      query: {
        price: "null",
        rating: "null",
        place: "null",
        facilities: "null",
      },
    });
  }
};

const placeholder = ref("choose your destination * ");
const placeholderPlaceholder = ref("checkin date");
const placeholderPlaceOutholder = ref("checkout date");
const placefaltcondition = ref(false);
const pickupfaltcondition = ref(false);
const pickupfaltOutcondition = ref(false);
const filteredError = () => {
  console.log("====================================");
  console.log("hello");
  placeholder.value = "choose your destination * (required)";
  placeholderPlaceholder.value = "checkin date";
  placeholderPlaceOutholder.value = "checkin date";

  if (!chooseCityName.value) {
    placefaltcondition.value = true;
  }
  if (!dateSelected.value) {
    pickupfaltcondition.value = true;
  }
  if (!dateOutSelected.value) {
    pickupfaltOutcondition.value = true;
  }

  console.log("====================================");
};

const clearFilterAction = async () => {
  await orderVantourStore.removeHotelData();
  dateSelected.value = "";
  dateOutSelected.value = "";
  totalRoom.value = 1;
};

const dateSelected = ref("");
const dateOutSelected = ref("");

const changesFromCalendar = (data) => {
  console.log("====================================");
  console.log(data);
  dateSelected.value = data;
  close();
  console.log("====================================");
};

const chooseOutCalendar = (data) => {
  console.log("====================================");
  console.log(data);
  dateOutSelected.value = data;
  closeOut();
  console.log("====================================");
};

onMounted(async () => {
  await orderVantourStore.getHotelData();
  dateSelected.value = checkin_date.value;
  dateOutSelected.value = checkout_date.value;
  totalRoom.value = room_qty.value ? room_qty.value : 1;
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
