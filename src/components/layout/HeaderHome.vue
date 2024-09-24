<script setup>
import logoIcon from "../../assets/logo.png";
// import profileIcon from "../../assets/icons/Search Bar Icons & Headline icons/account icon.svg";
import Myanmar from "../../assets/onboarding screns/myanmar.png";
import English from "../../assets/onboarding screns/english.png";
import { useRouter } from "vue-router";
import { defineProps, onMounted, ref } from "vue";
import { useSettingStore } from "../../stores/setting";
import { storeToRefs } from "pinia";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import Modal from "../layout/Modal.vue";
import cartImage from "@/assets/shopping-cart.png";
import TranslationPageVue from "../../views/TranslationPage.vue";

const router = useRouter();
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);
const props = defineProps({
  showTitle: Boolean,
});

const onBoradingShow = ref(false);
const changePageFunction = (data) => {
  if (data) {
    onBoradingShow.value = false;
  }
};

const goHomePage = () => {
  router.push("/home");
};

onMounted(() => {
  settingStore.getLanguage();
});
</script>

<template>
  <div
    class="w-full bg-gradient-to-b to-main from-main/60 border-b border-background"
  >
    <div class="w-full pt-4 pb-6 relative z-10">
      <div
        class="flex justify-between items-center text-white px-6 pb-4"
        v-if="props.showTitle"
      >
        <img :src="logoIcon" class="w-10 h-10" alt="" @click="goHomePage" />
        <p class="font-semibold tracking-wide hidden sm:block text-lg">
          THAILAND ANYWHERE
        </p>
        <p class="font-semibold tracking-wide sm:hidden block text-lg">
          THANYWHERE
        </p>
        <!-- <UserCircleIcon class="w-6 h-6 text-white" /> -->
        <div class="flex justify-end items-center gap-3">
          <div class="relative">
            <p
              class="absolute -top-1 border border-white -right-2 bg-red text-[10px] w-4 h-4 flex justify-center items-center rounded-full text-white"
            >
              5
            </p>
            <img :src="cartImage" class="w-7 h-7" alt="" />
          </div>
          <div
            @click="onBoradingShow = true"
            class="border border-white rounded-full"
          >
            <img
              :src="English"
              class="w-7 h-7"
              alt=""
              v-if="language == 'english'"
            />
            <img
              :src="Myanmar"
              class="w-7 h-7"
              alt=""
              v-if="language == 'myanmar'"
            />

            <!-- <p class="text-xs pr-2">{{ language == "english" ? "en" : "mm" }}</p> -->
          </div>
        </div>
      </div>
      <div class="pb-3">
        <slot />
      </div>
      <div
        class="absolute -bottom-5 bg-background h-[40px] rounded-full w-full"
      ></div>
    </div>
    <Modal :isOpen="onBoradingShow" @closeModal="onBoradingShow = false">
      <DialogPanel
        class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-2 text-left align-middle shadow-xl transition-all"
      >
        <div class="w-full h-[80vh] overflow-hidden rounded-lg">
          <TranslationPageVue @change="changePageFunction" />
        </div>
      </DialogPanel>
    </Modal>
  </div>
</template>
