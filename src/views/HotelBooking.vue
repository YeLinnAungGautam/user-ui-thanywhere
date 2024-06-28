<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import HotelsGradesVue from "../components/hotelbookings/HotelsGrades.vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { HeartIcon } from "@heroicons/vue/24/outline";
import {
  MapPinIcon,
  BuildingOffice2Icon,
  StarIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
// import StarPartVue from "../components/home/StarPart.vue";
import { useRouter } from "vue-router";
import { useHotelStore } from "../stores/hotel";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useCityStore } from "../stores/city";

const hotelStore = useHotelStore();
const cityStore = useCityStore();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);

const router = useRouter();
const all = ref(false);
const placeall = ref(false);

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
      price:
        minPrice.value || maxPrice.value
          ? `${minPrice.value}-${maxPrice.value}`
          : "null",
      rating: rating.value ? rating.value : "null",
      place: place.value ? place.value : "null",
    },
  });
  close();
};

const { hotels, hotel, loading } = storeToRefs(hotelStore);

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
const minRange = ref(0);
const maxRange = ref(100000);
const minPrice = ref(0);
const maxPrice = ref(100000);
// const price_range = ref("");

watch(
  [filterId, minPrice, maxPrice, rating, place],
  async ([newValue, newPrice, newMaxPrice, newRating, newPlace]) => {
    let data = {
      city_id: newValue,
    };
    if (newRating != null || newRating != "null") {
      data.rating = newRating;
    }
    if (newPrice || newMaxPrice) {
      data.price_range = `${newPrice}-${newMaxPrice}`;
    }
    if (newPlace) {
      data.place = newPlace;
    }
    const res = await hotelStore.getSimpleListAction(data);
    setPlaceArray(hotel?.value.data);
    console.log(res, "this is data");
    count_filter.value = res.meta.total;
  }
);

const showSearch = ref(false);

const searchFunction = (data) => {
  city_name.value = data.name;
  filterId.value = data.id;
};

const hotelList = ref([]);

const goDetialPage = (id) => {
  router.push({ name: "HomeDetail", params: { id: id } });
};

const getRange = (data) => {
  // console.log(data);
  router.push({
    name: "FilteredHotelBookings",
    params: {
      id: 2,
      name: "Bangkok",
      price: data,
      rating: "null",
      place: "null",
    },
  });
};

const placeArray = ref([]);

