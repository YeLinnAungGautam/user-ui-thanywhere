<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import AllProductPartVue from "../components/home/AllProductPart.vue";
import BestSellingAttractions from "../components/home/BestSellingAttraction.vue";
import ReadDestinationVue from "../components/home/ReadDestinations.vue";
import StayInPattaya from "../components/home/StayInPattaya.vue";
import ThingToDoVue from "../components/home/ThingToDo.vue";
import StayinBangkokVue from "../components/home/StayInBangkok.vue";
// import UniqueHotelVue from "../components/home/UniqueHotel.vue";
import TopDestinationVue from "../components/home/TopDestinations.vue";
import BestSellingVanTours from "../components/home/BestSellingVanTours.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
// import ExporeAboutCityVue from "../components/home/ExporeAboutCity.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import Modal from "../components/layout/Modal.vue";
import OnBoradingShowVue from "./OnboardingPage.vue";
// import InstallAppVue from "../components/home/InstallApp.vue";
// import ShowOnboardingVue from "../components/home/ShowOnboarding.vue";
// import { useSettingStore } from "../stores/setting";
// import { storeToRefs } from "pinia";

const onBoradingShow = ref(true);

const router = useRouter();
const route = useRoute();
// const settingStore = useSettingStore();
// const { showOnboard } = storeToRefs(settingStore);

// const onchangeComponent = (data) => {
//   if (data == "changes") {
//     settingStore.changeOnboard();
//   }
// };

onMounted(() => {
  onBoradingShow.value = false;
  if (router.currentRoute.value.path == "/") {
    console.log("hello");

    onBoradingShow.value = true; // Show onboarding if the route is '/'
  } else if (router.currentRoute.value.path == "/home") {
    console.log("this is home");

    onBoradingShow.value = false; // Hide onboarding if the route is '/home'
  }
});

watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log("Route path changed from", oldPath, "to", newPath);

    if (newPath == "/") {
      onBoradingShow.value = true;
    } else if (newPath == "/home") {
      onBoradingShow.value = false;
    }
  }
);
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
                  Expore Thailand,
                </p>
                <p class="text-xs">
                  bringing you over 140 direct partners and counting.
                </p>
              </div>
              <div class="relative" @click="router.push('/search')">
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
          <!-- <InstallAppVue /> -->
          <AllProductPartVue />
          <ReadDestinationVue />

          <ThingToDoVue />
          <StayinBangkokVue />
          <!-- <ExporeAboutCityVue /> -->
          <!-- <UniqueHotelVue /> -->
          <BestSellingVanTours />
          <BestSellingAttractions />
          <TopDestinationVue />
          <StayInPattaya />
        </div>
      </Layout>
      <Modal :isOpen="onBoradingShow" @closeModal="onBoradingShow = false">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-2 text-left align-middle shadow-xl transition-all"
        >
          <div>
            <OnBoradingShowVue />
          </div>
        </DialogPanel>
      </Modal>
    </div>
  </div>
</template>
