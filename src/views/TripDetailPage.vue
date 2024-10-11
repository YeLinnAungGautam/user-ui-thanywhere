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
            <div class="bg-white rounded-lg shadow-custom">
              <div
                class="flex justify-between items-center border-b border-black/10 px-3 pt-2 rounded-t-xl pb-2"
                :class="
                  b?.status == 'fully_paid' ? 'bg-green/30' : 'bg-main/30'
                "
              >
                <div class="flex justify-end items-center gap-x-2">
                  <p
                    class="text-sm font-medium text-green"
                    v-if="b?.status == 'fully_paid'"
                  >
                    Booking Confirm
                  </p>
                  <p
                    class="text-sm font-medium text-main"
                    v-if="b?.status != 'fully_paid'"
                  >
                    Booking Pending
                  </p>
                </div>
                <p
                  class="font-semibold text-lg"
                  :class="
                    b?.status == 'fully_paid' ? 'text-green' : 'text-main'
                  "
                >
                  ฿ {{ b?.selling_price }}
                </p>
              </div>
              <div class="grid grid-cols-3 pt-3 gap-4 text-xs p-3">
                <div class="w-full h-[100px] overflow-hidden rounded-lg">
                  <img
                    v-if="b?.product?.images?.length > 0 || b?.product?.images"
                    :src="
                      b?.product?.images[0]?.image
                        ? b?.product?.images[0].image
                        : 'https://api-blog.thanywhere.com/storage/images/1712124148_51925_1.jpg'
                    "
                    alt=""
                    class="w-full h-full object-cover"
                  />
                  <img
                    v-if="
                      b?.product?.images?.length == 0 || !b?.product?.images
                    "
                    src="https://d3lcr32v2pp4l1.cloudfront.net/Pictures/1024x536/4/9/4/74494_thai-airways-747_60990.jpg"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="col-span-2 space-y-1">
                  <p class="text-main text-sm line-clamp-1 font-semibold">
                    {{ b?.product?.name }}
                  </p>
                  <p v-if="b?.car != null">{{ b?.car?.name }}</p>
                  <p v-if="b?.variation != null">{{ b?.variation?.name }}</p>
                  <p v-if="b?.room != null">{{ b?.room?.name }}</p>
                  <p v-if="b?.ticket != null">{{ b?.ticket?.price }}</p>

                  <p
                    class="line-clamp-1 bg-black/5 inline-block px-2 py-0.5 rounded-lg"
                  >
                    {{ b?.service_date }}
                  </p>
                  <p class="line-clamp-1">quantity : {{ b?.quantity }}</p>
                  <!-- <div class="flex justify-start gap-x-2 items-center">
                    <p class="font-semibold text-xl">฿ {{ b?.sub_total }}</p>
                    <p class="underline">{{ b?.payment_status }}</p>
                  </div> -->
                  <!-- <div class="flex justify-start items-center pt-2">
                    <button
                      class="border border-black font-medium cursor-pointer px-2 py-1 rounded-lg"
                    >
                      Review Order
                    </button>
                  </div> -->
                </div>
                <div>
                  <div class="flex justify-start gap-x-2 items-center">
                    <button
                      class="border border-black font-medium cursor-pointer px-2 py-1 rounded-lg"
                    >
                      Reciept
                    </button>
                    <button
                      class="border border-black font-medium cursor-pointer px-2 py-1 rounded-lg"
                    >
                      Comfirmation
                    </button>
                    <button
                      class="border border-black font-medium cursor-pointer px-2 py-1 rounded-lg"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
