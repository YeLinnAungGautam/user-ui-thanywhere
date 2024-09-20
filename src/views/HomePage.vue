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
import facebook from "@/assets/icons/facebook.png";
import viber from "@/assets/icons/chat-bubble_7044894.png";
import phone from "@/assets/icons/phone_6932413.png";
import chat from "@/assets/icons/chat_7324289.png";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();
const showProp = ref(false);
const { language } = storeToRefs(settingStore);

const showButtons = ref(false);
const toggleButtons = () => {
  showButtons.value = !showButtons.value;
};

const changePageFunction = (data) => {
  if (data) {
    showProp.value = false;
    localStorage.setItem("showProps", "false");
  }
};

const facebookClickAction = () => {
  // Open Facebook in a new tab
  if (language.value == "myanmar") {
    window.open("https://www.facebook.com/thailandanywherevip", "_blank");
  } else {
    window.open("https://www.facebook.com/Thanywhereint", "_blank");
  }
};
const viberClickAction = () => {
  // Open Facebook in a new tab
  if (language.value == "myanmar") {
    const phoneNumber = encodeURIComponent("+959972185129");
    const viberUrl = `viber://chat?number=${phoneNumber}`;

    // Try opening the Viber chat
    const newWindow = window.open(viberUrl, "_blank");
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed == "undefined"
    ) {
      alert(
        "Unable to open Viber. Please ensure the Viber app is installed and try again."
      );
    }
  } else {
    const phoneNumber = encodeURIComponent("+959751117778");
    const viberUrl = `viber://chat?number=${phoneNumber}`;

    // Try opening the Viber chat
    const newWindow = window.open(viberUrl, "_blank");
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed == "undefined"
    ) {
      alert(
        "Unable to open Viber. Please ensure the Viber app is installed and try again."
      );
    }
  }
};
const phoneClickAction = () => {
  // Open Facebook in a new tab
  if (language.value == "myanmar") {
    window.open(`tel:${"+959972185129"}`, "_self");
  } else {
    window.open(`tel:${"+66950423254"}`, "_self");
  }
};

onMounted(() => {
  console.log("====================================");
  settingStore.getLanguage();
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
  <div class="relative">
    <div
      class="fixed flex flex-col space-y-1 justify-center items-end bottom-20 pr-4 right-0 z-40"
    >
      <!-- Social buttons -->
      <transition-group name="fade" tag="div" class="space-y-1 pr-1">
        <div
          v-if="showButtons"
          @click="facebookClickAction"
          key="facebook"
          class="staggered-enter-active flex justify-end items-center space-x-2"
        >
          <p
            class="px-4 text-main border border-main bg-white py-1 text-xs rounded-full shadow-2xl"
          >
            facebook
          </p>
          <img
            :src="facebook"
            class="text-white w-12 h-12 bg-white rounded-full shadow-lg"
            alt="Facebook"
          />
        </div>
        <div
          v-if="showButtons"
          @click="viberClickAction"
          class="staggered-enter-active flex justify-end items-center space-x-2"
          key="viber"
        >
          <p
            class="px-4 text-main border border-main bg-white py-1 text-xs rounded-full shadow-2xl"
          >
            viber
          </p>
          <img
            :src="viber"
            class="text-white w-12 h-12 bg-white rounded-full shadow-lg"
            alt="Viber"
          />
        </div>
        <div
          v-if="showButtons"
          @click="phoneClickAction"
          key="whatsapp"
          class="staggered-enter-active flex justify-end items-center space-x-2"
        >
          <p
            class="px-4 text-main border border-main bg-white py-1 text-xs rounded-full shadow-2xl"
          >
            phone
          </p>
          <img
            :src="phone"
            class="text-white w-12 h-12 bg-white rounded-full shadow-lg"
            alt="WhatsApp"
          />
        </div>
      </transition-group>

      <!-- Floating "+" button -->
      <div
        class="bg-gradient-to-t to-[#ffd500] from-main text-white w-14 h-14 rounded-full shadow-lg flex justify-center items-center cursor-pointer"
        @click="toggleButtons"
      >
        <!-- Rotate the "+" when showButtons is true -->
        <p
          v-if="showButtons"
          class="transform transition-transform text-3xl duration-500 ease-in-out"
          :style="{
            transform: showButtons ? 'rotate(45deg)' : 'rotate(0deg)',
          }"
        >
          +
        </p>
        <img
          :src="chat"
          class="transform transition-transform text-3xl duration-500 ease-in-out"
          :style="{
            transform: showButtons ? 'rotate(45deg)' : 'rotate(0deg)',
          }"
          alt=""
          v-if="!showButtons"
        />
      </div>
    </div>
    <div class="">
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter {
  opacity: 0;
  transform: translateY(20px); /* Start 20px lower */
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0); /* End at original position */
}

.fade-leave {
  opacity: 1;
  transform: translateY(0); /* Start at original position */
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(20px); /* Move 20px down */
}

/* Add staggered delays for each icon */
.staggered-enter-active:nth-child(1) {
  transition-delay: 0.2s;
}

.staggered-enter-active:nth-child(2) {
  transition-delay: 0.1s;
}

.staggered-enter-active:nth-child(3) {
  transition-delay: 0s;
}

.staggered-leave-active:nth-child(1) {
  transition-delay: 0s;
}

.staggered-leave-active:nth-child(2) {
  transition-delay: 0.1s;
}

.staggered-leave-active:nth-child(3) {
  transition-delay: 0.2s;
}
</style>
