<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import AttractionSearchHome from "../components/search-part/AttractionSearchHome.vue";
import { useRouter } from "vue-router";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { useEntranceStore } from "../stores/entrance";
import { useCityStore } from "../stores/city";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
// import activitydb from "../assets/activitydb";
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
    query: {
      category_id: category_id.value,
    },
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
    category_id: category_id.value,
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

const category_id = ref("");
// const list = ref([]);

watch(category_id, async () => {
  entrancesList.value = [];
  const res = await entranceStore.getListAction({
    category_id: category_id.value,
  });
  entrancesList.value = res.data;
});

onMounted(async () => {
  await settingStore.getLanguage();
  window.addEventListener("scroll", handleScroll);
  let res = await entranceStore.getListAction({
    category_id: category_id.value,
  });
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
        <!-- <div
          class="relative rounded-full pb-4"
          @click="router.push('/home/attraction-search')"
        >
          <input
            type="search"
            name=""
            placeholder=" where would you like to travel"
            class="w-full shadow-custom-input rounded-full px-6 py-4 text-xs text-main focus:outline-none"
            id=""
          />

          <img
            :src="searchIcon"
            class="w-5 h-5 absolute top-3.5 right-5 text-main"
            alt=""
          />
        </div> -->
        <AttractionSearchHome />
      </div>
    </HeaderHomeVue>
    <div class="h-auto pb-20 z-20 space-y-4 relative">
      <div
        :class="isStickey ? 'shadow-custom-filter' : ''"
        class="sticky top-0 pt-2 px-6 space-y-2 z-10 bg-background w-full pb-4"
      >
        <div class="flex justify-between items-center">
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
        <div class="w-full">
          <div
            class="flex justify-start items-center overflow-x-scroll space-x-1.5 pt-2 scroll-container"
          >
            <p
              @click="category_id = ''"
              :class="
                category_id == '' ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              all
            </p>
            <p
              @click="category_id = 32"
              :class="
                category_id == 32 ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              amusement park
            </p>
            <p
              @click="category_id = 40"
              :class="
                category_id == 40 ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              dinner cruises
            </p>
            <p
              @click="category_id = 31"
              :class="
                category_id == 31 ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              water parks
            </p>
            <p
              @click="category_id = 17"
              :class="
                category_id == 17 ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              safari
            </p>
            <p
              @click="category_id = 16"
              :class="
                category_id == 16 ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              museums
            </p>
            <p
              @click="category_id = 29"
              :class="
                category_id == 29 ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              theme parks
            </p>
            <p
              @click="category_id = 54"
              :class="
                category_id == 54 ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              buffet
            </p>
            <p
              @click="category_id = 42"
              :class="
                category_id == 42 ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              island tours
            </p>
            <p
              @click="category_id = 39"
              :class="
                category_id == 39 ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              shows
            </p>
            <p
              @click="category_id = 22"
              :class="
                category_id == 22 ? 'border-main text-main' : 'border-black/10'
              "
              class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
            >
              skywalks
            </p>
          </div>
        </div>
      </div>
      <div class="space-y-4 divide-y-8 divide-black/5">
        <div
          class="bg-background"
          v-for="(i, index) in entrancesList"
          :key="index"
          :class="index != 0 ? 'pt-6' : ''"
          @click="goDetialPage(i.id)"
        >
          <AttractionCart :i="i" />
        </div>
      </div>
      <div v-if="loading" class="space-y-4">
        <div v-for="a in 8" :key="a" class="mx-6 rounded-2xl pb-2.5">
          <div class="grid grid-cols-11 gap-6">
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
        <div class="font-poppins h-[100vh]">
          <div
            class="flex justify-between items-center shadow-custom-filter px-6 pb-4"
          >
            <p class="opacity-0">........</p>
            <p class="text-main font-medium text-base">Filter</p>
            <XMarkIcon class="w-5 h-5" @click="close" />
          </div>
          <div
            class="p-4 ml-4 mr-4 relative divide-y divide-black/10 rounded-xl"
          >
            <div class="space-y-3 pb-6 pt-4">
              <div class="flex justify-between items-center">
                <p class="text-base font-semibold">Choose City</p>
              </div>
              <div class="flex flex-wrap justify-start items-center gap-2">
                <div v-for="(c, index) in cities?.data" :key="c.id">
                  <p
                    v-if="index < 8 || all"
                    class="border border-black/10 text-[12px] rounded-full px-4 py-1.5"
                    :class="
                      filterId == c.id
                        ? 'bg-main border font-semibold border-white  text-white'
                        : 'bg-white text-black/60 border font-semibold  border-black/10'
                    "
                    @click="searchFunction(c)"
                  >
                    {{ c?.name }}
                  </p>
                </div>
              </div>
              <!-- <p
                class="text-black text-[10px] w-full border border-black/10 bg-black/10 py-1.5 rounded-full text-center cursor-pointer flex justify-center items-center gap-x-1"
                @click="all = !all"
              >
                {{ all ? "show less" : "show more" }}
                <ChevronDownIcon class="w-4 h-4" v-if="!all" />
                <ChevronUpIcon class="w-4 h-4" v-if="all" />
              </p> -->
              <p
                @click="all = !all"
                class="font-semibold text-main text-[10px] rounded-xl px-2 flex justify-start items-center gap-1 py-0.5"
              >
                {{ all ? "see less" : "see more" }}
                <ChevronUpIcon class="w-3 h-3" />
              </p>
            </div>
            <div class="space-y-3 pb-20 pt-5">
              <p class="text-base font-semibold">Choose Activities</p>
              <div class="w-full">
                <div
                  class="flex justify-start items-center space-x-2 flex-wrap space-y-2"
                >
                  <p
                    @click="category_id = ''"
                    :class="
                      category_id == ''
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    all
                  </p>
                  <p
                    @click="category_id = 32"
                    :class="
                      category_id == 32
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    amusement park
                  </p>
                  <p
                    @click="category_id = 40"
                    :class="
                      category_id == 40
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    dinner cruises
                  </p>
                  <p
                    @click="category_id = 31"
                    :class="
                      category_id == 31
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    water parks
                  </p>
                  <p
                    @click="category_id = 17"
                    :class="
                      category_id == 17
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    safari
                  </p>
                  <p
                    @click="category_id = 16"
                    :class="
                      category_id == 16
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    museums
                  </p>
                  <p
                    @click="category_id = 29"
                    :class="
                      category_id == 29
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    theme parks
                  </p>
                  <p
                    @click="category_id = 54"
                    :class="
                      category_id == 54
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    buffet
                  </p>
                  <p
                    @click="category_id = 42"
                    :class="
                      category_id == 42
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    island tours
                  </p>
                  <p
                    @click="category_id = 39"
                    :class="
                      category_id == 39
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    shows
                  </p>
                  <p
                    @click="category_id = 22"
                    :class="
                      category_id == 22
                        ? 'border-main bg-main text-white'
                        : 'border-black/10'
                    "
                    class="whitespace-nowrap px-3 py-1.5 text-[12px] border border-black/10 rounded-full"
                  >
                    skywalks
                  </p>
                </div>
              </div>
            </div>

            <div
              class="flex justify-between fixed w-full overflow-scrol scroll-container shadow-custom-filter-bottom-sheet bg-white px-4 bottom-0 left-0 gap-4 items-center py-4 border border-black/10"
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
                see {{ count_filter }} entrances
              </button>
            </div>
          </div>
        </div>
      </vue-bottom-sheet>
    </div>
  </Layout>
</template>
