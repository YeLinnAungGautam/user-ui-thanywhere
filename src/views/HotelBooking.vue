<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
// import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { useSettingStore } from "../stores/setting";
// import HotelsGradesVue from "../components/hotelbookings/HotelsGrades.vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { useFacilityStore } from "../stores/facility";
import HotelCartVue from "../components/LoadingCarts/HotelCart.vue";
import LoadingImageCover from "../assets/web/loadingImageCover.jpg";
// import { HeartIcon } from "@heroicons/vue/24/outline";
// import graph from "../assets/icons/graph.png";
// import { useSettingStore } from "../stores/setting";
// import {
//   MapPinIcon,
//   BuildingOffice2Icon,
//   StarIcon,
//   ChevronDownIcon,
//   XMarkIcon,
// } from "@heroicons/vue/24/solid";
import { StarIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/solid";
// import StarPartVue from "../components/home/StarPart.vue";
import { useRouter } from "vue-router";
import { useHotelStore } from "../stores/hotel";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useCityStore } from "../stores/city";
import HotelSearchHomeVue from "../components/search-part/HotelSearchHome.vue";
import { ChevronUpIcon } from "@heroicons/vue/24/outline";

// const settingStore = useSettingStore();
const hotelStore = useHotelStore();
const cityStore = useCityStore();
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);
const facilityStore = useFacilityStore();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);
const { facilities } = storeToRefs(facilityStore);
// const { language } = storeToRefs(settingStore);

const router = useRouter();
const all = ref(false);
const placeall = ref(false);
const facall = ref(false);

const place = ref("");

const open = () => {
  myBottomSheet.value.open();
};

const openBottomSheet = async () => {
  open();
};

const close = () => {
  myBottomSheet.value.close();
};

const filterId = ref("");
const city_name = ref("");
const rating = ref("");
// const price = ref("");

const filteredHotel = async () => {
  router.push({
    name: "FilteredHotelBookings",
    params: {
      id: filterId.value ? filterId.value : "null",
      name: city_name.value ? city_name.value : "null",
    },
    query: {
      price:
        minPrice.value || maxPrice.value
          ? `${minPrice.value}-${maxPrice.value}`
          : "null",
      rating: rating.value ? rating.value : "null",
      place: place.value ? place.value : "null",
      facilities:
        facilitiesArray.value.length > 0
          ? facilitiesArray.value.join(",")
          : "null",
    },
  });
  close();
};

const { hotels, loading } = storeToRefs(hotelStore);

const changePage = async (url) => {
  console.log(url);
  if (url != null) {
    await hotelStore.getChangePage(url);
  }
};

const bottomOfWindow = ref(false);
const isStickey = ref(false);

