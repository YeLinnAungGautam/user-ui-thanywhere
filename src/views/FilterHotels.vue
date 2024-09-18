<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import HotelCartVue from "../components/LoadingCarts/HotelCart.vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import LoadingImageCover from "../assets/web/loadingImageCover.jpg";
import { StarIcon } from "@heroicons/vue/24/solid";
// import stayinbangkok from "../assets/db";
// import StarPartVue from "../components/home/StarPart.vue";
import { useRoute, useRouter } from "vue-router";
import HeaderHome from "../components/layout/HeaderHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
// import graph from "../assets/icons/graph.png";
import { computed, onMounted, ref, watch } from "vue";
import debounce from "lodash.debounce";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
import { useHotelStore } from "../stores/hotel";
import { useFacilityStore } from "../stores/facility";
import { useSettingStore } from "../stores/setting";
import { useOrderVantourStore } from "@/stores/orderVantour";

const hotelStore = useHotelStore();
const settingStore = useSettingStore();
const cityStore = useCityStore();
const facilityStore = useFacilityStore();
const orderVantourStore = useOrderVantourStore();
const router = useRouter();
const route = useRoute();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);
const { facilities } = storeToRefs(facilityStore);
const { language } = storeToRefs(settingStore);
const { checkin_date, checkout_date } = storeToRefs(orderVantourStore);

const open = () => {
  myBottomSheet.value.open();
};

const openBottomSheet = async () => {
  open();
  filterId.value = city_id.value;
  city_name.value = route.params.name;
};

const close = () => {
  myBottomSheet.value.close();
};

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
  facilityQuery.value = "";
};

const checkTrue = (id) => {
  return facilitiesArray.value.some((facility) => facility == id);
};

const searchFunctionArray = async () => {
  facilityQuery.value = facilitiesArray.value.join(",");
  const res = await hotelStore.getListAction(watchSystem.value);
  // setPlaceArray(hotel?.value.data);
  console.log(res, "this is data");
  count_filter.value = res.meta.total;
};

const filteredHotel = async () => {
  facilityQuery.value = facilitiesArray.value.join(",");
  router.push({
    name: "FilteredHotelBookings",
    params: {
      id: filterId.value,
      name: city_name.value,
    },
    query: {
      price:
        minPrice.value || maxPrice.value
          ? `${minPrice.value}-${maxPrice.value}`
          : "null",
      rating: rating.value ? rating.value : "null",
      place: place.value ? place.value : "null",
      facilities: facilityQuery.value ? facilityQuery.value : "null",
    },
  });
  close();
  setTimeout(() => {
    window.location.reload();
  }, 1000); // 2000 milliseconds = 2 seconds
};

// const data = stayinbangkok;
const price = ref("");
const price_range = ref("");
const search = ref("");
const city_id = ref("");
const filterId = ref("");
const rating = ref("");
const place = ref("");
const placeall = ref(false);
const facall = ref(false);

const watchSystem = computed(() => {
  const result = {};
  if (
    price.value != "" &&
    price.value != undefined &&
    price.value != "null" &&
    price_range.value == "" &&
    price_range.value != "null"
  ) {
    result.max_price = price.value;
  }
  if (
    price_range.value != "" &&
    price_range.value != undefined &&
    price.value == "" &&
    price.value != "null"
  ) {
    result.price_range = price_range.value;
  }
  if (
    city_id.value != "" &&
    city_id.value != undefined &&
    city_id.value != "null"
  ) {
    result.city_id = city_id.value;
  }
  if (
    rating.value != "" &&
    rating.value != undefined &&
    rating.value != "null"
  ) {
    result.rating = rating.value;
  }
  if (place.value != "" && place.value != undefined && place.value != "null") {
    result.place = place.value;
  }
  if (
    facilityQuery.value != "" &&
    facilityQuery.value != undefined &&
    facilityQuery.value != "null"
  ) {
    result.facilities = facilityQuery.value;
  }
  return result;
});

const all = ref(false);

const { hotels, loading } = storeToRefs(hotelStore);

const changePage = async (url) => {
  console.log(url);
  if (url != null) {
    let data;
    if (search.value != null && search.value != "") {
      data = {
        search: search.value,
      };
    } else {
      data = watchSystem.value;
    }
    await hotelStore.getChangePage(url, data);
  }
};

const bottomOfWindow = ref(false);
const isStickey = ref(false);

