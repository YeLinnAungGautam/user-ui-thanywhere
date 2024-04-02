<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { useHotelStore } from "../stores/hotel";
import Pagination from "../components/Pagination.vue";
import HotelsItemVue from "../components/HotelsItem.vue";
import { useCityStore } from "../stores/city";
import NoDataPageVue from "../components/NoDataPage.vue";

const router = useRouter();
const hotelStore = useHotelStore();
const cityStore = useCityStore();

const { hotels, hotel, loading } = storeToRefs(hotelStore);
const { cities } = storeToRefs(cityStore);

const chooseType = ref([]);
const choosePlace = ref([]);

const goRoom = (id) => {
  router.push({
    name: "room",
    params: {
      id: id,
    },
  });
};
const goBack = () => {
  router.go(-1);
};
const createPage = () => {
  router.push({ name: "hotel_create" });
};

const changePage = async (url) => {
  console.log(url);
  if (url != null) {
    console.log(watchSystem.value, "this is watch system");
    await hotelStore.getChangePage(url, watchSystem.value);
  }
};

// const addList = ref(null);

const getList = async () => {
  const res = await hotelStore.getSimpleListAction();

  for (let i = 0; i < res.data.length; i++) {
    chooseType.value.push(res.data[i].name);
  }
  for (let i = 0; i < res.data.length; i++) {
    choosePlace.value.push(res.data[i].place);
  }
};

const priceShow = ref(false);
const price = ref("");
const search = ref("");
const city_id = ref("");
const place = ref("");
const clear = () => {
  search.value = "";
  price.value = "";
  priceShow.value = false;
  city_id.value = "";
  place.value = "";
};

const changes = async (message) => {
  if ((message = "Hotel Deleted")) {
    search.value = "";
    await getList();
    await hotelStore.getListAction();
  }
};

const hotelList = ref([]);

const watchSystem = computed(() => {
  const result = {};

  if (search.value != "" && search.value != undefined) {
    result.search = search.value;
  }
  if (price.value != "" && price.value != undefined) {
    result.max_price = price.value;
  }
  if (city_id.value != "" && city_id.value != undefined) {
    result.city_id = city_id.value;
  }
  if (place.value != "" && place.value != undefined) {
    result.place = place.value;
  }
  return result;
});

// const checkHaveNextPage = () => {

// }

const handleScroll = () => {
  const bottomOfWindow =
    Math.floor(document.documentElement.scrollTop + window.innerHeight) ===
    document.documentElement.offsetHeight;

  if (bottomOfWindow) {
    console.log("This is the bottom of the window");
    // console.log(hotels?.value.meta.current_page, "this is hotel");
    if (hotels?.value?.meta?.current_page < hotels?.value?.meta?.last_page) {
      changePage(
        hotels?.value?.meta?.links[hotels?.value?.meta?.current_page + 1].url
      );
    }
  }

  const scrolledDown = document.documentElement.scrollTop > 250.39999389648438;
  // console.log(document.documentElement.scrollTop, "this is top");
  if (scrolledDown) {
    showSearch.value = true;
  } else {
    showSearch.value = false;
  }
};

const showSearch = ref(false);

const searchActionButton = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  let res = await hotelStore.getListAction();
  hotelList.value = res.data;
  console.log(hotelList.value, "this is hotel list add");
  await cityStore.getSimpleListAction();
  await getList();
});

const searchAction = async () => {
  console.log(watchSystem.value, "this is watch");
  const res = await hotelStore.getListAction(watchSystem.value);
  hotelList.value = res.data;
};

watch(search, async (newValue) => {
  hotelList.value = [];
  await searchAction();
});
watch(price, async (newValue) => {
  hotelList.value = [];
  await searchAction();
});
watch(city_id, async (newValue) => {
  hotelList.value = [];
  await searchAction();
});
watch(place, async (newValue) => {
  hotelList.value = [];
  await searchAction();
});

// infinite loop
watch(hotels, async (newValue) => {
  hotelList.value = [...hotelList.value, ...newValue.data];

  console.log(hotelList.value, "this is add new");
});
</script>

<template>
  <div class="bg-white">
    <NavbarVue />
    <div class="py-5 px-4 space-y-4 relative">
      <div class="relative">
        <div
          class="flex justify-start items-center gap-2 text-main absolute top-0 text-sm"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </div>

        <p class="text-main text-lg font-semibold w-full text-center">Hotels</p>
      </div>
      <div
        class="bg-main/5 py-2 pl-3 pr-2 rounded-xl flex justify-between items-center shadow"
      >
        <div class="mr-2" @click="clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="!search && !price && !city_id && !place"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-main"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <img
            v-if="search || price || city_id || place"
            src="../../public/clear-svgrepo-com (1).svg"
            class="w-6 h-6"
            alt=""
          />
          <!-- <p class="text-main">Search</p> -->
        </div>
        <v-select
          class="style-chooser w-full"
          :options="chooseType"
          v-model="search"
          label="name"
          :clearable="false"
          :reduce="(d) => d"
          placeholder="Search"
        ></v-select>
        <!-- @option:selected="chooseName()" -->
      </div>
      <div class="flex py-1.5 mb-5 gap-3 flex-wrap">
        <v-select
          class="style-chooser bg-white rounded-xl border border-main min-w-[100px]"
          :options="cities?.data"
          label="name"
          v-model="city_id"
          :clearable="false"
          :reduce="(d) => d.id"
          placeholder="City"
        ></v-select>
        <v-select
          class="style-chooser bg-white rounded-xl border border-main min-w-[100px]"
          :options="choosePlace"
          label="name"
          v-model="place"
          :clearable="false"
          :reduce="(d) => d"
          placeholder="Place"
        ></v-select>

        <div class="text-sm flex justify-center items-center gap-2">
          <input
            type="number"
            v-model="price"
            class="bg-white text-xs focus:ring-0 text-main border-main rounded-xl px-4 py-2 border max-w-[100px]"
            placeholder="max_price"
          />
        </div>
      </div>
      <div
        class="pb-3 pt-4 px-4 flex justify-end text-main font-semibold border-b border-b-black/20 bg-white sticky -top-1 z-20"
        v-if="showSearch"
        @click="searchActionButton"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        search
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5">
        <!-- !loading -->
        <div v-for="(hotel, index) in hotelList" :key="index">
          <HotelsItemVue :id="hotel.id" :hotels="hotel" @change="changes" />
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 pb-5 pt-2"
      >
        <!-- !loading -->
        <div
          class="space-y-2 col-span-1 md:col-span-2"
          v-if="hotelList?.length == 0"
        >
          <NoDataPageVue />
        </div>
      </div>
      <div
        class="relative flex justify-center items-center py-[30%]"
        v-if="loading"
      >
        <div
          class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-main"
        ></div>
        <img src="../../public/logo.jpg" class="rounded-full h-16 w-16" />
      </div>
      <!-- <div>
        <Pagination v-if="!loading" :data="hotels" @change-page="changePage" />
      </div> -->
    </div>
  </div>
</template>

<style></style>
