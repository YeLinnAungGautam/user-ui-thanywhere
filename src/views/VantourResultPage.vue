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
// import { useCarStore } from "../stores/car";
// import { useSettingStore } from "../stores/setting";
import { useVantourStore } from "../stores/vantour";
import debounce from "lodash.debounce";
import VantourCart from "../components/LoadingCarts/VantourCart.vue";
import LoadingImageCover from "../assets/web/loadingImageCover.jpg";

// const carStore = useCarStore();
const cityStore = useCityStore();
const router = useRouter();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);
// const settingStore = useSettingStore();
const vantourStore = useVantourStore();
const { vantours, loading } = storeToRefs(vantourStore);
// const { cars } = storeToRefs(carStore);
// const { language } = storeToRefs(settingStore);
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
  if (route.query.search) {
    search.value = route.query.search ? route.query.search : "";
    console.log(route.query.search);
  } else {
    filterId.value = route.params.id;
    // car_id.value = route.params.car;
    city_name.value = route.params.name;
    let res = await vantourStore.getListAction({
      city_id: filterId.value,
    });
    count.value = res.meta.total;
    vantoursList.value = res.data;
  }
  await cityStore.getSimpleListAction();
  // await carStore.getSimpleListAction();
  window.addEventListener("scroll", handleScroll);

  searchCityName.value = route.params.name;

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
      <div class="space-y-4 relative pt-6 pb-20">
        <div
          :class="isStickey ? 'shadow-custom' : ''"
          class="flex justify-between items-center mb-2 sticky top-0 py-2 px-6 z-10 bg-background w-full"
        >
          <h1
            class="text-main font-semibold"
            v-if="searchCityName != 'null' && !search"
          >
            vantours in {{ searchCityName }}
          </h1>
          <h1
            class="text-main font-semibold"
            v-if="searchCityName == 'null' && !search"
          >
            vantours packages
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
        <div class="flex justify-start items-center flex-wrap gap-2 px-6">
          <p
            class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
            v-if="searchCityName != 'null' && searchCityName != ''"
          >
            {{ searchCityName }}
          </p>
        </div>
        <div
          class="border border-black/10 rounded-2xl mx-6 shadow-sm bg-white p-2.5"
          v-for="i in vantoursList"
          :key="i"
          @click="goDetialPage(i.id)"
        >
          <VantourCart :i="i" />
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
  </Layout>
</template>

<style></style>
