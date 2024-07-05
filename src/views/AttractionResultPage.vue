<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import {
  ChevronLeftIcon,
  HeartIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
// import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/vue/24/solid";
// import vantourdb from "../assets/vantourdb";
import { useRouter, useRoute } from "vue-router";
import HeaderHome from "../components/layout/HeaderHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { onMounted, ref, watch } from "vue";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
import activitydb from "../assets/activitydb";
import { useEntranceStore } from "../stores/entrance";

const cityStore = useCityStore();
const entranceStore = useEntranceStore();
const router = useRouter();
const route = useRoute();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);
const { entrances, loading } = storeToRefs(entranceStore);

const open = () => {
  myBottomSheet.value.open();
};

const close = () => {
  myBottomSheet.value.close();
};

// const data = vantourdb;
const all = ref(false);

const filterId = ref("");
const city_name = ref("");

const filteredHotel = async () => {
  router.push({
    name: "HomeAttractionResult",
    params: { id: filterId.value, name: city_name.value },
  });
  close();
  setTimeout(() => {
    window.location.reload();
  }, 1000); // 2000 milliseconds = 2 seconds
};

const changePage = async (url) => {
  console.log(url);
  if (url != null) {
    // let data = { city_id: filterId.value };
    let data;
    if (search.value != "" && search.value != "null") {
      data = { search: search.value };
    } else {
      data = { city_id: filterId.value };
    }
    await entranceStore.getChangePage(url, data);
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
  console.log(
    document.documentElement.scrollTop,
    "this is top",
    isStickey.value
  );
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
      if (
        entrances?.value?.meta?.current_page < entrances?.value?.meta?.last_page
      ) {
        changePageCalled = true; // Set the flag to true
        changePage(
          entrances?.value?.meta?.links[
            entrances?.value?.meta?.current_page + 1
          ].url
        );
      }
    }
  }
});

const count_filter = ref(0);
// const price_range = ref("");

watch([filterId], async ([newValue]) => {
  let data = {
    city_id: newValue,
  };

  const res = await entranceStore.getFilterAction(data);
  console.log(res, "this is data");
  count_filter.value = res.meta.total;
});

const showSearch = ref(false);

const searchFunction = (data) => {
  city_name.value = data.name;
  filterId.value = data.id;
};

const entrancesList = ref([]);

const goDetialPage = (id) => {
  router.push({ name: "HomeAttractionDetail", params: { id: id } });
};

// const getRange = (data) => {
//   // console.log(data);
//   router.push({
//     name: "HomeAttractionResult",
//     params: { id: 2, name: "Bangkok" },
//   });
// };
//  activitydb = activitydb;

const count = ref(0);
const search = ref("");
const searchCityName = ref("");

watch(search, async (newValue) => {
  if (newValue) {
    entrancesList.value = [];
    searchCityName.value = "null";
    let res = await entranceStore.getListAction({
      search: search.value,
    });
    count.value = res.meta.total;
    entrancesList.value = res.data;
  } else {
    entrancesList.value = [];
    searchCityName.value = route.params.name;
    let res = await entranceStore.getListAction({
      city_id: filterId.value,
    });
    count.value = res.meta.total;
    entrancesList.value = res.data;
  }
});

onMounted(async () => {
  filterId.value = route.params.id;
  city_name.value = route.params.name;
  searchCityName.value = route.params.name;
  window.addEventListener("scroll", handleScroll);
  let res = await entranceStore.getListAction({
    city_id: filterId.value,
    search: search.value,
  });
  count.value = res.meta.total;
  await cityStore.getSimpleListAction();
  entrancesList.value = res.data;
  console.log(entrancesList.value, "this is entrance list add");
});

watch(entrances, async (newValue) => {
  if (newValue) {
    entrancesList.value = [...entrancesList.value, ...newValue.data];
  }

  console.log(entrancesList.value, "this is add new");
});
</script>

