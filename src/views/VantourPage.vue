<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
// import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import VantourSearchHomeVue from "../components/search-part/VantourSearchHome.vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
// import { ref, watch, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useVantourStore } from "../stores/vantour";
import activitydb from "../assets/activitydb";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
import VantourCart from "../components/LoadingCarts/VantourCart.vue";
import LoadingImageCover from "../assets/web/loadingImageCover.jpg";
// import { useSettingStore } from "../stores/setting";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
// const carStore = useCarStore();
// const settingStore = useSettingStore();
const vantourStore = useVantourStore();
const cityStore = useCityStore();
const myBottomSheet = ref(null);
const { cities } = storeToRefs(cityStore);
const { vantours, loading } = storeToRefs(vantourStore);
// const { cars } = storeToRefs(carStore);
// const { language } = storeToRefs(settingStore);

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
  isStickey.value = document.documentElement.scrollTop > 428;

  if (scrolledDown) {
    showSearch.value = true;
  } else {
    showSearch.value = false;
  }
};

const chooseType = ref([]);
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

const destsList = ref([]);

const goDetialPage = (id) => {
  router.push({ name: "HomeVantourDetail", params: { id: id } });
};

const minPrice = ref("");
const maxPrice = ref("");

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
  destsList.value = res.data;
  console.log(destsList.value, "this is entrance list add");
  // await carStore.getSimpleListAction();
  // console.log(cars.value, "this is car");
});

watch(vantours, async (newValue) => {
  if (newValue) {
    destsList.value = [...destsList.value, ...newValue.data];
  }

  console.log(destsList.value, "this is add new");
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
        <!-- <div class="relative" @click="router.push('/home/van-tour-search')">
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
        </div> -->
        <VantourSearchHomeVue />
      </div>
    </HeaderHomeVue>
    <div class="h-auto pb-20 z-20 space-y-4 relative">
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
        class="border border-black/10 mx-6 rounded-2xl shadow-sm bg-white p-2.5"
        v-for="i in destsList"
        :key="i"
        @click="goDetialPage(i.id)"
      >
        <!-- add cart -->
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
      <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
        <div class="font-poppins relative">
          <div class="flex justify-between items-center px-6 pb-4">
            <p class="opacity-0">........</p>
            <p class="text-main text-base">filter</p>
            <XMarkIcon class="w-5 h-5" @click="close" />
          </div>
          <div class="border border-black/10 p-4 ml-4 mr-4 rounded-xl">
            <div class="space-y-3">
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
                      class="px-4 py-1.5 text-[10px] rounded-full"
                      :class="
                        filterId == c.id
                          ? 'bg-main border font-semibold border-white  text-white'
                          : 'bg-white text-black/80 border font-semibold  border-black/10'
                      "
                      @click="searchFunction(c)"
                    >
                      {{ c?.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-3 pb-8 pt-4 h-[400px]">
              <p class="text-sm font-semibold">choose activities</p>
              <div class="flex justify-start items-center gap-3 flex-wrap">
                <div
                  class="space-y-1"
                  v-for="(i, index) in activitydb"
                  :key="index"
                  @click="handleActivitySelect(i)"
                >
                  <div
                    class="px-4 py-1.5 text-[10px] rounded-full"
                    :class="
                      isActive(i)
                        ? 'bg-main border font-semibold border-white  text-white'
                        : ' bg-white text-black/80 border font-semibold  border-black/10'
                    "
                  >
                    {{ i.name }}
                  </div>
                </div>
              </div>
              <div class="pt-4">
                <p class="text-sm font-semibold mb-3">choose price range</p>
                <div class="flex justify-between items-center gap-2">
                  <!-- <p class="text-xs text-black text-center">
                    {{ minPrice }} THB - {{ maxPrice }} THB
                  </p> -->
                  <div class="border border-black/50 w-[45%] rounded-lg p-2">
                    <p class="text-[10px]">minimum</p>
                    <input
                      type="number"
                      name=""
                      v-model="minPrice"
                      class="outline-none focus:outline-none ring-0 w-full"
                      id=""
                    />
                  </div>
                  <p class="font-semibold h-0.5 w-[5%] bg-black/50"></p>
                  <div class="border border-black/50 w-[45%] rounded-lg p-2">
                    <p class="text-[10px]">maximum</p>
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
            </div>
          </div>
          <div
            class="flex sticky bottom-0 w-full z-20 bg-white justify-between gap-4 px-4 items-center py-4"
          >
            <div class="flex justify-between w-full gap-4 items-center pt-4">
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
