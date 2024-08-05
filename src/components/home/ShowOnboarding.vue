<template>
  <div>
    <div class="relative" :class="loading ? 'opacity-20' : 'opacity-100'">
      <div
        class="absolute top-0 right-6 text-white text-[10px] font-semibold bg-main px-5 py-1 rounded-full mt-5 inline-block z-20"
        @click="customPageChange"
      >
        skip
      </div>
      <!-- <div v-show="loading">
        <LoadingPageVue />
      </div> -->
      <carousel v-bind="settings" ref="carousel2">
        <slide v-for="(slide, index) in showImage" :key="index">
          <div>
            <div class="w-screen h-screen overflow-hidden relative z-50">
              <img
                :src="slide.image"
                @load="onImageLoad"
                class="w-screen h-screen object-cover -z-1 absolute bottom-[-80px]"
                :class="loading ? ' opacity-30' : 'opacity-100'"
                alt=""
              />
              <img
                :src="slide.image"
                @load="onImageLoad"
                :class="loading ? ' opacity-0' : 'opacity-100'"
                class="w-screen h-screen object-cover -z-1 absolute top-0"
                alt=""
              />
              <div class="absolute top-5 z-50 w-full text-center pt-10">
                <p class="text-main text-2xl font-bold">
                  {{ language == "english" ? slide.title_en : slide.title }}
                </p>
                <p
                  class="text-sm font-medium text-main px-8 pt-5 tracking-wide leading-7"
                >
                  {{ language == "english" ? slide.des_en : slide.des }}
                </p>
                <div class="flex justify-center items-center mt-5 gap-1">
                  <p
                    class="w-10 h-1"
                    :class="index == 0 ? 'bg-main' : 'bg-main/40'"
                  ></p>
                  <p
                    class="w-10 h-1"
                    :class="index == 1 ? 'bg-main' : 'bg-main/40'"
                  ></p>
                  <p
                    class="w-10 h-1"
                    :class="index == 2 ? 'bg-main' : 'bg-main/40'"
                  ></p>
                </div>
                <div class="flex justify-end items-center px-6">
                  <p
                    v-if="index == 0"
                    @click="nextPage"
                    class="text-white text-xs font-semibold bg-main px-6 py-2 rounded-full mt-5 inline-block"
                  >
                    {{ slide.button }}
                  </p>
                </div>
                <div
                  class="flex justify-between items-center px-6"
                  v-if="index == 1"
                >
                  <ChevronLeftIcon
                    @click="perPage"
                    class="w-6 h-6 bg-main/40 text-white rounded-full p-1"
                  />
                  <p
                    @click="nextPage"
                    class="text-white text-xs font-semibold bg-main px-6 py-2 rounded-full mt-5 inline-block"
                  >
                    {{ slide.button }}
                  </p>
                </div>
                <div
                  class="flex justify-between items-center px-6"
                  v-if="index == 2"
                >
                  <ChevronLeftIcon
                    @click="perPage"
                    class="w-6 h-6 bg-main/40 text-white rounded-full p-1"
                  />
                  <p
                    @click="loginPageChange"
                    class="text-white text-xs font-semibold bg-main px-6 py-2 rounded-full mt-5 inline-block"
                  >
                    {{ slide.button }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </slide>

        <template #addons>
          <pagination class="custom2" />
        </template>
      </carousel>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import { onMounted, ref } from "vue";
import image1 from "../../assets/onboarding screns/onboarding screns/onboarding-1.jpg";
import image2 from "../../assets/onboarding screns/onboarding screns/onboarding-2.jpg";
import image3 from "../../assets/onboarding screns/onboarding screns/onboarding-3.jpg";
import { useRouter } from "vue-router";
import { useSettingStore } from "../../stores/setting";
// import LoadingPageVue from "../layout/LoadingPage.vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

const settings = {
  itemsToShow: 1,
  snapAlign: "start",
};

const showImage = ref(null);

const simple = [
  {
    id: 1,
    image: image1,
    title: "ခရီးထွက်ဖို့ စဉ်းစားနေလား ?",
    title_en: "Traveling to Thailand?",
    des: `ထိုင်းနိုင်ငံအတွင်း ဟိုတယ်ဘိုကင်၊ ကားငှါး ၊ ဝင်ကြေးလက်မှတ် ၊ သီးသန့်ခရီးစဉ်များ ၊ အုပ်စုခရီးစဉ်များနှင့် ညအိပ်ခရီးစဉ်များကို ဝယ်ယူနိုင်ပါတယ်။`,
    des_en:
      "Book hotels, vantours, tickets to attractions & tours in one place. Skip lines, explore hidden gems and craft your dream holiday.",
    button: "next page",
  },
  {
    id: 2,
    image: image2,
    title: "အတန်ဆုံးဈေးဖြင့် ရယူလိုက်ပါ",
    title_en: "Get unbeatable prices !",
    des: `ထိုင်းနိုင်ငံရဲ့ TAT License ကို ရရှိထားပြီး နိုင်ငံတဝှမ်းက Direct Partnership ပေါင်း 150 ကျော်ကို အသက်သာဆုံးဈေး နှင့် booking တင်နိုင်ပါသည်။`,
    des_en: `THAnywhere is TAT-licensed agency. Our team is in Direct-Partnerships with over 150 hotels, attractions and tour operators. Get your next best holiday deals here!`,
    button: "next page",
  },
  {
    id: 3,
    image: image3,
    title: "ပိုမိုသိရှိလေ့လာရန်အတွက်",
    title_en: "Discover the details!",
    des: `ထိုင်းနိုင်ငံအတွင်းက နေရာတွေရဲ့ Contents များကို ဖတ်ရှုနိုင်ရန်အတွက် Content နဲ့ Operation Team မှ အချိန်ယူအားထုတ်ကာ ရေးသားဖန်တီးခဲ့ပါတယ်။`,
    des_en: `Thailand before you trip. Our dedicated content and operation worked meticulously to provide you with exclusive contents about top destinations in Thailand.`,
    button: "explore",
  },
];

const carousel2 = ref(null);

// const showInfo = () => {
//   emit("change", "changes");
// };

const nextPage = () => {
  carousel2.value.next();
};
const perPage = () => {
  carousel2.value.prev();
};

const customPageChange = () => {
  router.push("/home");
};

const loginPageChange = () => {
  router.push("/home");
};

const imageLoaded = ref(0);
const loading = ref(true);
const onImageLoad = () => {
  loading.value = true;
  imageLoaded.value += 1;
  console.log("Image loaded", imageLoaded.value);
  if (imageLoaded.value > 5) {
    loading.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  imageLoaded.value = 0;
  await settingStore.getLanguage();
  showImage.value = simple;
  console.log("hello");
});
</script>

<style>
.custom2 {
  position: absolute;
  top: 200px;
  width: 100%;
  z-index: -1;
}
</style>
