<template>
  <div class="relative">
    <div
      class="flex justify-between items-center sticky top-0 py-2 bg-background"
    >
      <h1 class="text-main font-semibold px-6">best selling van tours</h1>
      <div
        @click="router.push('/home/van-tour')"
        class="text-[10px] font-semibold text-main flex justify-end items-center gap-1 mr-6"
      >
        <p>see more</p>
        <ChevronDownIcon class="w-3 h-3" />
      </div>
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
        <BestSellingVantourVue :i="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
// import StarPartVue from "./StarPart.vue";
// import { storeToRefs } from "pinia";
// import { useSettingStore } from "../../stores/setting";
import { useRouter } from "vue-router";
import { useVantourStore } from "../../stores/vantour";
import BestSellingVantourVue from "../../components/LoadingCarts/BestSellingVantour.vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";

// const seeMore = ref(true);
// const settingStore = useSettingStore();
// const { language } = storeToRefs(settingStore);
const vantourStore = useVantourStore();

const router = useRouter();
const data = ref([]);

const goDetialPage = (id) => {
  router.push({ name: "HomeVantourDetail", params: { id: id } });
};

onMounted(async () => {
  data.value = [];
  const res = await vantourStore.getListAction({ limit: 8 });
  data.value = res.data;
});
</script>