const setPlaceArray = (data) => {
  const uniquePlaces = new Set();

  data.forEach((element) => {
    uniquePlaces.add(element.place);
  });

  placeArray.value = Array.from(uniquePlaces);
  console.log(placeArray.value, "this is array");
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);

  let res = await hotelStore.getListAction();
  await cityStore.getSimpleListAction();
  await hotelStore.getSimpleListAction();
  setPlaceArray(hotel?.value.data);
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
          <p class="text-xs">bangkok, pattaya, phuket, etc...</p>
        </div>
        <div class="relative">
          <input
            type="search"
            @focus="router.push('/home/hotel-search')"
            name=""
            placeholder=" search would you like to stay"
            class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
            id=""
          />

          <img
            :src="searchIcon"
            class="w-5 h-5 absolute top-3.5 right-5 text-main"
            alt=""
          />
        </div>
      </div>
    </HeaderHomeVue>
    <div class="h-auto pb-20 pt-8 space-y-10 relative">
      <HotelsGradesVue @Range="getRange" />
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
          class="border border-black/10 mx-6 rounded-2xl shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
          v-for="i in hotelList ? hotelList : []"
          :key="i"
          @click="goDetialPage(i?.id)"
        >
          <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl">
            <img
              :src="i?.images[0]?.image"
              class="w-full h-full object-cover"
              alt=""
              v-if="i?.images.length > 0"
            />
            <img
              v-if="i?.images.length == 0"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div class="col-span-6 relative">
            <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" />
            <div class="mr-6 overflow-hidden">
              <p class="text-xs font-semibold text-main">{{ i.name }}</p>
              <div class="flex justify-between items-center">
                <!-- <StarPartVue :count="i.rating" /> -->
                <p class="text-[10px] text-black font-medium">
                  {{ i.rating }}-star rating
                </p>
                <div
                  class="text-[10px] flex justify-end items-center gap-0.5 py-1"
                >
                  <MapPinIcon class="w-3 h-3 text-black/50" />
                  <p>{{ i?.city.name }}</p>
                </div>
              </div>
              <p class="text-[8px] h-[36px] overflow-hidden">
                {{ i.description }}
              </p>
              <div class="absolute bottom-0 space-y-0.5">
                <p class="text-[10px]">location area</p>
                <div class="flex justify-start gap-2 items-center">
                  <div
                    class="text-[8px] flex justify-end text-main items-center gap-0.5 py-1"
                  >
                    <BuildingOffice2Icon class="w-2.5 h-2.5 text-main" />
                    <p>{{ i.place }}</p>
                  </div>
                </div>
                <p class="text-[10px] pb-1">start price</p>
                <p
                  class="bg-main text-white text-sm font-semibold px-3 inline-block py-0.5 rounded-full"
                >
                  {{ i.lowest_room_price }} THB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative flex justify-center items-center py-[30%]"
        v-if="loading"
      >
        <div
          class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-main"
        ></div>
        <img src="../assets/logo.png" class="rounded-full h-16 w-16" />
        <!-- <p>loading</p> -->
      </div>
      <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
        <div class="font-poppins">
          <div class="flex justify-between items-center px-6 pb-4">
            <p class="opacity-0">........</p>
            <p class="text-main text-base">filter</p>
            <XMarkIcon class="w-5 h-5" @click="close" />
          </div>
          <div class="border border-black/10 p-4 ml-4 mr-2 rounded-xl">
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
                    class="border border-black/60 text-[10px] rounded-lg px-4 py-1"
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
                    class="text-black px-3 py-1 bg-black/10 rounded-3xl text-[10px] cursor-pointer"
                    @click="place = ''"
                  >
                    all places
                  </p>
                  <p
                    class="text-black text-[10px] cursor-pointer"
                    @click="placeall = !placeall"
                  >
                    {{ placeall ? "show less" : "show more" }}
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap justify-start items-center gap-2">
                <div v-for="(c, index) in placeArray" :key="c">
                  <p
                    v-if="index < 8 || placeall"
                    class="border border-black/60 text-[10px] rounded-lg px-4 py-1"
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
                  class="border rounded-lg px-2 py-2"
                  :class="
                    rating == index + 1 ? 'border-main ' : 'border-black/60'
                  "
                  v-for="(i, index) in 5"
                  :key="index"
                  @click="rating = i"
                >
                  <div class="flex justify-center items-center gap-1">
                    <p class="text-sm">{{ index + 1 }}</p>
                    <StarIcon class="w-5 h-5 text-main" />
                  </div>
                  <p class="text-[8px] text-black/70">6+hotels</p>
                </div>
              </div>
            </div>
            <div class="space-y-3 pb-8 pt-4">
              <div class="flex justify-between items-center">
                <p class="text-sm font-semibold">price range</p>
                <ChevronUpIcon class="w-4 h-4" />
              </div>
              <div class="space-y-2">
                <p class="text-xs font-medium">
                  {{ minPrice }} THB - {{ maxPrice }} THB
                </p>
                <div class="relative grid grid-cols-2 gap-4">
                  <div>
                    <input
                      id="small-range-min"
                      type="range"
                      v-model="minPrice"
                      :min="minRange"
                      :max="maxPrice"
                      class="w-full h-0.5 mb-6 focus:outline-none bg-main rounded-lg appearance-none cursor-pointer range-sm"
                    />
                  </div>
                  <div>
                    <input
                      id="small-range-max"
                      type="range"
                      v-model="maxPrice"
                      :min="minPrice"
                      :max="maxRange"
                      class="w-full h-0.5 mb-6 focus:outline-none bg-main rounded-lg appearance-none cursor-pointer range-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-between gap-4 items-center pt-4">
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
        </div>
      </vue-bottom-sheet>
    </div>
  </Layout>
</template>
