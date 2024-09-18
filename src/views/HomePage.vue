<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import HeaderHomeVue from "../components/layout/HeaderHomePage.vue";
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
import { onMounted, ref } from "vue";
import WhyChooseUsVue from "../components/home/WhyChooseUs.vue";
import TranslationPageVue from "../views/TranslationPage.vue";
import Modal from "../components/layout/Modal.vue";

const router = useRouter();
const route = useRoute();

const showProp = ref(false);

const changePageFunction = (data) => {
  if (data) {
    showProp.value = false;
    localStorage.setItem("showProps", "false");
  }
};

onMounted(() => {
  console.log("====================================");
  console.log(route.path); // Log the current route path
  if (route.path === "/") {
    if (localStorage.getItem("showProps") == "false") {
      showProp.value = false;
    } else {
      showProp.value = true;
    }
    // Set showProp to true if the current path is "/"
  }
  console.log("====================================");
});
</script>

<template>
  <div>
    <div>
      <Layout>
        <div class="">
          <HeaderHomeVue :showTitle="true" :onDBoradingShow="showProp">
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

          <ThingToDoVue />
          <WhyChooseUsVue />
          <StayinBangkokVue />
          <!-- <ExporeAboutCityVue /> -->
          <!-- <UniqueHotelVue /> -->

          <BestSellingVanTours />
          <BestSellingAttractions />
          <TopDestinationVue />
          <StayInPattaya />
          <ReadDestinationVue />
        </div>
      </Layout>

      <Modal :isOpen="showProp" @closeModal="showProp = false">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-2 text-left align-middle shadow-xl transition-all"
        >
          <div class="w-full h-[80vh] overflow-hidden rounded-lg">
            <TranslationPageVue @change="changePageFunction" />
          </div>
        </DialogPanel>
      </Modal>
    </div>
  </div>
</template>
