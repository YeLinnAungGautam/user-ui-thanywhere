<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
// import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/vue/24/solid";
import { useRouter, useRoute } from "vue-router";
import HeaderHome from "../components/layout/HeaderHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { onMounted, ref, watch } from "vue";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
import { useCarStore } from "../stores/car";
import { useVantourStore } from "../stores/vantour";

const carStore = useCarStore();
const cityStore = useCityStore();
const router = useRouter();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);
const vantourStore = useVantourStore();
const { vantours, loading } = storeToRefs(vantourStore);
const { cars } = storeToRefs(carStore);
const route = useRoute();

const open = () => {
  myBottomSheet.value.open();
};

const close = () => {
  myBottomSheet.value.close();
};

const filterId = ref("");

const filteredHotel = async () => {
  router.push({
    name: "HomeVantourResult",
    params: {
      id: filterId.value,
      name: city_name.value,
      car: car_id.value,
    },
  });
  close();
  setTimeout(() => {
    window.location.reload();
  }, 1000); // 2000 milliseconds = 2 seconds
};

// const data = stayinbangkok;
const car_id = ref("");
const search = ref("");
const searchCityName = ref("");

const all = ref(false);

const changePage = async (url) => {
  console.log(url);
  if (url != null) {
    await vantourStore.getChangePage(url, {
      city_id: filterId.value,
      car_id: car_id.value,
    });
  }
};

const bottomOfWindow = ref(false);

const handleScroll = () => {
  bottomOfWindow.value =
    Math.floor(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.offsetHeight - 100;

  const scrolledDown = document.documentElement.scrollTop > 250.39999389648438;
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
      if (
        vantours?.value?.meta?.current_page < vantours?.value?.meta?.last_page
      ) {
        changePageCalled = true; // Set the flag to true
        changePage(
          vantours?.value?.meta?.links[vantours?.value?.meta?.current_page + 1]
            .url
        );
      }
    }
  }
});

const showSearch = ref(false);

const vantoursList = ref([]);
const count = ref("");
const count_filter = ref("");
const city_name = ref("");

const goDetialPage = (id) => {
  router.push({ name: "HomeVantourDetail", params: { id: id } });
};

const searchFunction = (data) => {
  city_name.value = data.name;
  filterId.value = data.id;
};

onMounted(async () => {
  filterId.value = route.params.id;
  car_id.value = route.params.car;
  city_name.value = route.params.name;
  await cityStore.getSimpleListAction();
  await carStore.getSimpleListAction();
  window.addEventListener("scroll", handleScroll);
  let res = await vantourStore.getListAction({
    city_id: filterId.value,
    car_id: car_id.value,
  });
  count.value = res.meta.total;
  searchCityName.value = route.params.name;

  vantoursList.value = res.data;
  console.log(vantoursList.value, "this is hotel list add");
});

watch(vantours, async (newValue) => {
  if (newValue) {
    vantoursList.value = [...vantoursList.value, ...newValue.data];
  }

  console.log(vantoursList.value, "this is add new");
});

watch([filterId, car_id], async ([newValue, newCarValue]) => {
  let data = {
    city_id: newValue,
    car_id: newCarValue,
  };

  const res = await vantourStore.getFilterAction(data);
  console.log(data, "this is data");
  count_filter.value = res.meta.total;
});

watch(search, async (newValue) => {
  if (newValue) {
    vantoursList.value = [];
    searchCityName.value = "null";
    let res = await vantourStore.getListAction({
      search: newValue,
    });
    count.value = res.meta.total;
    vantoursList.value = res.data;
  } else {
    vantoursList.value = [];
    searchCityName.value = route.params.name;
    let res = await vantourStore.getListAction({
      city_id: filterId.value,
    });
    count.value = res.meta.total;
    vantoursList.value = res.data;
  }
});
</script>

