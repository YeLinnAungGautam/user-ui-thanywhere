<template>
  <div>
    <div class="relative">
      <div
        class="absolute top-0 right-6 text-white text-[10px] font-semibold bg-main px-5 py-1 rounded-full mt-5 inline-block z-20"
        @click="customPageChange"
      >
        skip
      </div>
      <carousel v-bind="settings" ref="carousel2">
        <slide v-for="(slide, index) in showImage" :key="index">
          <div>
            <div class="w-screen h-screen overflow-hidden relative z-20">
              <img
                :src="slide.image"
                class="w-screen h-full object-cover -z-1 relative"
                alt=""
              />
              <div class="absolute top-5 z-50 w-full text-center pt-10">
                <p class="text-main text-2xl font-semibold">
                  {{ slide.title }}
                </p>
                <p
                  class="text-xs font-medium text-main px-8 pt-5 tracking-wide leading-5"
                >
                  {{ slide.des }}
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
                    @click="customPageChange"
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
import image1 from "../../assets/onboarding screns/onboarding-1.jpg";
import image2 from "../../assets/onboarding screns/onboarding-2.jpg";
import image3 from "../../assets/onboarding screns/onboarding-3.jpg";
import { useRouter } from "vue-router";

const router = useRouter();

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
    des: `ထိုင်းနိုင်ငံအတွင်း ဟိုတယ်ဘိုကင်၊ ကားငှါးဝင်ဆောင်မှုများ၊ ဝင်ကြေးလက်မှတ်များ၊ သီးသန့်ခရီးစဉ်များ၊ အုပ်စုခရီးစဉ်များနှင့် ညအိပ်ခရီးစဉ်များကို ဝယ်ယူနိုင်ပါတယ်။`,
    button: "next page",
  },
  {
    id: 2,
    image: image2,
    title: "အတန်ဆုံးဈေးဖြင့် ရယူလိုက်ပါ",
    des: `ထိုင်းနိုင်ငံရဲ့ Travel & Tour License ကို ရရှိထားပြီး နိုင်ငံတဝှမ်းက ဟိုတယ်များ၊ အလည်အပတ်နေရာများနှင့် Direct Partnership များ ရရှိထားလိုသက်သားစွာ ဘိုကင်တင်နိုင်ပါတယ်`,
    button: "next page",
  },
  {
    id: 3,
    image: image3,
    title: "ပိုမိုသိရှိလေ့လာရန်အတွက်",
    des: `ဧည့်သည်တော်များ ဖတ်ရှုနေတဲ့ ထိုင်းနိုင်ငံအတွင်း Contents တွေဟာ Content နဲ့ Operation Team မှ ကာလကြာမြင့်စွာ အချိန်ယူဖန်တီးထားခဲ့တာပဲ ဖြစ်ပါတယ်`,
    button: "guest",
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

onMounted(() => {
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