<template>
  <Layout>
    <div>
      <HeaderHome :showTitle="false" class="px-6">
        <div class="flex justify-between items-center py-4">
          <ChevronLeftIcon
            class="w-6 h-6 text-white"
            @click="router.push('/home/attraction')"
          />
          <p class="text-white font-semibold">over {{ count }} attractions</p>
          <p class="opacity-0">..</p>
        </div>
        <div class="relative w-full">
          <input
            type="text"
            v-model="search"
            name=""
            placeholder=" search"
            class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
            id=""
          />

          <img
            :src="searchIcon"
            class="w-5 h-5 absolute top-3.5 right-5 text-main"
            alt=""
          />
        </div>
      </HeaderHome>
      <div class="space-y-4 relative pt-6 pb-20">
        <div
          :class="isStickey ? 'shadow-custom' : ''"
          class="flex justify-between items-center mb-2 sticky top-0 py-2 px-6 z-10 bg-background w-full"
        >
          <h1 class="text-main font-semibold" v-if="searchCityName != 'null'">
            attractions in {{ searchCityName }}
          </h1>
          <h1 class="text-main font-semibold" v-if="searchCityName == 'null'">
            attractions
          </h1>
          <div
            class="flex justify-end items-center gap-2 cursor-pointer"
            @click="open"
          >
            <p class="text-[10px] text-main font-semibold">filter by</p>
            <ChevronDownIcon class="w-3 h-3 text-main" />
          </div>
        </div>
        <div
          class="border border-black/10 mx-6 rounded-2xl relative shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
          v-for="i in entrancesList"
          :key="i"
          @click="goDetialPage(i.id)"
        >
          <p
            v-if="i?.total_booking_count != 0"
            class="bg-main text-white absolute top-4 -left-3 ml-2 text-xs px-3 inline-block py-1 rounded-r-full"
          >
            sell count - {{ i?.total_booking_count }}
          </p>
          <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl">
            <img
              v-if="i?.cover_image"
              :src="i?.cover_image"
              class="w-full h-full object-cover"
              alt=""
            />
            <img
              v-if="!i?.cover_image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div class="col-span-6 relative">
            <div class="overflow-hidden space-y-1">
              <div>
                <p class="text-xs font-semibold text-main pr-4">
                  {{ i?.name }}
                </p>
                <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" />
              </div>
              <div class="flex justify-start gap-1 flex-wrap items-center">
                <p
                  class="whitespace-nowrap bg-black/10 text-[8px] px-1 py-0.5 rounded-md text-black/70"
                  v-for="a in i?.cities"
                  :key="a"
                >
                  {{ a.name }}
                </p>
              </div>
              <p
                class="text-[8px] h-[70px] overflow-hidden"
                v-if="i?.description && i?.description != 'null'"
              >
                {{ i?.description }}
              </p>
              <p
                class="text-[8px] h-[70px] overflow-hidden"
                v-if="!i?.description || i?.description == 'null'"
              >
                coming soon !
              </p>
              <div class="absolute bottom-0 space-y-0.5">
                <p class="text-[10px] pb-1">starting price</p>
                <p
                  class="bg-main text-white text-sm font-semibold px-3 inline-block py-0.5 rounded-full"
                >
                  {{ i?.lowest_variation_price }}THB
                </p>
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
      </div>
    </div>
    <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
      <div class="font-poppins">
        <div class="flex justify-between items-center px-6 pb-4">
          <p class="opacity-0">........</p>
          <p class="text-main text-base">filter</p>
          <XMarkIcon class="w-5 h-5" @click="close" />
        </div>
        <div class="border border-black/10 p-4 ml-4 mr-2 rounded-xl">
          <div class="space-y-3 pb-8">
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
          <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
            <div
              class="px-2 py-2 space-y-1 w-[70px] mx-auto"
              v-for="(i, index) in activitydb"
              :key="index"
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
              see {{ count_filter }} attractions
            </button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </Layout>
</template>

<style></style>