const handleScroll = () => {
  bottomOfWindow.value =
    Math.floor(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.offsetHeight - 100;

  const scrolledDown = document.documentElement.scrollTop > 250.39999389648438;
  isStickey.value = document.documentElement.scrollTop > 180;
  // console.log(document.documentElement.scrollTop, "this is top");
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

const showSearch = ref(false);

const hotelList = ref([]);
const count = ref("");
const count_filter = ref("");
const city_name = ref("");
const searchCityName = ref("");

const goDetialPage = (id) => {
  router.push({
    name: "HomeDetail",
    params: { id: id },
    query: { language: language.value },
  });
};

const searchFunction = (data) => {
  city_name.value = data.name;
  filterId.value = data.id;
  placeArray.value = data.places;
  place.value = "";
};

const facilityQuery = ref("");

const choosePlaceArray = (id) => {
  // console.log(id, cities.value, "this is city place choose");
  if (id != "null") {
    const city = cities.value.data?.find((city) => city.id == id);
    placeArray.value = city?.places;
  }
};

onMounted(async () => {
  if (route.query.search) {
    search.value = route.query.search ? route.query.search : "";
    console.log(route.query.search);
  } else if (!route.query.search) {
    city_id.value = route.params.id;
    searchCityName.value = route.params.name;
    rating.value =
      route.query.rating != "null" && route.query.rating
        ? route.query.rating
        : "";
    place.value =
      route.query.place != "null" && route.query.place ? route.query.place : "";
    if (
      route.query.price &&
      typeof route.query.price === "string" &&
      route.query.price.includes("-")
    ) {
      price_range.value = route.query.price;
      let [min, max] = route.query.price.split("-");
      minPrice.value = min;
      maxPrice.value = max;
    } else {
      price.value = route.query.price;
    }
    facilityQuery.value = route.query.facilities;
    facilitiesArray.value =
      route.query.facilities != "null"
        ? route.query.facilities?.split(",")
        : [];
    let res = await hotelStore.getListAction(watchSystem.value);
    count.value = res.meta.total;
    hotelList.value = res.data;
  }
  // await settingStore.getLanguage();
  await orderVantourStore.getHotelData();

  await cityStore.getListHotelCityAction();
  choosePlaceArray(city_id.value);
  window.addEventListener("scroll", handleScroll);

  console.log(watchSystem.value, "this is watch system");
  // await hotelStore.getListAction(watchSystem.value);
  await facilityStore.getListAction();

  // setPlaceArray(hotel?.value.data);

  console.log(facilitiesArray.value, "this is array filter faciliy");

  console.log(hotelList.value, "this is hotel list add");
});

watch(hotels, async (newValue) => {
  if (newValue) {
    hotelList.value = [...hotelList.value, ...newValue.data];
  }

  console.log(hotelList.value, "this is add new");
});

// watch([filterId, price, rating], async ([newValue, newPrice, newRating]) => {
//   let data = {
//     city_id: newValue,
//     rating: newRating ? newRating : 3,
//   };
//   if (newPrice && price_range.value == "") {
//     data.max_price = newPrice;
//   } else if (price_range.value && !newPrice) {
//     data.price_range = price_range.value;
//   }
//   const res = await hotelStore.getFilterAction(data);
//   console.log(data, "this is data");
//   count_filter.value = res.meta.total;
// });

// const minRange = ref(0);
// const maxRange = ref(15000);
const minPrice = ref(0);
const maxPrice = ref(15000);

watch([filterId, rating, place], async ([newValue, newRating, newPlace]) => {
  let data = {};
  if (newValue && newValue != "null") {
    data.city_id = newValue;
  }
  if (newRating != null && newRating != "null" && newRating) {
    data.rating = newRating;
  }
  if (newPlace) {
    data.place = newPlace;
  }

  // data.price_range = `${newPrice}-${newMaxPrice}`;

  if (newValue || newRating || newPlace) {
    const res = await hotelStore.getFilterAction(data);
    // setPlaceArray(hotel?.value.data);
    console.log(res, "this is data");
    count_filter.value = res.meta.total;
  }
});

const placeArray = ref([]);

// const setPlaceArray = (data) => {
//   const uniquePlaces = new Set();

//   data.forEach((element) => {
//     uniquePlaces.add(element.place);
//   });

//   placeArray.value = Array.from(uniquePlaces);
//   console.log(placeArray.value, "this is array");
// };

watch(
  search,
  debounce(async (newValue) => {
    if (newValue) {
      hotelList.value = [];
      searchCityName.value = "null";
      let res = await hotelStore.getListAction({
        search: newValue,
      });
      count.value = res.meta.total;
      hotelList.value = res.data;
    } else {
      hotelList.value = [];
      searchCityName.value = route.params.name;
      let res = await hotelStore.getListAction(watchSystem.value);
      count.value = res.meta.total;
      hotelList.value = res.data;
    }
  }, 500)
);
</script>

<template>
  <Layout>
    <div>
      <HeaderHome :showTitle="false" class="">
        <div class="flex justify-between items-center py-4 px-4">
          <ChevronLeftIcon
            class="w-6 h-6 text-white"
            @click="router.push('/home/hotel-bookings')"
          />
          <p class="text-white font-semibold">over {{ count }} hotels</p>
          <p class="opacity-0">..</p>
        </div>
        <div class="relative w-full px-4">
          <input
            type="text"
            v-model="search"
            placeholder=" search"
            class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
          />

          <img
            :src="searchIcon"
            class="w-5 h-5 absolute top-3.5 right-8 text-main"
            alt=""
          />
        </div>
      </HeaderHome>
      <div class="space-y-4 pb-20 relative">
        <div
          :class="isStickey ? 'shadow-custom' : ''"
          class="flex justify-between items-center mb-2 sticky top-0 py-2 px-6 z-10 bg-background w-full"
        >
          <h1
            class="text-main font-semibold"
            v-if="searchCityName != 'null' && !search"
          >
            hotels in {{ searchCityName }}
          </h1>
          <h1
            class="text-main font-semibold"
            v-if="searchCityName == 'null' && !search"
          >
            hotels
          </h1>
          <h1
            class="text-main font-semibold"
            v-if="searchCityName == 'null' && search"
          >
            '{{ search }}' search hotels
          </h1>
          <div
            class="flex justify-end items-center gap-2 cursor-pointer"
            @click="openBottomSheet"
          >
            <p class="text-[10px] text-main font-semibold whitespace-nowrap">
              filter by
            </p>
            <ChevronDownIcon class="w-3 h-3 text-main" />
          </div>
        </div>
        <div class="flex justify-start items-center flex-wrap gap-2 px-6">
          <p
            class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
            v-if="searchCityName != 'null' && searchCityName != ''"
          >
            {{ searchCityName }}
          </p>
          <p
            class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
            v-if="
              checkin_date != 'null' &&
              checkin_date != '' &&
              checkout_date != 'null' &&
              checkout_date != ''
            "
          >
            {{ checkin_date }} - {{ checkout_date }}
          </p>

          <p
            class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
            v-if="place != 'null' && place != ''"
          >
            {{ place }}
          </p>
          <p
            class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
            v-if="rating != 'null' && rating != ''"
          >
            {{ rating }} star
          </p>
          <p
            class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
            v-if="maxPrice != 'null' && maxPrice != 15000"
          >
            {{ minPrice }} - {{ maxPrice }}
          </p>
          <div
            v-if="facilitiesArray.length > 0"
            class="flex justify-start flex-wrap items-center gap-1"
          >
            <p
              class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
              v-for="f in facilitiesArray"
              :key="f"
            >
              <span v-for="s in facilities?.data" :key="s">
                <span v-if="s.id == f" class="whitespace-nowrap">{{
                  s.name
                }}</span>
              </span>
            </p>
          </div>
        </div>
        <div
          class="border mx-6 border-black/10 rounded-2xl shadow-sm bg-white p-2.5"
          v-for="i in hotelList ?? []"
          :key="i"
          @click="goDetialPage(i?.id)"
        >
          <HotelCartVue :i="i" />
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
                  class="border border-black/10 text-[10px] rounded-2xl px-4 py-1"
                  :class="filterId == c.id ? 'bg-main text-white' : ''"
                  @click="searchFunction(c)"
                >
                  {{ c?.name }}
                </p>
              </div>
            </div>
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
                v-if="placeArray?.length == 0 || !placeArray"
                class="text-[9px] text-red"
              >
                choose city first !
              </p>
              <div v-for="(c, index) in placeArray" :key="c">
                <p
                  v-if="index < 8 || placeall"
                  class="border border-black/10 text-[10px] rounded-2xl px-4 py-1"
                  :class="place == c ? 'bg-main text-white' : ''"
                  @click="place = c"
                >
                  {{ c }}
                </p>
              </div>
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
                    ? 'border-main bg-main text-white'
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
            <div class="flex justify-between items-center pb-5">
              <p class="text-sm font-semibold">price range</p>
              <p
                class="text-black px-3 py-1 relative z-20 bg-black/10 rounded-3xl text-[10px] cursor-pointer"
                @click="searchFunctionArray"
              >
                search
              </p>
            </div>

            <!-- <div class="range-slider w-full relative">
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

          <!-- <div class="flex justify-between gap-4 items-center pt-4">
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
          </div> -->
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
  </Layout>
</template>

<style></style>
