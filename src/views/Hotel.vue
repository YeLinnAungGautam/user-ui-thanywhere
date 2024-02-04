<script setup>
import HomeBannerVue from "../components/Home/HomeBanner.vue";
import HomeHotelVue from "../components/Home/Hotels/HomeHotel.vue";
import HomeAboutThaiVue from "../components/Home/HomeAboutThai.vue";
import HomeLayoutVue from "../components/Layout/HomeLayout.vue";
import { useHotelStore } from "../stores/hotel";

import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const hotelStore = useHotelStore();

const { hotels, loading } = storeToRefs(hotelStore);

onMounted(async () => {
  const res = await hotelStore.getListAction();
  console.log(res);
});
</script>

<template>
  <div>
    <HomeLayoutVue>
      <div class="h-auto space-y-6">
        <HomeBannerVue />
        <div class="px-4 space-y-3">
          <div v-for="(a, index) in hotels?.data" :key="index">
            <HomeHotelVue :data="a" />
          </div>
          <HomeAboutThaiVue />
        </div>
      </div>
    </HomeLayoutVue>
  </div>
</template>
