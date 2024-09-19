<template>
  <div>
    <div class="w-full h-[85vh]">
      <div class="w-full h-full overflow-hidden relative z-20">
        <img
          :src="LanguageImage"
          @load="onImageLoad"
          v-show="loadimage"
          class="w-full h-full object-cover -z-1 absolute top-0"
          alt=""
        />
        <div
          class="w-[100vw] h-[100vh] bg-gradient-to-t to-[#ff6300] from-[#e61c1c] absolute flex justify-center items-center top-0 left-0 -z-1"
          v-if="!loadimage"
        >
          <img :src="logo" class="mr-10" alt="" />
        </div>
        <div
          class="absolute top-5 z-50 w-full text-center pt-10"
          v-if="loadimage"
        >
          <p class="text-main text-2xl font-bold">choose your language</p>
          <div>
            <p class="text-sm font-medium text-main px-8 pt-3 tracking-wide">
              select your preferred language to use
            </p>
            <p class="text-sm font-medium text-main px-8 tracking-wide">
              TH Anywhere easily
            </p>
          </div>
          <div class="pt-10 space-y-3">
            <div
              class="flex justify-between items-center mx-6 px-2 py-2 bg-transparent border border-main rounded-lg"
              @click="handleLanguageChange('english')"
              :class="chooseLanguage == 'english' ? 'bg-main/20' : ''"
            >
              <div class="flex justify-start items-center gap-4">
                <div
                  class="w-8 h-8 overflow-hidden border-2 border-white rounded-full"
                >
                  <img
                    :src="English"
                    alt=""
                    class="w-auto h-full object-cover"
                  />
                </div>
                <p class="text-xs font-semibold">English</p>
              </div>
              <input
                type="checkbox"
                name=""
                :checked="chooseLanguage == 'english'"
                id=""
              />
            </div>
            <div
              class="flex justify-between items-center mx-6 px-2 py-2 bg-transparent border border-main rounded-lg"
              @click="handleLanguageChange('myanmar')"
              :class="chooseLanguage == 'myanmar' ? 'bg-main/20' : ''"
            >
              <div class="flex justify-start items-center gap-4">
                <div
                  class="w-8 h-8 overflow-hidden border-2 border-white rounded-full"
                >
                  <img
                    :src="Myanmar"
                    alt=""
                    class="w-auto h-full object-cover"
                  />
                </div>
                <p class="text-xs font-semibold">Burmese / မြန်မာ</p>
              </div>
              <input
                type="checkbox"
                name=""
                :checked="chooseLanguage == 'myanmar'"
                id=""
              />
            </div>
          </div>
          <div class="pt-10">
            <button
              @click="choose"
              class="bg-main text-white text-xs font-semibold px-8 py-2 rounded-full"
            >
              choose
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LanguageImage from "../assets/onboarding screns/Language screen.jpg";
import English from "../assets/onboarding screns/english.png";
import Myanmar from "../assets/onboarding screns/myanmar.png";
import logo from "@/assets/logo.png";
import { ref, onMounted, defineEmits } from "vue";
import { useSettingStore } from "../stores/setting";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const chooseLanguage = ref("");
const settingStore = useSettingStore();
const router = useRouter();
const { language } = storeToRefs(settingStore);

const handleLanguageChange = (language) => {
  chooseLanguage.value = language;
};

const emit = defineEmits();

const choose = () => {
  settingStore.changeLanguage(chooseLanguage.value);
  emit("change", "changes");
  // router.back();
};

const loadimage = ref(false);

const onImageLoad = () => {
  loadimage.value = true;
};

onMounted(async () => {
  await settingStore.getLanguage();
  chooseLanguage.value = language.value;
});
</script>