const handleScroll = () => {
  bottomOfWindow.value =
    Math.floor(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.offsetHeight - 100;

  const scrolledDown = document.documentElement.scrollTop > 250.39999389648438;
  isStickey.value = document.documentElement.scrollTop > 500;
  // console.log(
  //   document.documentElement.scrollTop,
  //   "this is top",
  //   isStickey.value
  // );
  if (scrolledDown) {
    showSearch.value = true;
  } else {
    showSearch.value = false;
  }
};

watch(bottomOfWindow, (newVal) => {
  if (bottomOfWindow.value == true) {
    let changePageCalled = false;
    if (newVal && !changePageCalled) {
      console.log("This is the bottom of the window");
      if (hotels?.value?.meta?.current_page < hotels?.value?.meta?.last_page) {
        changePageCalled = true; // Set the flag to true
        changePage(
          hotels?.value?.meta?.links[hotels?.value?.meta?.current_page + 1].url
        );
      }
    }
  }
});

const count_filter = ref(0);
// const minRange = ref(0);
// const maxRange = ref(15000);
const minPrice = ref(0);
const maxPrice = ref(15000);
const facilitiesArray = ref([]);

const addNewFacility = (id) => {
  const index = facilitiesArray.value.indexOf(id);
  if (index !== -1) {
    // ID exists, remove it
    facilitiesArray.value.splice(index, 1);
  } else {
    // ID does not exist, add it
    facilitiesArray.value.push(id);
  }
  console.log(facilitiesArray.value);
};

const removeFacility = () => {
  facilitiesArray.value = [];
};

const checkTrue = (id) => {
  return facilitiesArray.value.some((facility) => facility === id);
};
// const price_range = ref("");

// minPrice, maxPrice
// newPrice,
// newMaxPrice,

watch(
  [filterId, rating, place, facilitiesArray],
  async ([newValue, newRating, newPlace, newFacilitiesArray]) => {
    let data = {
      city_id: newValue,
    };
    if (newRating != null || newRating != "null") {
      data.rating = newRating;
    }
    // if (newPrice || newMaxPrice) {
    //   data.price_range = `${newPrice}-${newMaxPrice}`;
    // }
    if (newPlace) {
      data.place = newPlace;
    }
    if (facilitiesArray.value.length > 0) {
      data.facilities = newFacilitiesArray.join(",");
    }
    const res = await hotelStore.getListAction(data);
    // setPlaceArray(hotel?.value.data);
    console.log(res, "this is data");
    count_filter.value = res.meta.total;
  }
);

const searchFunctionArray = async () => {
  let data = {
    city_id: filterId.value,
  };
  if (rating.value != null || rating.value != "null") {
    data.rating = rating.value;
  }
  if (minPrice.value || maxPrice.value) {
    data.price_range = `${minPrice.value}-${maxPrice.value}`;
  }
  if (place.value) {
    data.place = place.value;
  }
  if (facilitiesArray.value.length > 0) {
    data.facilities = facilitiesArray.value.join(",");
  }
  const res = await hotelStore.getListAction(data);
  // setPlaceArray(hotel?.value.data);
  console.log(res, "this is data");
  count_filter.value = res.meta.total;
};

const showSearch = ref(false);

const searchFunction = (data) => {
  // console.log(data);
  city_name.value = data.name;
  filterId.value = data.id;
  placeArray.value = data.places;
  place.value = "";
};

const hotelList = ref([]);

const goDetialPage = (id) => {
  router.push({
    name: "HomeDetail",
    params: { id: id },
    query: { language: language.value },
  });
};

// const getRange = (data) => {
//   // console.log(data);
//   router.push({
//     name: "FilteredHotelBookings",
//     params: {
//       id: "null",
//       name: "null",
//     },
//     query: {
//       price: data,
//       facilities: "null",
//     },
//   });
// };

const placeArray = ref([]);
// const loadingPlace = ref(false);

// const setPlaceArray = (data) => {
//   loadingPlace.value = true;
//   const uniquePlaces = new Set();

//   data.forEach((element) => {
//     uniquePlaces.add(element.place);
//   });

//   placeArray.value = Array.from(uniquePlaces);
//   console.log(placeArray.value, "this is array");
//   loadingPlace.value = false;
// };

onMounted(async () => {
  await settingStore.getLanguage();
  window.addEventListener("scroll", handleScroll);
  // await settingStore.getLanguage();
  let res = await hotelStore.getListAction();
  await cityStore.getListHotelCityAction();
  console.log(cities.value, "this is city");
  await facilityStore.getListAction();
  console.log(facilities.value, "this is");
  // await hotelStore.getListAction();
  // setPlaceArray(hotel?.value.data);
  hotelList.value = res.data;
  console.log(hotelList.value, "this is hotel list add");
});

watch(hotels, async (newValue) => {
  if (newValue) {
    hotelList.value = [...hotelList.value, ...newValue.data];
  }

  console.log(hotelList.value, "this is add new");
});
</script>

<template>
  <Layout>
    <HeaderHomeVue :showTitle="true">
      <div class="px-6 space-y-6">
        <div class="text-white">
          <p class="text-base font-semibold tracking-wider">hotel bookings</p>
          <p class="text-xs">bangkok, pattaya, phuket, etc ...</p>
        </div>
        <!-- <div class="relative">
          <input
            type="search"
            @focus="router.push('/home/hotel-search')"
            name=""
            placeholder=" where would you like to stay"
            class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
            id=""
          />

          <img
            :src="searchIcon"
            class="w-5 h-5 absolute top-3.5 right-5 text-main"
            alt=""
          />
        </div> -->
        <HotelSearchHomeVue />
      </div>
    </HeaderHomeVue>
    <div class="h-auto pb-20 z-20 relative">
      <!-- <HotelsGradesVue @Range="getRange" /> -->
      <div class="space-y-4 relative">
        <div
          :class="isStickey ? 'shadow-custom' : ''"
          class="flex justify-between items-center mb-2 sticky top-0 py-2 px-6 z-10 bg-background w-full"
        >
          <h1 class="text-main font-semibold">direct partner hotels</h1>
          <div
            class="flex justify-end items-center gap-2 cursor-pointer"
            @click="openBottomSheet"
          >
            <p class="text-[10px] text-main font-semibold">filter by</p>
            <ChevronDownIcon class="w-3 h-3 text-main" />
          </div>
        </div>

        <div
          class="border border-black/10 mx-6 rounded-2xl shadow-sm bg-white p-2.5"
          v-for="i in hotelList ? hotelList : []"
          :key="i"
          @click="goDetialPage(i?.id)"
        >
          <HotelCartVue :i="i" />
        </div>
      </div>
      <!-- <div
        class="relative flex justify-center items-center py-[30%]"
        v-if="loading"
      >
        <div
          class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-main"
        ></div>
        <img src="../assets/logo.png" class="rounded-full h-16 w-16" />
      </div> -->
      <div v-if="loading" class="space-y-4">
        <div
          v-for="a in 8"
          :key="a"
          class="border border-black/10 mx-6 rounded-2xl shadow-sm bg-white p-2.5"
        >
          <div class="grid grid-cols-11 gap-3">
            <div
              class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl"
            >
              <img
                :src="LoadingImageCover"
                class="w-full h-full object-cover opacity-30"
                alt=""
              />
            </div>
            <div class="col-span-6 relative">
              <div class="mr-6 overflow-hidden">
                <p
                  class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-1"
                ></p>
                <p
                  class="font-semibold text-sm bg-black/20 w-full h-3 animate-pulse mt-2"
                ></p>
                <p
                  class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-2"
                ></p>
                <p
                  class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-1"
                ></p>
                <p
                  class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-1"
                ></p>
                <p
                  class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-5"
                ></p>
                <p
                  class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-2"
                ></p>
                <p
                  class="font-semibold text-sm bg-black/20 w-full h-2 animate-pulse mt-2"
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
      </div>

      <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
        <div class="font-poppins relative">
          <div class="flex justify-between items-center px-6 pb-4">
            <p class="opacity-0">........</p>
            <p class="text-main text-base">filter</p>
            <XMarkIcon class="w-5 h-5" @click="close" />
          </div>
          <div class="border border-black/10 p-4 ml-4 mr-4 rounded-xl">
            <div class="space-y-3 pb-10">
              <div class="flex justify-between items-center">
                <p class="text-sm font-semibold">choose city</p>
                <p
                  class="text-black text-[10px] cursor-pointer"
                  @click="all = !all"
                >
                  {{ all ? "show less" : "show more" }}
                </p>
              </div>
              <div class="flex flex-wrap justify-start items-center gap-2">
                <div v-for="(c, index) in cities?.data" :key="c.id">
                  <p
                    v-if="index < 8 || all"
                    class="border border-black/10 text-[10px] rounded-xl px-4 py-1"
                    :class="filterId == c.id ? 'bg-main text-white' : ''"
                    @click="searchFunction(c)"
                  >
                    {{ c?.name }}
                  </p>
                </div>
              </div>
              <p
                @click="all = !all"
                class="font-semibold text-main text-[10px] rounded-xl px-2 flex justify-start items-center gap-1 py-1"
              >
                {{ all ? "see less" : "see more" }}
                <ChevronUpIcon class="w-3 h-3" />
              </p>
            </div>
            <div class="space-y-3 pb-10">
              <div class="flex justify-between items-center">
                <p class="text-sm font-semibold">choose place</p>
                <div class="flex justify-end items-center gap-4">
                  <p
                    class="text-black text-[10px] cursor-pointer"
                    @click="placeall = !placeall"
                  >
                    {{ placeall ? "show less" : "show more" }}
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap justify-start items-center gap-2">
                <p
                  v-if="placeArray.length == 0 || !placeArray"
                  class="text-[9px] text-red"
                >
                  choose city first !
                </p>
                <div
                  class="flex justify-start items-center flex-wrap gap-1"
                  v-else
                >
                  <div v-for="(c, index) in placeArray" :key="c">
                    <p
                      v-if="index < 8 || placeall"
                      class="border border-black/10 text-[10px] rounded-xl px-4 py-1"
                      :class="place == c ? 'bg-main text-white' : ''"
                      @click="place = c"
                    >
                      {{ c }}
                    </p>
                  </div>
                </div>
                <p
                  v-show="placeArray.length != 0 && placeArray"
                  @click="placeall = !placeall"
                  class="border border-black/10 bg-black/10 text-[10px] rounded-xl px-4 py-1"
                >
                  {{ placeall ? "see less" : "see more" }}
                </p>
              </div>
            </div>
            <div class="space-y-3 pb-4">
              <div class="flex justify-between items-center">
                <p class="text-sm font-semibold">start rating</p>
                <ChevronUpIcon class="w-4 h-4" />
              </div>
              <div class="flex flex-wrap justify-start items-center gap-2 mr-5">
                <div
                  class="border rounded-2xl px-2 py-2"
                  :class="
                    rating == index + 1
                      ? 'border-main bg-main text-white '
                      : 'border-black/10 text-black/70'
                  "
                  v-for="(i, index) in 5"
                  :key="index"
                  @click="rating = i"
                >
                  <div class="flex justify-center items-center gap-1">
                    <p class="text-sm">{{ index + 1 }}</p>
                    <StarIcon class="w-5 h-5" />
                  </div>
                  <!-- <p class="text-[8px] text-black/70">6+hotels</p> -->
                </div>
              </div>
            </div>
            <div class="pb-5 pt-5 space-y-4">
              <div class="flex justify-between items-center">
                <p class="text-sm font-semibold">select facilities type</p>
                <div class="flex justify-end items-center gap-2">
                  <p
                    class="text-black px-3 py-1 bg-black/10 rounded-3xl text-[10px] cursor-pointer"
                    @click="removeFacility"
                  >
                    reset
                  </p>
                  <p
                    v-if="facilitiesArray.length > 0"
                    class="text-black px-3 py-1 bg-black/10 rounded-3xl text-[10px] cursor-pointer"
                    @click="searchFunctionArray"
                  >
                    search
                  </p>
                  <p
                    class="text-black text-[10px] cursor-pointer"
                    @click="facall = !facall"
                  >
                    {{ facall ? "show less" : "show more" }}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-1">
                <div
                  class=""
                  v-for="(i, index) in facilities?.data"
                  :key="index"
                  @click="addNewFacility(i.id)"
                >
                  <!-- <div
                    :class="checkTrue(i.id) ? 'border border-main ' : ''"
                    class="flex justify-between items-center gap-1 rounded-lg p-1"
                  >
                    <img :src="i.image" class="w-8 h-8" alt="" />
                  </div> -->
                  <div
                    v-if="index < 8 || facall"
                    class="flex justify-between space-y-2 items-center"
                  >
                    <p class="text-xs text-black text-center">
                      {{ i.name }}
                    </p>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      :checked="checkTrue(i.id)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-3 overflow-hidden pb-8 pt-4">
              <div class="flex justify-between items-center">
                <p class="text-sm font-semibold">price range</p>
                <p
                  class="text-black px-3 py-1 relative z-20 bg-black/10 rounded-3xl text-[10px] cursor-pointer"
                  @click="searchFunctionArray"
                >
                  search
                </p>
              </div>

              <!-- <div class="range-slider w-full">
                <div
                  class="w-full h-1 rounded-xl absolute top-[37px] bg-main"
                ></div>
                <input
                  type="range"
                  v-model="minPrice"
                  :min="minRange"
                  :max="maxRange"
                  class="range-min"
                />
                <input
                  type="range"
                  v-model="maxPrice"
                  :min="minRange"
                  :max="maxRange"
                  class="range-max"
                />
              </div> -->
              <div class="flex justify-between items-center gap-2">
                <!-- <p class="text-xs text-black text-center">
                  {{ minPrice }} THB - {{ maxPrice }} THB
                </p> -->
                <div class="border border-black/10 w-[45%] rounded-2xl p-2">
                  <p class="text-[10px]">minimum</p>
                  <input
                    type="number"
                    name=""
                    v-model="minPrice"
                    class="outline-none focus:outline-none ring-0 w-full"
                    id=""
                  />
                </div>
                <p class="font-semibold h-0.5 w-[5%] bg-black/50"></p>
                <div class="border border-black/10 w-[45%] rounded-2xl p-2">
                  <p class="text-[10px]">maximum</p>
                  <input
                    type="number"
                    name=""
                    v-model="maxPrice"
                    class="outline-none focus:outline-none ring-0 w-full"
                    id=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex justify-between sticky bg-white px-4 bottom-0 gap-4 items-center py-4 border border-black/10"
          >
            <button
              @click="close"
              class="text-center border border-black/10 rounded-full py-2 w-[40%] text-sm text-main font-semibold"
            >
              clear
            </button>
            <button
              @click="filteredHotel"
              class="text-center border bg-main border-black/10 rounded-full py-2 w-[60%] text-sm text-white font-semibold"
            >
              see {{ count_filter }} hotels
            </button>
          </div>
        </div>
      </vue-bottom-sheet>
    </div>
  </Layout>
</template>
