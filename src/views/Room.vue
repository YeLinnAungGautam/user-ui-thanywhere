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

const { hotel } = storeToRefs(hotelStore);
const { rooms, loading } = storeToRefs(roomStore);

const chooseType = ref([
  { id: 1, name: "low_to_high" },
  { id: 2, name: "high_to_low" },
]);
const order_by_price = ref("");

const hotel_id = ref("");
const hotel_name = ref("");

// const goRoom = () => {
//   router.push({
//     name: "home",
//   });
// };

const createPage = () => {
  router.push({
    name: "room_create",
  });
};

const goBack = () => {
  router.go(-1);
};

const clear = () => {
  hotel_id.value = "";
  hotel_name.value = "";
  order_by_price.value = "";
};
const watchSystem = computed(() => {
  const result = {};

  if (hotel_id.value != "" && hotel_id.value != undefined) {
    result.hotel_id = hotel_id.value;
  }
  if (order_by_price.value != "" && order_by_price.value != undefined) {
    result.order_by_price = order_by_price.value;
  }
  return result;
});

const changePage = async (url) => {
  console.log(url);
  await roomStore.getChangePage(url, watchSystem.value);
};

const changes = async (message) => {
  if ((message = "Room Deleted")) {
    hotel_id.value = "";
  }
};

onMounted(async () => {
  hotel_id.value = route.params.id;
  hotel_name.value = route.params.name;
  await hotelStore.getSimpleListAction();
  // await roomStore.getListAction();
  // console.log(route.params.id, hotels.value, "this is params id");
});

watch(hotel_id, async (newValue) => {
  await roomStore.getListAction(watchSystem.value);
  console.log(hotel_id.value);
});
watch(order_by_price, async (newValue) => {
  await roomStore.getListAction(watchSystem.value);
  console.log(order_by_price.value);
});
</script>

<template>
  <div class="bg-white">
    <NavbarVue />
    <div class="py-5 px-4 space-y-4">
      <div class="relative">
        <div
          class="flex justify-start items-center gap-2 text-main absolute top-1"
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
        <div
          class="bg-main text-white p-2 rounded-full absolute top-[-5px] right-0"
          @click="createPage"
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
              d="M12 6v12m6-6H6"
            />
          </svg>
        </div>
        <p class="text-main text-2xl font-semibold w-full text-center">Rooms</p>
      </div>
      <div
        class="bg-main/10 py-1 pl-3 pr-2 rounded-3xl flex justify-between items-center"
      >
        <div class="mr-2" @click="clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="!hotel_id && !order_by_price"
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
            v-if="hotel_id || order_by_price"
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
          class="style-chooser bg-white rounded-full border border-main min-w-[150px]"
          :options="chooseType"
          v-model="order_by_price"
          label="name"
          :clearable="false"
          :reduce="(d) => d.name"
          placeholder="Sort by Price"
        ></v-select>
        <!-- <v-select
          class="style-chooser bg-white rounded-full border border-main min-w-[100px]"
          :options="chooseType"
          label="name"
          :clearable="false"
          :reduce="(d) => d.name"
          placeholder="Pax"
        ></v-select> -->
      </div>
      <div
        class="relative flex justify-center items-center py-[50%]"
        v-if="loading"
      >
        <div
          class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-main"
        ></div>
        <img src="../../public/logo.jpg" class="rounded-full h-16 w-16" />
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 pt-2"
        v-if="!loading"
      >
        <div
          class="space-y-2"
          v-for="(room, index) in rooms?.data"
          :key="index"
        >
          <RoomsItemVue :id="room.id" :rooms="room" @change="changes" />
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 pt-2"
        v-if="!loading"
      >
        <div
          class="space-y-2 col-span-1 md:col-span-2"
          v-if="rooms?.data.length == 0"
        >
          <NoDataPage />
        </div>
      </div>
      <div>
        <Pagination v-if="!loading" :data="rooms" @change-page="changePage" />
      </div>
    </div>
  </div>
</template>

<style></style>
