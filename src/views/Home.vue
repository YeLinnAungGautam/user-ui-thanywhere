<script setup>
import HomeBannerVue from "../components/Home/HomeBanner.vue";
import HomeBangkok from "../components/Home/HomeBangkok.vue";
import HomeAboutThaiVue from "../components/Home/HomeAboutThai.vue";
import HomeLayoutVue from "../components/Layout/HomeLayout.vue";
import { useVantourStore } from "../stores/vantour";

import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const vantourStore = useVantourStore();

const { vantours, loading } = storeToRefs(vantourStore);

onMounted(async () => {
  const res = await vantourStore.getListAction();
  console.log(res);
});
</script>

<template>
  <div>
    <HomeLayoutVue>
      <div class="h-auto space-y-6">
        <HomeBannerVue />
        <div class="px-4 space-y-3">
          <div v-for="(a, index) in vantours?.data" :key="index">
            <HomeBangkok :data="a" />
          </div>
          <HomeAboutThaiVue />
        </div>
      </div>
    </HomeLayoutVue>
  </div>
</template>
