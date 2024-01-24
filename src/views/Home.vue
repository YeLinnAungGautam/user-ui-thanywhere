<script setup>
import LayoutVue from "../components/Layout/Layout.vue";
import HomeBannerVue from "../components/Home/HomeBanner.vue";
import HomeVanTourVue from "../components/Home/HomeVanTour.vue";
import HomeGroupVue from "../components/Home/HomeGroup.vue";
import HomeAttractionVue from "../components/Home/HomeAttraction.vue";
import HomeHotelVue from "../components/Home/HomeHotel.vue";
import HomeWhyVue from "../components/Home/HomeWhy.vue";
import HomeAboutThaiVue from "../components/Home/HomeAboutThai.vue";
</script>

<template>
  <div>
    <div class="h-auto space-y-12">
      <HomeBannerVue />
      <div class="px-[80px] space-y-6">
        <HomeVanTourVue />
        <HomeHotelVue />
        <HomeWhyVue />
        <HomeAttractionVue />

        <HomeGroupVue />
        <HomeAboutThaiVue />
      </div>
    </div>
  </div>
</template>
