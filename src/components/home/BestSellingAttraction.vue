<template>
  <div class="relative">
    <div
      class="flex justify-between items-center sticky z-10 top-0 py-2 bg-background"
    >
      <h1 class="text-main font-semibold px-6">best selling attractions</h1>
      <div
        @click="router.push('/home/attraction')"
        class="text-[10px] font-semibold text-main flex justify-end items-center gap-1 mr-6"
      >
        <p>see more</p>
        <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div
      class="flex justify-start items-center overflow-x-scroll space-x-1.5 pt-1 px-6 scroll-container"
    >
      <p
        @click="category_id = 32"
        :class="category_id == 32 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        amusement park
      </p>
      <p
        @click="category_id = 40"
        :class="category_id == 40 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        dinner cruises
      </p>
      <p
        @click="category_id = 31"
        :class="category_id == 31 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        water parks
      </p>
      <p
        @click="category_id = 17"
        :class="category_id == 17 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        safari
      </p>
      <p
        @click="category_id = 16"
        :class="category_id == 16 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        museums
      </p>
      <p
        @click="category_id = 29"
        :class="category_id == 29 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        theme parks
      </p>
      <p
        @click="category_id = 54"
        :class="category_id == 54 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        buffet
      </p>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-6 mt-4"
      v-if="data.length == 0"
    >
      <div v-for="a in 8" :key="a">
        <!-- v-if="data.length == 0" -->
        <div class="bg-white shadow-sm rounded-2xl mb-2 border border-black/10">
          <div class="w-full h-[140px] p-1.5 overflow-hidden">
            <img
              :src="LoadingImageCover"
              class="w-full h-full object-cover opacity-30 rounded-xl"
              alt=""
            />
          </div>
          <div class="px-3 py-1">
            <p
              class="text-main text-[10px] bg-black/20 w-10 h-2 animate-pulse"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-2"
            ></p>
            <p
              class="text-main text-[10px] bg-black/20 w-10 h-3 mt-2 animate-pulse"
            ></p>
            <p
              class="text-main text-[10px] bg-black/20 w-full h-2 mt-2 animate-pulse"
            ></p>
            <p
              class="text-main text-[10px] bg-black/20 w-full h-2 mt-1 animate-pulse"
            ></p>
            <p
              class="text-main text-[10px] bg-black/20 w-full h-2 mt-1 animate-pulse"
            ></p>
            <p
              class="text-main text-[10px] bg-black/20 w-10 h-3 mt-4 animate-pulse"
            ></p>
            <button
              class="bg-main animate-pulse px-3 mt-2 mb-2 py-1 rounded-xl text-xs font-semibold text-white"
            >
              loading
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-6 mt-4"
      v-if="data.length > 0"
    >
      <div
        class="bg-white shadow-sm rounded-2xl mb-2 border border-black/10"
        v-for="(i, index) in data"
        :key="index"
        @click="goDetialPage(i.id)"
      >
        <!-- <div class="w-full h-[140px] p-1.5 overflow-hidden">
          <img
            :src="i.cover_image"
            class="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </div>
        <div class="px-3 py-0">
          <StarPartVue :count="3" />
          <p class="font-semibold text-sm pt-1">{{ i.name }}</p>
          <p class="text-[8px] bg-black/10 rounded-md py-0.5 px-1 inline-block">
            {{ i?.cities[0]?.name }}
          </p>
          <p class="text-[9px] pt-1 max-h-[44px] overflow-hidden">
            {{
              language == "english"
                ? i?.full_description_en
                : i?.long_description
            }}
          </p>
          <p class="text-xs mt-2 font-medium">starting car price</p>
          <button
            class="bg-main px-4 mt-2 mb-3 py-0.5 rounded-2xl text-sm text-white"
          >
            {{ i?.lowest_car_price }}THB
          </button>
        </div> -->
        <BestSellingAttractionVue :i="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref, watch } from "vue";
// import StarPartVue from "./StarPart.vue";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";
import { useRouter } from "vue-router";
import { useEntranceStore } from "../../stores/entrance";
import BestSellingAttractionVue from "../../components/LoadingCarts/BestSellingAttraction.vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";

// const seeMore = ref(true);
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);
const entranceStore = useEntranceStore();

const router = useRouter();
const data = ref([]);

const goDetialPage = (id) => {
  router.push({
    name: "HomeAttractionDetail",
    params: { id: id },
    query: { language: language.value },
  });
};

const category_id = ref(40);
// const list = ref([]);

watch(category_id, async (newValue) => {
  if (newValue) {
    data.value = [];
    const res = await entranceStore.getListAction({
      city_id: 2,
      category_id: category_id.value,
    });
    data.value = res.data;
  }
});

onMounted(async () => {
  await settingStore.getLanguage();
  data.value = [];
  const res = await entranceStore.getListAction({ limit: 8 });
  data.value = res.data;
  console.log("====================================");
  console.log(data.value, "this is data");
  console.log("====================================");
});
</script>
