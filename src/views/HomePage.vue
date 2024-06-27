<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import AllProductPartVue from "../components/home/AllProductPart.vue";
import ReadDestinationVue from "../components/home/ReadDestinations.vue";
import ThingToDoVue from "../components/home/ThingToDo.vue";
import StayinBangkokVue from "../components/home/StayInBangkok.vue";
import UniqueHotelVue from "../components/home/UniqueHotel.vue";
import BestSellingVanTours from "../components/home/BestSellingVanTours.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
// import ExporeAboutCityVue from "../components/home/ExporeAboutCity.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
// import ShowOnboardingVue from "../components/home/ShowOnboarding.vue";
// import { useSettingStore } from "../stores/setting";
// import { storeToRefs } from "pinia";

const router = useRouter();
// const settingStore = useSettingStore();
// const { showOnboard } = storeToRefs(settingStore);

// const onchangeComponent = (data) => {
//   if (data == "changes") {
//     settingStore.changeOnboard();
//   }
// };

onMounted(() => {});
</script>

<template>
  <div>
    <div>
      <Layout>
        <div class="">
          <HeaderHomeVue :showTitle="true">
            <div class="px-6 space-y-6">
              <div class="text-white">
                <p class="text-base font-semibold tracking-wider">
                  Hello, Minn
                </p>
                <p class="text-xs">can't wait to bring you excitements !</p>
              </div>
              <div class="relative" @click="router.push('/home/search')">
                <input
                  type="search"
                  name=""
                  placeholder=" search for all products"
                  class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
                  id=""
                />
                <!-- <MagnifyingGlassIcon
                  class="w-5 h-5 absolute top-3.5 right-5 text-main"
                /> -->
                <img
                  :src="searchIcon"
                  class="w-5 h-5 absolute top-3.5 right-5 text-main"
                  alt=""
                />
              </div>
            </div>
          </HeaderHomeVue>
        </div>
        <div class="h-auto pb-20 pt-8 space-y-10">
          <AllProductPartVue />
          <ReadDestinationVue />

          <ThingToDoVue />
          <StayinBangkokVue />
          <!-- <ExporeAboutCityVue /> -->
          <UniqueHotelVue />
          <BestSellingVanTours />
        </div>
      </Layout>
    </div>
  </div>
</template>
