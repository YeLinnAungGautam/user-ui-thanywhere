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
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/outline";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import Modal from "../components/Modal.vue";

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
  const res = await hotelStore.getSimpleListAction({ city_id: city_id.value });

  for (let i = 0; i < res.data.length; i++) {
    chooseType.value.push(res.data[i].name);
  }
  choosePlace.value = [];
  for (let i = 0; i < res.data.length; i++) {
    // choosePlace.value.push(res.data[i].place);
    const place = res.data[i].place;
    if (!choosePlace.value.find((item) => item === place)) {
      choosePlace.value.push(place);
    }
  }
  console.log(res.data, "this is get");
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

const bottomOfWindow = ref(false);

const handleScroll = () => {
  bottomOfWindow.value =
    Math.floor(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.offsetHeight - 100;

  const scrolledDown = document.documentElement.scrollTop > 250.39999389648438;
  // console.log(document.documentElement.scrollTop, "this is top");
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
      if (hotels?.value?.meta?.current_page < hotels?.value?.meta?.last_page) {
        changePageCalled = true; // Set the flag to true
        changePage(
          hotels?.value?.meta?.links[hotels?.value?.meta?.current_page + 1].url
        );
      }
    }
  }
});

const showSearch = ref(false);

const searchActionButton = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const createModalOpen = ref(false);

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
  await getList();
});
watch(place, async (newValue) => {
  hotelList.value = [];
  await searchAction();
});

// infinite loop
watch(hotels, async (newValue) => {
  if (newValue) {
    hotelList.value = [...hotelList.value, ...newValue.data];
  }

  console.log(hotelList.value, "this is add new");
});
</script>

<template>
  <div class="bg-white">
    <NavbarVue />
    <div class="py-5 px-4 space-y-4 relative">
      <div class="flex justify-between items-center gap-2">
        <div
          class="bg-white w-[82%] py-3 text-sm text-main pl-4 pr-2 rounded-full flex justify-between items-center css__box__generated"
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
            placeholder="Search for Hotels"
          ></v-select>
          <!-- @option:selected="chooseName()" -->
        </div>
        <div
          class="w-10 h-10 p-2 border border-main flex justify-center items-center rounded-full"
          @click="createModalOpen = true"
        >
          <AdjustmentsHorizontalIcon class="w-7 h-7 text-main" />
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full border-b border-b-black/10">
          <div class="flex pb-2 space-x-2 overflow-x-scroll">
            <p
              class="bg-white px-2 py-1 text-xs text-main"
              :class="
                city_id == '' ? 'border-b-2 border-b-main font-semibold' : ''
              "
              @click="city_id = ''"
            >
              All
            </p>
            <p
              class="bg-white px-2 py-1 text-xs text-main whitespace-nowrap"
              :class="
                city_id == c.id ? 'border-b-2 border-b-main font-semibold' : ''
              "
              v-for="c in cities?.data"
              :key="c.id"
              @click="city_id = c.id"
            >
              {{ c.name }}
            </p>
          </div>
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-5">
        <!-- !loading -->
        <div v-for="(hotel, index) in hotelList" :key="index">
          <HotelsItemVue :id="hotel.id" :hotels="hotel" @change="changes" />
        </div>
      </div>
      <!-- <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 pb-5 pt-2"
      >
        
        <div
          class="space-y-2 col-span-1 md:col-span-2"
          v-if="hotelList?.length == 0"
        >
          <NoDataPageVue />
        </div>
      </div> -->
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
    <Modal :isOpen="createModalOpen" @closeModal="createModalOpen = false">
      <DialogPanel
        class="w-full max-w-md p-4 font-poppins text-left align-middle transition-all transform bg-white rounded-lg shadow-xl"
      >
        <DialogTitle
          as="h3"
          class="mb-5 text-base font-medium leading-6 text-main"
        >
          Search
        </DialogTitle>
        <div class="space-y-4 mb-3">
          <div class="text-sm gap-2 w-full text-main space-y-4">
            <p class=" ">Max Price</p>
            <div
              class="flex justify-between items-center bg-main text-xs text-main border-main rounded-full border pr-2 shadow"
            >
              <input
                type="number"
                v-model="price"
                class="bg-white text-xs focus:ring-0 focus:outline-none text-main border-main rounded-full px-4 w-[80%] py-3 border"
                placeholder="eg : 100 THB"
              />
              <p class="text-white px-2 text-lg font-semibold">THB</p>
            </div>
          </div>
          <div></div>
          <div class="text-sm gap-2 w-full text-main space-y-4">
            <p class=" ">City</p>
            <v-select
              class="style-chooser bg-white rounded-full border-2 px-4 py-1.5 border-main min-w-[100px] shadow"
              :options="cities?.data"
              label="name"
              v-model="city_id"
              :clearable="false"
              :reduce="(d) => d.id"
              placeholder="Choose City"
            ></v-select>
          </div>
          <div class="text-sm gap-2 w-full text-main space-y-4">
            <p class=" ">Place</p>
            <v-select
              class="style-chooser bg-white rounded-full border-2 px-4 py-1.5 border-main min-w-[100px] shadow"
              :options="choosePlace"
              label="name"
              v-model="place"
              :clearable="false"
              :reduce="(d) => d"
              placeholder="Place Search"
            ></v-select>
          </div>
        </div>
      </DialogPanel>
    </Modal>
  </div>
</template>

<style></style>
