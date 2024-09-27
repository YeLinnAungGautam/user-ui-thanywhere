<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  XMarkIcon,
  ChevronUpIcon,
} from "@heroicons/vue/24/outline";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
// import { MapPinIcon, BuildingOffice2Icon } from "@heroicons/vue/24/solid";
import { useRouter, useRoute } from "vue-router";
import HeaderHome from "../components/layout/HeaderHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { onMounted, ref, watch, computed } from "vue";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
// import { useCarStore } from "../stores/car";
import { useSettingStore } from "../stores/setting";
import { useVantourStore } from "../stores/vantour";
import debounce from "lodash.debounce";
import VantourCart from "../components/LoadingCarts/VantourCart.vue";
import LoadingImageCover from "../assets/web/loadingImageCover.jpg";
import activitydb from "../assets/activitydb";

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
    name: "HomeVantourResult",
    params: {
      id: filterId.value,
      name: city_name.value,
    },
    query: {
      category_ids:
        chooseType.value.length > 0
          ? chooseType.value.map((item) => item.id).join(",")
          : "null",
      price_range:
        minPrice.value && maxPrice.value
          ? `${minPrice.value}-${maxPrice.value}`
          : "null",
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

const chooseType = ref([]);
const minPrice = ref("");
const maxPrice = ref("");
const handleActivitySelect = (activity) => {
  // Check if the activity with the given id already exists in the array
  const index = chooseType.value.findIndex((item) => item.id === activity.id);

  if (index !== -1) {
    // If it exists (index is not -1), remove it from the array
    chooseType.value.splice(index, 1);
  } else {
    // If it doesn't exist, add it to the array
    chooseType.value.push(activity);
  }

  console.log(chooseType.value);
};
const isActive = (activity) => {
  // Loop through each item in the chooseType.value array
  for (let index = 0; index < chooseType.value.length; index++) {
    // Check if the current item's id matches the activity's id
    if (chooseType.value[index].id === activity.id) {
      return true; // Return true if a match is found
    }
  }
  return false; // Return false if no matches are found
};

const showSearch = ref(false);

const vantoursList = ref([]);
const count = ref("");
const count_filter = ref("");
const city_name = ref("");

const goDetialPage = (id) => {
  router.push({
    name: "HomeVantourDetail",
    params: { id: id },
    query: { language: language.value },
  });
};

const searchFunction = (data) => {
  city_name.value = data.name;
  filterId.value = data.id;
};

const result_category = ref("");
const result_category_array = ref("");
const result_price_range = ref("");

const filterCount = computed(() => {
  let count = 0;
  if (route.params.id != "null" && route.params.id) {
    count++;
  }
  if (route.query.category_ids != "null" && route.query.category_ids) {
    count++;
  }
  return count;
});
onMounted(async () => {
  if (route.query.search) {
    search.value = route.query.search ? route.query.search : "";
    console.log(route.query.search);
  } else {
    filterId.value = route.params.id;
    // car_id.value = route.params.car;
    city_name.value = route.params.name;
    result_price_range.value = route.query.price_range
      ? route.query.price_range
      : "";
    result_category.value = route.query.category_ids
      ? route.query.category_ids
      : "";
    result_category_array.value =
      route.query.category_ids != "null"
        ? route.query.category_ids?.split(",")
        : [];
    let data = {
      city_id: filterId.value,
    };
    if (result_category.value != "" && result_category.value != "null") {
      data.category_ids = result_category.value;
    }
    if (result_price_range.value != "" && result_price_range.value != "null") {
      data.price_range = result_price_range.value;
    }
    let res = await vantourStore.getListAction(data);
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
      <HeaderHome :showTitle="false" class="">
        <div class="flex justify-between items-center py-4 px-6">
          <ChevronLeftIcon
            class="w-6 h-6 text-white"
            @click="router.push('/home/van-tour')"
          />
          <p class="text-white font-semibold">over {{ count }} vantours</p>
          <p class="opacity-0">..</p>
        </div>
        <div class="relative w-full px-6 pb-4">
          <input
            type="text"
            v-model="search"
            name=""
            placeholder=" search"
            class="w-full rounded-full shadow-custom-input px-6 py-4 text-xs text-main focus:outline-none"
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
          :class="isStickey ? 'shadow-custom-filter' : ''"
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
              <span class="bg-main text-white px-1 rounded-full">{{
                filterCount
              }}</span>
            </p>
            <ChevronDownIcon class="w-3 h-3 text-main" />
          </div>
        </div>
        <!-- <div class="flex justify-start items-center flex-wrap gap-2 px-6">
          <p
            class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
            v-if="searchCityName != 'null' && searchCityName != ''"
          >
            {{ searchCityName }}
          </p>
          <p
            class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
            v-if="result_price_range != 'null' && result_price_range != ''"
          >
            {{ result_price_range }}
          </p>
          <div
            v-if="result_category.length > 0"
            class="flex justify-start flex-wrap items-center gap-1"
          >
            <p
              class="bg-black/5 px-3 py-0.5 rounded-md text-[10px]"
              v-for="f in result_category_array"
              :key="f"
            >
              <span v-for="s in activitydb" :key="s">
                <span v-if="s.id == f" class="whitespace-nowrap">{{
                  s.name
                }}</span>
              </span>
            </p>
          </div>
        </div> -->
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
      <div class="font-poppins relative h-[100vh]">
        <div
          class="flex justify-between bg-white sticky top-0 shadow-custom-filter items-center px-6 pb-4"
        >
          <p class="opacity-0">........</p>
          <p class="text-main text-base">filter</p>
          <XMarkIcon class="w-5 h-5" @click="close" />
        </div>
        <div class="p-4 ml-4 mr-4 rounded-xl divide-y divide-black/10">
          <div class="space-y-3 pt-5 pb-4">
            <div class="flex justify-between items-center">
              <p class="text-base font-semibold">Choose City</p>
              <!-- <p
                class="text-black text-[10px] cursor-pointer"
                @click="all = !all"
              >
                {{ all ? "show less" : "show more" }}
              </p> -->
            </div>
            <div class="flex flex-wrap justify-start items-center gap-2">
              <div class="flex flex-wrap justify-start items-center gap-2">
                <div v-for="(c, index) in cities?.data" :key="c.id">
                  <p
                    v-if="index < 8 || all"
                    class="px-4 py-1.5 text-[12px] rounded-full"
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

          <div class="space-y-3 pb-8 pt-4">
            <p class="text-base font-semibold">Choose Activities</p>
            <div class="flex justify-start items-center gap-3 flex-wrap">
              <div
                class="space-y-1"
                v-for="(i, index) in activitydb"
                :key="index"
                @click="handleActivitySelect(i)"
              >
                <div
                  class="px-4 py-1.5 text-[12px] rounded-full"
                  :class="
                    isActive(i)
                      ? 'bg-main border font-semibold border-white  text-white'
                      : ' bg-white text-black/60 border font-semibold  border-black/10'
                  "
                >
                  {{ i.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="pt-4 pb-20">
            <p class="text-base font-semibold mb-3">choose price range</p>
            <div class="flex justify-between items-center gap-2">
              <div class="border border-black/10 w-[45%] rounded-2xl p-2">
                <p class="text-[12px]">minimum</p>
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
                <p class="text-[12px]">maximum</p>
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

          <div
            class="flex justify-center bg-white fixed bottom-0 left-0 w-full gap-4 items-center pt-4 pb-6 px-4 shadow-custom-filter-bottom-sheet"
          >
            <button
              @click="close"
              class="text-center border border-black/10 rounded-full py-3 w-[40%] text-sm text-main font-semibold"
            >
              clear
            </button>
            <button
              @click="filteredHotel"
              class="text-center border bg-main border-black/10 rounded-full py-3 w-[60%] text-sm text-white font-semibold"
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
