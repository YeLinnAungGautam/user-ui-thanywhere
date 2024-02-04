<script setup>
import HomeBannerVue from "../components/Home/Attractions/HomeAttractionBanner.vue";
import HomeAttractionList from "../components/Home/Attractions/HomeAttractionList.vue";
import HomeAboutThaiVue from "../components/Home/HomeAboutThai.vue";
import HomeLayoutVue from "../components/Layout/HomeLayout.vue";
</script>

<template>
  <div>
    <HomeLayoutVue>
      <div class="h-auto space-y-6">
        <HomeBannerVue />
        <div class="px-4 space-y-3">
          <div v-for="a in 4" :key="a">
            <HomeAttractionList />
          </div>
          <HomeAboutThaiVue />
        </div>
      </div>
    </HomeLayoutVue>
  </div>
</template>
