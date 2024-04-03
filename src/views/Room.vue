<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import RoomsItemVue from "../components/RoomsItem.vue";
import { useHotelStore } from "../stores/hotel";
import { useRoomStore } from "../stores/room";
import NoDataPage from "../components/NoDataPage.vue";
import Pagination from "../components/Pagination.vue";

const router = useRouter();
const route = useRoute();
const hotelStore = useHotelStore();
const roomStore = useRoomStore();

const name = ref("kaung");

const { hotel } = storeToRefs(hotelStore);
const { rooms, loading } = storeToRefs(roomStore);

const chooseType = ref([
  { id: 1, name: "low_to_high" },
  { id: 2, name: "high_to_low" },
]);
const order_by_price = ref("");

const hotel_id = ref("");
const hotel_name = ref("");

const createPage = () => {
  router.push({
    name: "room_create",
  });
};

const goBack = () => {
  router.go(-1);
};

const start_date = ref("");
const end_date = ref("");
const date = ref("");
const periodAjj = ref("");

const searchFunction = () => {
  console.log(date.value);
  let first = date.value[0];
  let second = date.value[1];
  // console.log(dateFormat(first), "this is date", dateFormat(second));
  periodAjj.value = `${dateFormat(first)} , ${dateFormat(second)}`;
};

const dateFormat = (inputDateString) => {
  if (inputDateString != null) {
    const inputDate = new Date(inputDateString);

    // Get the year, month, and day components
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(inputDate.getDate()).padStart(2, "0");

    // Format the date in "YYYY-MM-DD" format
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  } else {
    return null;
  }
};

const clear = () => {
  hotel_id.value = "";
  hotel_name.value = "";
  order_by_price.value = "";
  date.value = "";
  periodAjj.value = "";
};
const watchSystem = computed(() => {
  const result = {};

  if (hotel_id.value != "" && hotel_id.value != undefined) {
    result.hotel_id = hotel_id.value;
  }
  if (order_by_price.value != "" && order_by_price.value != undefined) {
    result.order_by_price = order_by_price.value;
  }
  if (periodAjj.value != "" && periodAjj.value != undefined) {
    result.period = periodAjj.value;
  }
  return result;
});

const changePage = async (url) => {
  console.log(url);
  if (url != null) {
    await roomStore.getChangePage(url, watchSystem.value);
  }
};

const changes = async (message) => {
  if ((message = "Room Deleted")) {
    hotel_id.value = "";
  }
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  hotel_id.value = route.params.id;
  hotel_name.value = route.params.name;
  await hotelStore.getSimpleListAction();
  // await roomStore.getListAction();
  // roomList.value = rooms?.value.data;
  // console.log(route.params.id, hotels.value, "this is params id");
});

const searchAction = async () => {
  console.log(watchSystem.value);
  let res = await roomStore.getListAction(watchSystem.value);
  roomList.value = res.data;
};

watch(hotel_id, async (newValue) => {
  roomList.value = [];
  await searchAction();
});
watch(order_by_price, async (newValue) => {
  roomList.value = [];

  await searchAction();
});
watch(date, async (newValue) => {
  roomList.value = [];
  searchFunction();
  await searchAction();
});

// infinite scrolling

const roomList = ref([]);
const showSearch = ref(false);
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
  if (bottomOfWindow.value) {
    let changePageCalled = false;
    if (newVal && !changePageCalled) {
      console.log("This is the bottom of the window");
      if (rooms?.value?.meta?.current_page < rooms?.value?.meta?.last_page) {
        changePage(
          rooms?.value?.meta?.links[rooms?.value?.meta?.current_page + 1].url
        );
      }
    }
  }
});

watch(rooms, async (newValue) => {
  roomList.value = [...roomList.value, ...newValue.data];
});

const searchActionButton = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <div class="bg-white">
    <NavbarVue />
    <div class="py-5 px-4 space-y-4">
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

        <p class="text-main text-lg font-semibold w-full text-center">Rooms</p>
      </div>
      <div
        class="bg-main/5 py-2 pl-3 pr-2 rounded-xl shadow flex justify-between items-center"
      >
        <div class="mr-2" @click="clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="
              !hotel_id &&
              !order_by_price &&
              !start_date &&
              !end_date &&
              !periodAjj
            "
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
            v-if="
              hotel_id || order_by_price || start_date || end_date || periodAjj
            "
            src="../../public/clear-svgrepo-com (1).svg"
            class="w-6 h-6"
            alt=""
          />
          <!-- <p class="text-main">Search</p> -->
        </div>
        <p
          v-if="hotel_name"
          class="text-start ml-2 py-1 text-base text-main w-full"
        >
          {{ hotel_name }}
        </p>
        <v-select
          v-if="!hotel_name"
          class="style-chooser w-full"
          :options="hotel?.data"
          v-model="hotel_id"
          label="name"
          :clearable="false"
          :reduce="(d) => d.id"
          placeholder="Search"
        ></v-select>
      </div>
      <div class="flex py-1.5 mb-5 gap-3 flex-wrap">
        <v-select
          class="style-chooser bg-white rounded-xl py-1 border border-main min-w-[100px]"
          :options="chooseType"
          v-model="order_by_price"
          label="name"
          :clearable="false"
          :reduce="(d) => d.name"
          placeholder="Sort"
        ></v-select>

        <div class="w-[220px]">
          <VueDatePicker
            v-model="date"
            range
            :format="'yyyy-MM-dd'"
            placeholder=" select date range"
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 pt-2">
        <div class="space-y-2" v-for="(room, index) in roomList" :key="index">
          <RoomsItemVue :id="room.id" :rooms="room" @change="changes" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 pt-2">
        <div
          class="space-y-2 col-span-1 md:col-span-2"
          v-if="roomList?.length == 0"
        >
          <NoDataPage />
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
        <Pagination v-if="!loading" :data="rooms" @change-page="changePage" />
      </div> -->
    </div>
  </div>
</template>

<style></style>
