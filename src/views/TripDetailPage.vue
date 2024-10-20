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
            Please <span class="text-main mx-2 underline">login</span> first.
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
          <p class="text-white">{{ route.params?.id }}</p>
          <p class="opacity-0">....</p>
        </div>
        <p class="px-5 pt-3 text-sm">Upcoming bookings</p>
        <div class="px-5 pt-3 pb-20">
          <div class="pb-3 pt-1" v-for="b in data ? data : []" :key="b.id">
            <TripCartPage :data="b" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import logo from "@/assets/logo.png";
// import { useBookingStore } from "@/stores/booking";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
// import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Layout from "../components/layout/LayoutHome.vue";
import TripCartPage from "@/components/cart/TripCartPage.vue";
const router = useRouter();
const route = useRoute();

const loginState = ref(false);
// const bookingStore = useBookingStore();
// const { bookings, loading } = storeToRefs(bookingStore);

const checkLoginState = async () => {
  let token = localStorage.getItem("thany_token");
  if (token) {
    loginState.value = true;
  }
};

const data = ref("");

onMounted(async () => {
  checkLoginState();
  const encodedData = route.query.data;
  if (encodedData) {
    const decodedData = decodeURIComponent(encodedData);
    data.value = JSON.parse(decodedData);
  }
  console.log(route.params.id, data.value, "this is props");
});
</script>
