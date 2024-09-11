<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { useRouter } from "vue-router";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useEntranceStore } from "../stores/entrance";
import { useCityStore } from "../stores/city";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import activitydb from "../assets/activitydb";
import AttractionCart from "../components/LoadingCarts/AttractionCart.vue";
import LoadingImageCover from "../assets/web/loadingImageCover.jpg";
import { useSettingStore } from "../stores/setting";

// const data = vantourdb;

const router = useRouter();
const settingStore = useSettingStore();
const entranceStore = useEntranceStore();
const cityStore = useCityStore();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);
const { language } = storeToRefs(settingStore);

const all = ref(false);

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

const filteredHotel = async () => {
  router.push({
    name: "HomeAttractionResult",
    params: { id: filterId.value, name: city_name.value },
  });
  close();
};

const { entrances, loading } = storeToRefs(entranceStore);

const changePage = async (url) => {
  if (url != null) {
    await entranceStore.getChangePage(url);
  }
};

const bottomOfWindow = ref(false);
const isStickey = ref(false);

const handleScroll = () => {
  bottomOfWindow.value =
    Math.floor(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.offsetHeight - 100;

  const scrolledDown = document.documentElement.scrollTop > 250.39999389648438;
  isStickey.value = document.documentElement.scrollTop > 265;

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
  router.push({
    name: "HomeAttractionDetail",
    params: { id: id },
    query: { language: language.value },
  });
};

// const getRange = (data) => {
//   // console.log(data);
//   router.push({
//     name: "HomeAttractionResult",
//     params: { id: 2, name: "Bangkok" },
//   });
// };
//  activitydb = activitydb;

onMounted(async () => {
  await settingStore.getLanguage();
  window.addEventListener("scroll", handleScroll);
  let res = await entranceStore.getListAction();
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
    <HeaderHomeVue :showTitle="true">
      <div class="px-6 space-y-6">
        <div class="text-white pt-4">
          <p class="text-base font-semibold tracking-wider">
            attraction tickets
          </p>
          <p class="text-xs">bangkok, pattaya, phuket, etc...</p>
        </div>
        <div class="relative" @click="router.push('/home/attraction-search')">
          <input
            type="search"
            name=""
            placeholder=" where would you like to travel"
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
    <div class="h-auto pb-20 z-20 space-y-4 relative">
      <div
        :class="isStickey ? 'shadow-custom' : ''"
        class="flex justify-between items-center sticky top-0 py-2 px-6 z-10 bg-background w-full"
      >
        <h1 class="text-main font-semibold">attractions</h1>
        <div class="flex justify-end items-center gap-4">
          <div
            class="flex justify-end items-center gap-2 cursor-pointer"
            @click="openBottomSheet"
          >
            <p class="text-[10px] text-main font-semibold">filter by</p>
            <ChevronDownIcon class="w-3 h-3 text-main" />
          </div>
        </div>
      </div>
      <div
        class="border border-black/10 mx-6 rounded-2xl shadow-sm relative bg-white p-2.5"
        v-for="i in entrancesList"
        :key="i"
        @click="goDetialPage(i.id)"
      >
        <!-- add cart -->
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
      <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
        <div class="font-poppins">
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
                    class="border border-black/60 text-[10px] rounded-lg px-4 py-1"
                    :class="filterId == c.id ? 'bg-main text-white' : ''"
                    @click="searchFunction(c)"
                  >
                    {{ c?.name }}
                  </p>
                </div>
              </div>
            </div>
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
                see {{ count_filter }} entrances
              </button>
            </div>
          </div>
        </div>
      </vue-bottom-sheet>
    </div>
  </Layout>
</template>
