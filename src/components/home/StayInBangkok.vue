<template>
  <div class="relative">
    <div
      class="flex justify-between items-center sticky top-0 z-10 py-2 bg-background"
    >
      <h1 class="text-main font-semibold px-6">stays in bangkok</h1>
      <div
        @click="goMore()"
        class="text-[10px] font-semibold text-main cursor-pointer flex justify-end items-center gap-1 mr-6"
      >
        <p>see more</p>
        <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div
      class="flex justify-start items-center overflow-x-scroll space-x-1.5 pt-3 px-6 scroll-container"
    >
      <p
        @click="getList('0-1200')"
        :class="type == '0-1200' ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-0.5 text-[10px] border rounded-full"
      >
        budget <span class="text-[8px]">( &lt; 1200)</span>
      </p>
      <p
        @click="getList('1200-1800')"
        :class="
          type == '1200-1800' ? 'border-main text-main' : 'border-black/10'
        "
        class="whitespace-nowrap px-3 py-0.5 text-[10px] border rounded-full"
      >
        standard <span class="text-[8px]">(1200 - 1800)</span>
      </p>
      <p
        @click="getList('1800-3000')"
        :class="
          type == '1800-3000' ? 'border-main text-main' : 'border-black/10'
        "
        class="whitespace-nowrap px-3 py-0.5 text-[10px] border rounded-full"
      >
        premium <span class="text-[8px]">(1800 - 3000)</span>
      </p>
      <p
        @click="getList('3000-100000')"
        :class="
          type == '3000-100000' ? 'border-main text-main' : 'border-black/10'
        "
        class="whitespace-nowrap px-3 py-0.5 text-[10px] border rounded-full"
      >
        luxury <span class="text-[8px]">(3000+)</span>
      </p>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-6 mt-4"
      v-if="lists.length == 0"
    >
      <div v-for="a in 8" :key="a">
        <!-- v-if="lists.length == 0" -->
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
      v-if="lists.length > 0"
    >
      <div
        class="bg-white shadow-sm rounded-2xl mb-2 border border-black/10"
        v-for="(i, index) in lists"
        :key="index"
        @click="goDetialPage(i?.id)"
      >
        <StayInBangkokCart :i="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
// import StarPartVue from "./StarPart.vue";
// import stayinbangkok from "../../assets/db";
import { useSettingStore } from "../../stores/setting";
import { useRouter } from "vue-router";
import { useHotelStore } from "../../stores/hotel";

import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import StayInBangkokCart from "../../components/LoadingCarts/StayInBangkokCart.vue";
import { storeToRefs } from "pinia";

// const data = ref(null);
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);
const router = useRouter();
const hotelStore = useHotelStore();

const goDetialPage = (id) => {
  router.push({
    name: "HomeDetail",
    params: { id: id },
    query: { language: language.value },
  });
};

const lists = ref([]);

const goMore = () => {
  router.push(
    `/home/hotel-filter/2/Bangkok/?price=null&rating=null&place=null&facilities=null&search=`
  );
};

const type = ref("");

const getList = async (a) => {
  console.log(a, "this is type");
  lists.value = [];
  type.value = a;
  const res = await hotelStore.getListAction({
    city_id: 2,
    price_range: a,
    limit: 8,
  });
  lists.value = res.data;
  console.log(lists.value, "this is stay in bangkkok");
};

onMounted(async () => {
  lists.value = [];
  // data.value = stayinbangkok;
  const res = await hotelStore.getListAction({ city_id: 2, limit: 8 });
  lists.value = res.data;
  // console.log(lists.value, "this is stay in bangkkok");
});
</script>
