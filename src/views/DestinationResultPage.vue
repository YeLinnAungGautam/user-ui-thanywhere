<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import activitydb from "../assets/activitydb";
// import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/vue/24/solid";
import { useRouter, useRoute } from "vue-router";
import HeaderHome from "../components/layout/HeaderHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { onMounted, ref, watch } from "vue";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
// import { useCarStore } from "../stores/car";
import { useSettingStore } from "../stores/setting";
import { useVantourStore } from "../stores/vantour";
import debounce from "lodash.debounce";

// const carStore = useCarStore();
const cityStore = useCityStore();
const router = useRouter();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);
const settingStore = useSettingStore();
const vantourStore = useVantourStore();
const { vantours, loading } = storeToRefs(vantourStore);
// const { cars } = storeToRefs(carStore);
const { language } = storeToRefs(settingStore);
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
    name: "HomeDestinationResult",
    params: {
      id: filterId.value,
      name: city_name.value,
    },
  });
  close();
  setTimeout(() => {
    window.location.reload();
  }, 1000); // 2000 milliseconds = 2 seconds
};

// const data = stayinbangkok;
// const car_id = ref("");
const search = ref("");
const searchCityName = ref("");

const all = ref(false);

const changePage = async (url) => {
  console.log(url);
  if (url != null) {
    await vantourStore.getChangePage(url, {
      city_id: filterId.value,
    });
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
  // car_id.value = route.params.car;
  city_name.value = route.params.name;
  await cityStore.getSimpleListAction();
  // await carStore.getSimpleListAction();
  window.addEventListener("scroll", handleScroll);
  let res = await vantourStore.getListAction({
    city_id: filterId.value,
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

watch([filterId], async ([newValue]) => {
  let data = {
    city_id: newValue,
  };

  const res = await vantourStore.getFilterAction(data);
  console.log(data, "this is data");
  count_filter.value = res.meta.total;
});

watch(
  search,
  debounce(async (newValue) => {
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
  }, 500)
);
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
          <p class="text-white font-semibold">over {{ count }} destinations</p>
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
            destinations in {{ searchCityName }}
          </h1>
          <h1 class="text-main font-semibold" v-if="searchCityName == 'null'">
            destinations
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
          class="border border-black/10 rounded-2xl mx-4 shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
          v-for="i in vantoursList ?? []"
          :key="i"
        >
          <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div class="col-span-6 relative">
            <div class="overflow-hidden space-y-1">
              <div>
                <p class="text-xs font-semibold text-main pr-4">
                  bangkok day trip 1
                </p>
                <!-- <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" /> -->
              </div>
              <div class="flex justify-start gap-1 flex-wrap items-center">
                <p
                  class="whitespace-nowrap bg-black/10 text-[8px] px-1 py-0.5 rounded-md text-black/70"
                  v-for="a in 2"
                  :key="a"
                >
                  bangkok
                </p>
              </div>
              <p class="text-[8px] h-[70px] overflow-hidden">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                id labore fuga esse, nesciunt sapiente impedit odit voluptatibus
                molestiae, consequuntur deleniti, magni quasi expedita velit
                tenetur cum dolorum minus libero!
              </p>
              <div class="absolute bottom-0 space-y-0.5">
                <!-- <p class="text-[10px] pb-1">starting price</p> -->
                <p
                  class="bg-main text-white text-xs font-medium px-3 inline-block py-1 rounded-full"
                >
                  read details
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

          <div class="space-y-3 pb-8 pt-4">
            <div class="pb-10 space-y-4">
              <p class="text-sm font-semibold">select activities type</p>
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
              see {{ count_filter }} vantours
            </button>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </Layout>
</template>

<style></style>
