<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
// import { ref, watch, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useVantourStore } from "../stores/vantour";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../stores/setting";
import {
  ChevronDownIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
// const carStore = useCarStore();
const settingStore = useSettingStore();
const vantourStore = useVantourStore();
const cityStore = useCityStore();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);
const { vantours, loading } = storeToRefs(vantourStore);
// const { cars } = storeToRefs(carStore);
const { language } = storeToRefs(settingStore);

const all = ref(false);

const open = () => {
  myBottomSheet.value.open();
};

// const openBottomSheet = async () => {
//   open();
// };

const close = () => {
  myBottomSheet.value.close();
};

const filterId = ref("");
const city_name = ref("");

const filteredHotel = async () => {
  router.push({
    name: "HomeVantourResult",
    params: { id: filterId.value, name: city_name.value },
  });
  close();
};

const changePage = async (url) => {
  console.log(url);
  if (url != null) {
    await vantourStore.getChangePage(url);
  }
};

const bottomOfWindow = ref(false);
const isStickey = ref(false);

const handleScroll = () => {
  bottomOfWindow.value =
    Math.floor(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.offsetHeight - 100;

  const scrolledDown = document.documentElement.scrollTop > 250.39999389648438;
  isStickey.value = document.documentElement.scrollTop > 270;

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

const count_filter = ref(0);
// const car_id = ref("");

watch([filterId], async ([newValue]) => {
  let data = {
    city_id: newValue,
  };

  const res = await vantourStore.getFilterAction(data);
  console.log(res, "this is data");
  count_filter.value = res.meta.total;
});

const showSearch = ref(false);

const searchFunction = (data) => {
  city_name.value = data.name;
  filterId.value = data.id;
};

const vantourList = ref([]);

const goDetialPage = (id) => {
  router.push({ name: "HomeVantourDetail", params: { id: id } });
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
  window.addEventListener("scroll", handleScroll);
  let res = await vantourStore.getListAction();
  await cityStore.getSimpleListAction();
  vantourList.value = res.data;
  console.log(vantourList.value, "this is entrance list add");
  // await carStore.getSimpleListAction();
  // console.log(cars.value, "this is car");
});

watch(vantours, async (newValue) => {
  if (newValue) {
    vantourList.value = [...vantourList.value, ...newValue.data];
  }

  console.log(vantourList.value, "this is add new");
});
</script>

<template>
  <Layout>
    <HeaderHomeVue :showTitle="true">
      <div class="px-6 space-y-6">
        <div class="text-white pt-4">
          <p class="text-base font-semibold tracking-wider">
            van tour packages
          </p>
          <p class="text-xs">bangkok, pattaya, phuket, etc...</p>
        </div>
        <div class="relative" @click="router.push('/home/van-tour-search')">
          <input
            type="search"
            name=""
            placeholder=" search your vantour packages here"
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
    <div class="h-auto pb-20 pt-8 space-y-4 relative">
      <div
        :class="isStickey ? 'shadow-custom' : ''"
        class="flex justify-between items-center sticky top-0 py-2 px-6 z-10 bg-background w-full"
      >
        <h1 class="text-main font-semibold">van tours packages</h1>
        <div
          class="flex justify-end items-center gap-2 cursor-pointer"
          @click="open"
        >
          <p class="text-[10px] text-main font-semibold">filter by</p>
          <ChevronDownIcon class="w-3 h-3 text-main" />
        </div>
      </div>
      <div
        class="border border-black/10 mx-6 rounded-2xl shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
        v-for="i in vantourList"
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
              {{
                language == "english"
                  ? i.full_description_en
                  : i.long_description
              }}
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
                see {{ count_filter }} vantours
              </button>
            </div>
          </div>
        </div>
      </vue-bottom-sheet>
    </div>
  </Layout>
</template>
