<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import NavbarVue from "../components/Navbar.vue";
import { useBookingStore } from "../stores/booking";
import Pagination from "../components/Pagination.vue";
import SaleListItem from "../components/SaleListItem.vue";
import NoDataPage from "../components/NoDataPage.vue";
import { useRouter } from "vue-router";

const bookingStore = useBookingStore();
const router = useRouter();

const { bookings, loading } = storeToRefs(bookingStore);

const search = ref("");
const chooseType = ref([]);

const changePage = async (url) => {
  console.log(url);
  await bookingStore.getChangePage(url, watchSystem.value);
};

const createPage = () => {
  router.push({ name: "sales-create" });
};

const watchSystem = computed(() => {
  const result = {};
  if (bookingStatus.value != "" && bookingStatus.value != undefined) {
    result.booking_status = bookingStatus.value;
  }
  if (searchP.value != "" && searchP.value != undefined) {
    result.status = searchP.value;
  }

  console.log(result);
  return result;
});

const bookingStatus = ref("");
const searchP = ref("");
const searchPayment = [
  { id: 1, name: "all", value: "All" },
  { id: 2, name: "not_paid", value: "Not Paid" },
  { id: 3, name: "partially_paid", value: "Partially Paid" },
  { id: 4, name: "fully_paid", value: "Fully Paid" },
];
const bookingStatusArr = [
  { id: 1, name: "awaiting" },
  { id: 2, name: "confirmed" },
  { id: 3, name: "declined" },
];

const clear = () => {
  searchP.value = "";
  bookingStatus.value = "";
};

onMounted(async () => {
  await bookingStore.getListAction();
  console.log(bookings.value);
});

watch(searchP, async (newValue) => {
  await bookingStore.getListAction(watchSystem.value);
});
watch(bookingStatus, async (newValue) => {
  await bookingStore.getListAction(watchSystem.value);
});
</script>

<template>
  <div class="bg-white h-auto">
    <NavbarVue />
    <div class="pb-2 pt-5 px-4 space-y-4">
      <div class="relative">
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
        <p class="text-main text-2xl font-semibold w-full text-start">Sales</p>
      </div>
      <div class="rounded-3xl flex justify-between items-center">
        <div class="flex py-1.5 gap-3">
          <v-select
            class="style-chooser bg-transparent rounded-full border border-main min-w-[100px]"
            :options="searchPayment"
            v-model="searchP"
            label="name"
            :clearable="false"
            :reduce="(d) => d.name"
            placeholder="status"
          ></v-select>
          <v-select
            class="style-chooser bg-transparent rounded-full border border-main min-w-[120px]"
            :options="bookingStatusArr"
            v-model="bookingStatus"
            label="name"
            :clearable="false"
            :reduce="(d) => d.name"
            placeholder="Booking"
          ></v-select>
        </div>
        <div class="mr-2" @click="clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="searchP == '' && bookingStatus == ''"
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
            v-if="searchP != '' || bookingStatus != ''"
            src="../../public/clear-svgrepo-com (1).svg"
            class="w-6 h-6"
            alt=""
          />
          <!-- <p class="text-main">Search</p> -->
        </div>
        <!-- @option:selected="chooseName()" -->
      </div>
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
    <div class="pt-2" v-if="!loading">
      <div class="" v-for="(book, index) in bookings?.data" :key="index">
        <SaleListItem
          :id="book.id"
          :customer_name="book.customer?.name"
          :crm_id="book.crm_id"
          :past_crm_id="book.past_crm_id ? book.past_crm_id : '-'"
          :sub_total="book.sub_total"
          :booking_date="book.booking_date"
          :payment_status="book.payment_status"
          :reservation_status="book.reservation_status"
          :items="book.items"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 pt-2"
      v-if="!loading && bookings?.data.length == 0"
    >
      <div class="space-y-2 col-span-1 md:col-span-2">
        <NoDataPage />
      </div>
    </div>
    <div class="px-4">
      <Pagination v-if="!loading" :data="bookings" @change-page="changePage" />
    </div>
  </div>
</template>
