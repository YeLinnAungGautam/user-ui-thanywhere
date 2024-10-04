<template>
  <Layout>
    <div class="relative min-h-screen h-auto bg-background">
      <div
        class="absolute top-0 left-0 w-full h-full bg-main/10 z-40"
        v-if="!loginState"
      >
        <div
          class="text-black pt-3 absolute top-0 left-0 pl-4 flex justify-start items-center gap-x-2"
          @click="router.back()"
        >
          <ChevronLeftIcon class="w-5 h-5 text-black" />
          back
        </div>
        <div
          @click="router.push('/account/login')"
          class="flex justify-center items-center text-black text-2xl font-medium h-full"
        >
          <div class="text-center">
            Please <span class="text-main mx-2 underline">login</span> first
            <p class="text-sm">for view your trip details and receipt</p>
          </div>
        </div>
      </div>
      <div
        class="absolute top-0 left-0 w-full h-screen bg-main/10 z-40"
        v-if="loginState && loading"
      >
        <div
          class="flex justify-center items-center text-black font-medium h-full"
        >
          <img :src="logo" alt="" class="w-10 h-10" />
          <div class="text-center text-sm">loading ...</div>
        </div>
      </div>
      <div v-if="loginState && !loading">
        <div
          class="flex justify-between sticky top-0 items-center bg-gradient-to-b to-main from-main/80 px-6 py-5 shadow-custom"
        >
          <ChevronLeftIcon class="w-5 h-5 text-white" @click="router.back()" />
          <p class="text-white">All bookings</p>
          <p class="opacity-0">....</p>
        </div>
        <div class="px-5 pt-3 pb-1">
          <div
            class="pb-3 pt-1"
            v-for="b in bookings?.data ? bookings?.data : []"
            :key="b.id"
          >
            <div class="bg-white rounded-lg shadow-custom p-4">
              <div
                class="flex justify-between items-center border-b border-black/10 pb-2"
              >
                <p class="font-semibold text-lg">{{ b?.crm_id }}</p>
                <div class="flex justify-end items-center gap-x-2">
                  <p
                    class="text-sm font-medium text-green"
                    v-if="b?.status == 'fully_paid'"
                  >
                    Booking Completed
                  </p>
                  <p
                    class="text-sm font-medium text-main"
                    v-if="b?.status != 'fully_paid'"
                  >
                    Booking Pending
                  </p>
                  <ChevronRightIcon class="w-4 h-4 text-main" />
                </div>
              </div>
              <div class="grid grid-cols-3 pt-3 gap-4 text-xs">
                <div class="col-span-2 space-y-1">
                  <p>Sale Date : {{ b?.booking_date }}</p>
                  <p>Total Reservation : {{ b?.items?.length }}</p>
                  <p class="line-clamp-1">
                    Agent Name : {{ b?.created_by?.name }}
                  </p>
                  <div class="flex justify-start gap-x-2 items-center">
                    <p class="font-semibold text-xl">฿ {{ b?.sub_total }}</p>
                    <p class="underline">{{ b?.payment_status }}</p>
                  </div>
                  <div class="flex justify-start items-center pt-2">
                    <button
                      class="border border-black font-medium cursor-pointer px-2 py-1 rounded-lg"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
                <div class="w-full h-[100px] overflow-hidden rounded-lg">
                  <img
                    src="https://api-blog.thanywhere.com/storage/images/1712124148_51925_1.jpg"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-3 bg-white p-4 rounded-lg shadow-custom mx-5">
          <div class="flex justify-between items-center">
            <p class="text-sm">Connect Manual Sales to Trips</p>
            <ChevronRightIcon class="w-4 h-4 text-black" />
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm">How to Activate Order</p>
            <ChevronRightIcon class="w-4 h-4 text-black" />
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm">How to Pay for Orders</p>
            <ChevronRightIcon class="w-4 h-4 text-black" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useBookingStore } from "@/stores/booking";
import { storeToRefs } from "pinia";
import logo from "@/assets/logo.png";
import Layout from "../components/layout/LayoutHome.vue";
const router = useRouter();

const loginState = ref(false);
const bookingStore = useBookingStore();
const { bookings, loading } = storeToRefs(bookingStore);

const checkLoginState = async () => {
  let token = localStorage.getItem("thany_token");
  if (token) {
    loginState.value = true;
  }
};

const getBookingList = async () => {
  if (loginState.value) {
    await bookingStore.getListAction();
    console.log(bookings.value, "this is booking list");
  }
};

onMounted(async () => {
  checkLoginState();
  await getBookingList();
});
</script>
