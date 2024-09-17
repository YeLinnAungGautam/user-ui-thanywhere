<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import {
  ChevronLeftIcon,
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
import debounce from "lodash.debounce";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
import activitydb from "../assets/activitydb";
import { useEntranceStore } from "../stores/entrance";
import AttractionCart from "../components/LoadingCarts/AttractionCart.vue";
import LoadingImageCover from "../assets/web/loadingImageCover.jpg";
import { useSettingStore } from "../stores/setting";

const cityStore = useCityStore();
const settingStore = useSettingStore();
const entranceStore = useEntranceStore();
const router = useRouter();
const route = useRoute();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);
const { entrances, loading } = storeToRefs(entranceStore);
const { language } = storeToRefs(settingStore);

const open = () => {
  myBottomSheet.value.open();
};

const close = () => {
  myBottomSheet.value.close();
};

// const data = vantourdb;
const all = ref(false);

const filterId = ref("");
const category_id = ref("");
const city_name = ref("");

const filteredHotel = async () => {
  router.push({
    name: "HomeAttractionResult",
    params: { id: filterId.value, name: city_name.value },
    query: {
      category_id: category_id.value,
    },
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
      data = { city_id: filterId.value, category_id: category_id.value };
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

watch([filterId, category_id], async ([newValue, newSecValue]) => {
  let data = {
    city_id: newValue,
    category_id: newSecValue,
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
  router.push({
    name: "HomeAttractionDetail",
    params: { id: id },
    query: { language: language.value },
  });
};

const count = ref(0);
const search = ref("");
const searchCityName = ref("");

watch(
  search,
  debounce(async (newValue) => {
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
        category_id: category_id.value,
      });
      count.value = res.meta.total;
      entrancesList.value = res.data;
    }
  }, 500)
);

onMounted(async () => {
  // await settingStore.getLanguage();
  if (route.query.search) {
    search.value = route.query.search ? route.query.search : "";
    console.log(route.query.search);
  } else {
    filterId.value = route.params.id;
    category_id.value = route.query.category_id;
    city_name.value = route.params.name;
    searchCityName.value = route.params.name;
    window.addEventListener("scroll", handleScroll);
    let res = await entranceStore.getListAction({
      city_id: filterId.value,
      search: search.value,
      category_id: category_id.value,
    });
    count.value = res.meta.total;
    entrancesList.value = res.data;
  }

  await cityStore.getSimpleListAction();

  console.log(entrancesList.value, "this is entrance list add");
});

watch(category_id, async (newValue) => {
  if (newValue) {
    entrancesList.value = [];
    const res = await entranceStore.getListAction({
      city_id: filterId.value,
      category_id: category_id.value,
    });
    entrancesList.value = res.data;
  }
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
      <HeaderHome :showTitle="false" class="">
        <div class="flex justify-between items-center py-4 px-6">
          <ChevronLeftIcon
            class="w-6 h-6 text-white"
            @click="router.push('/home/attraction')"
          />
          <p class="text-white font-semibold">over {{ count }} attractions</p>
          <p class="opacity-0">..</p>
        </div>
        <div class="relative w-full px-6">
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
            class="w-5 h-5 absolute top-3.5 right-9 text-main"
            alt=""
          />
        </div>
      </HeaderHome>
      <div class="space-y-4 relative pb-20">
        <div
          :class="isStickey ? 'shadow-custom' : ''"
          class="mb-2 sticky top-0 py-2 px-6 z-10 bg-background w-full"
        >
          <div class="flex justify-between items-center">
            <h1
              class="text-main font-semibold"
              v-if="searchCityName != 'null' && !search"
            >
              attractions in {{ searchCityName }}
            </h1>
            <h1
              class="text-main font-semibold"
              v-if="searchCityName == 'null' && !search"
            >
              attractions
            </h1>
            <h1
              class="text-main font-semibold"
              v-if="searchCityName == 'null' && search"
            >
              '{{ search }}' search
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
          <div class="w-full">
            <div
              class="flex justify-start items-center overflow-x-scroll space-x-1.5 pt-2 scroll-container"
            >
              <p
                @click="category_id = 32"
                :class="
                  category_id == 32
                    ? 'border-main text-main'
                    : 'border-black/10'
                "
                class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
              >
                amusement park
              </p>
              <p
                @click="category_id = 40"
                :class="
                  category_id == 40
                    ? 'border-main text-main'
                    : 'border-black/10'
                "
                class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
              >
                dinner cruises
              </p>
              <p
                @click="category_id = 31"
                :class="
                  category_id == 31
                    ? 'border-main text-main'
                    : 'border-black/10'
                "
                class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
              >
                water parks
              </p>
              <p
                @click="category_id = 17"
                :class="
                  category_id == 17
                    ? 'border-main text-main'
                    : 'border-black/10'
                "
                class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
              >
                safari
              </p>
              <p
                @click="category_id = 16"
                :class="
                  category_id == 16
                    ? 'border-main text-main'
                    : 'border-black/10'
                "
                class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
              >
                museums
              </p>
              <p
                @click="category_id = 29"
                :class="
                  category_id == 29
                    ? 'border-main text-main'
                    : 'border-black/10'
                "
                class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
              >
                theme parks
              </p>
              <p
                @click="category_id = 54"
                :class="
                  category_id == 54
                    ? 'border-main text-main'
                    : 'border-black/10'
                "
                class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
              >
                buffet
              </p>
              <p
                @click="category_id = 42"
                :class="
                  category_id == 42
                    ? 'border-main text-main'
                    : 'border-black/10'
                "
                class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
              >
                island tours
              </p>
              <p
                @click="category_id = 39"
                :class="
                  category_id == 39
                    ? 'border-main text-main'
                    : 'border-black/10'
                "
                class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
              >
                shows
              </p>
              <p
                @click="category_id = 22"
                :class="
                  category_id == 22
                    ? 'border-main text-main'
                    : 'border-black/10'
                "
                class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
              >
                skywalks
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-start items-center flex-wrap gap-2 px-6">
          <p
            class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
            v-if="searchCityName != 'null' && searchCityName != ''"
          >
            {{ searchCityName }}
          </p>
        </div>
        <div
          class="border border-black/10 mx-6 rounded-2xl relative shadow-sm bg-white p-2.5"
          v-for="i in entrancesList"
          :key="i"
          @click="goDetialPage(i.id)"
        >
          <AttractionCart :i="i" />
        </div>
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
      <div class="font-poppins">
        <div class="flex justify-between items-center px-6 pb-4">
          <p class="opacity-0">........</p>
          <p class="text-main text-base">filter</p>
          <XMarkIcon class="w-5 h-5" @click="close" />
        </div>
        <div class="border border-black/10 p-4 ml-4 mr-4 rounded-xl">
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