<template>
  <Layout>
    <div>
      <HeaderHome :showTitle="false" class="px-6">
        <div class="flex justify-between items-center py-4">
          <ChevronLeftIcon
            class="w-6 h-6 text-white"
            @click="router.push('/home/van-tour')"
          />
          <p class="text-white font-semibold">over {{ count }} vantours</p>
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
      <div class="space-y-4 px-6 pt-6 pb-20">
        <div class="flex justify-between items-center mb-2">
          <h1 class="text-main font-semibold" v-if="searchCityName != 'null'">
            vantours packages in {{ searchCityName }}
          </h1>
          <h1 class="text-main font-semibold" v-if="searchCityName == 'null'">
            vantours packages
          </h1>
          <div
            class="flex justify-end items-center gap-2 cursor-pointer"
            @click="open"
          >
            <p class="text-[10px] text-main font-semibold whitespace-nowrap">
              filter by
            </p>
            <ChevronDownIcon class="w-3 h-3 text-main" />
          </div>
        </div>
        <div
          class="border border-black/10 rounded-2xl shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
          v-for="i in vantoursList"
          :key="i"
        >
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
              <p class="text-xs font-semibold text-main">{{ i.name }}</p>
              <div class="flex justify-start gap-1 flex-wrap items-center">
                <p
                  v-for="c in i?.cities"
                  :key="c"
                  class="bg-black/10 px-1 text-[8px] py-0.5 rounded-md"
                >
                  {{ c.name }}
                </p>
              </div>
              <p class="text-[8px] h-[70px] overflow-hidden">
                {{ i.long_description }}
              </p>
              <div class="absolute bottom-0 space-y-0.5 w-full">
                <div class="flex justify-between items-center w-full">
                  <p class="text-[8px] pb-1">starting price</p>
                  <p class="text-xs text-main font-semibold">
                    {{ i.lowest_car_price }}THB
                    <span class="text-[8px] text-black/50">/person</span>
                  </p>
                </div>
                <p
                  @click="goDetialPage(i.id)"
                  class="bg-main text-white text-xs font-medium px-3 inline-block py-1 rounded-full"
                >
                  view more
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
          </div>
          <div class="space-y-3 pb-4">
            <div class="flex justify-between items-center">
              <p class="text-sm font-semibold">choose car type</p>
              <ChevronUpIcon class="w-4 h-4" />
            </div>
            <div class="flex flex-wrap justify-start items-center gap-2 mr-5">
              <div class="" v-for="(i, index) in cars?.data" :key="index">
                <div class="flex justify-center items-center gap-1">
                  <p
                    class="border border-black/60 text-[10px] rounded-lg px-4 py-1"
                    :class="car_id == i.id ? 'bg-main text-white' : ''"
                    @click="car_id = i.id"
                  >
                    {{ i?.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-3 pb-8 pt-4">
            <div class="border border-green rounded-2xl p-3">
              <div
                class="text-green text-sm font-medium pb-2 flex justify-start items-center gap-2"
              >
                <CheckCircleIcon class="w-4 h-4 text-green" />
                <p class="text-sm">what's include</p>
              </div>
              <div
                class="flex justify-start items-center gap-2 flex-wrap text-xs text-green"
              >
                <p>12 hours of travel</p>
                <p>hotel transfer</p>
                <p>online assistant</p>
                <p>tour expenses</p>
                <p>fuel expenses</p>
                <p>experienced driver</p>
              </div>
            </div>
            <div class="border border-red rounded-2xl p-3">
              <div
                class="text-red text-sm font-medium pb-2 flex justify-start items-center gap-2"
              >
                <XCircleIcon class="w-4 h-4 text-red" />
                <p class="text-sm">what's not include</p>
              </div>
              <div
                class="flex justify-start items-center gap-2 flex-wrap text-xs text-red"
              >
                <p>personal expenses</p>
                <p>entrance tickets</p>
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
  </Layout>
</template>

<style></style>
