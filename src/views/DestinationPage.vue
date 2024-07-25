<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { useRouter } from "vue-router";
// import { useSettingStore } from "../stores/setting";
import { useCityStore } from "../stores/city";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
// import { useDestinationStore } from "../stores/destination";
import activitydb from "../assets/activitydb";
import { useVantourStore } from "../stores/vantour";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";

const router = useRouter();
// const destinationStore = useDestinationStore();
// const settingStore = useSettingStore();
const cityStore = useCityStore();
const myBottomSheet = ref(null);
// const { dests } = storeToRefs(destinationStore);
const vantourStore = useVantourStore();
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
    name: "HomeDestinationResult",
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

// const goDetialPage = (id) => {
//   router.push({ name: "HomeVantourDetail", params: { id: id } });
// };

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
            check out destinations
          </p>
          <p class="text-xs">bangkok, pattaya, phuket, etc...</p>
        </div>
        <div class="relative" @click="router.push('/home/destination-search')">
          <input
            type="search"
            name=""
            placeholder=" where "
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
    <div class="h-auto pb-20 pt-8 space-y-4 px-6 relative">
      <div
        :class="isStickey ? 'shadow-custom' : ''"
        class="flex justify-between items-center sticky top-0 py-2 z-10 bg-background w-full"
      >
        <h1 class="text-main font-semibold">read destinations</h1>
        <div
          class="flex justify-end items-center gap-2 cursor-pointer"
          @click="open"
        >
          <p class="text-[10px] text-main font-semibold">filter by</p>
          <ChevronDownIcon class="w-3 h-3 text-main" />
        </div>
      </div>
      <div
        class="border border-black/10 rounded-2xl shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
        v-for="i in vantourList ?? []"
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe id
              labore fuga esse, nesciunt sapiente impedit odit voluptatibus
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
    </div>
  </Layout>
</template>
