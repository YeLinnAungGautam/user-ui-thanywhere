<script setup>
import HeaderHome from "../components/layout/HeaderHome.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import searchIcon from "../assets/icons/search.png";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import Layout from "../components/layout/LayoutHome.vue";
import { useCityStore } from "../stores/city";
import { useSettingStore } from "../stores/setting";
import { storeToRefs } from "pinia";
// import vantourdb from "../assets/vantourdb";
import debounce from "lodash.debounce";
import { useDestinationStore } from "../stores/destination";
import LoadingImageCover from "../assets/web/loadingImageCover.jpg";
import SearchCart from "../components/LoadingCarts/SearchCart.vue";

const cityStore = useCityStore();

const { cities } = storeToRefs(cityStore);
const destinationStore = useDestinationStore();
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);
const { dests, loading } = storeToRefs(destinationStore);

const search = ref("Bangkok");
const searchId = ref(2);
const search_by_name = ref("");

const searchFunction = (data) => {
  search.value = data.name;
  searchId.value = data.id;
};

const router = useRouter();

const searchTag = ref(1);

const goResultPage = () => {
  // router.push("/home/attraction-result");
  if (searchId.value) {
    router.push({
      name: "HomeDestinationResult",
      // params: { id: searchId.value, name: search.value, price: "20000" },
      params: {
        id: searchId.value ? searchId.value : "null",
        name: search.value ? search.value : "null",
      },
      query: {
        search: search_by_name.value ? search_by_name.value : "",
      },
    });
  }
};

const all = ref(false);
// const data = vantourdb;

const getHotelData = async () => {
  await destinationStore.getListAction({
    search: search_by_name.value,
    city_id: searchId.value,
  });
};

const goDetail = (id) => {
  router.push(`/home/destination-detail/${id}?language=${language.value}`);
};

onMounted(async () => {
  await cityStore.getSimpleListAction();
  await destinationStore.getListAction();
  console.log(cities.value);
});

watch(
  [search_by_name, searchId],
  debounce(async () => {
    await getHotelData();
  }, 500)
);
</script>

<template>
  <Layout>
    <HeaderHome :showTitle="false">
      <div class="px-6">
        <div class="flex justify-start items-center gap-6">
          <ChevronLeftIcon class="w-6 h-6 text-white" @click="router.back()" />
          <div class="relative w-full">
            <input
              type="search"
              name=""
              v-model="search_by_name"
              @keyup.enter="goResultPage"
              placeholder=" search"
              class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
              id=""
            />

            <div
              @click="goResultPage"
              class="absolute top-2 right-2 bg-main px-3 py-2 rounded-full shadow-custom flex justify-end items-center gap-1"
            >
              <img :src="searchIcon" class="w-4 h-4" alt="" />
              <p class="text-white text-xs">search</p>
            </div>
          </div>
        </div>
        <div class="pt-5 space-y-2">
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-white pb-2">
              most popular cities
            </p>
            <p
              class="text-white text-[10px] cursor-pointer"
              @click="all = !all"
            >
              {{ all ? "show less" : "show more" }}
            </p>
          </div>
          <div class="flex justify-start items-center gap-2 flex-wrap">
            <div v-for="(c, index) in cities?.data" :key="c.id">
              <p
                v-if="index < 6 || all"
                @click="searchFunction(c)"
                class="px-4 py-1.5 text-[10px] rounded-full"
                :class="
                  searchId == c.id
                    ? 'bg-main/40 border border-white text-white'
                    : 'bg-white text-main'
                "
              >
                {{ c?.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeaderHome>
    <div class="h-auto pb-20 pt-8 space-y-6">
      <div
        class="flex flex-1 justify-start space-x-4 pr-4 items-center overflow-x-scroll scroll-container"
      >
        <div
          class="space-y-1 w-[5.5rem] cursor-pointer ml-6"
          :class="searchTag == 1 ? 'text-main' : 'text-black/60'"
          @click="searchTag = 1"
        >
          <p class="text-xs font-semibold text-center text-nowrap">
            {{ dests?.meta.total }} searches
          </p>
          <p
            class="bg-main w-1 h-1 rounded-full mx-auto"
            :class="searchTag == 1 ? 'opacity-100' : 'opacity-0'"
          ></p>
        </div>
        <div
          class="space-y-1 w-[6.5rem] cursor-pointer ml-6"
          :class="searchTag == 2 ? 'text-main' : 'text-black/60'"
          @click="searchTag = 2"
        >
          <p class="text-xs font-semibold text-center text-nowrap">
            trending attractions
          </p>
          <p
            class="bg-main w-1 h-1 rounded-full mx-auto"
            :class="searchTag == 2 ? 'opacity-100' : 'opacity-0'"
          ></p>
        </div>
      </div>
      <div class="px-6 space-y-3" v-show="loading">
        <div
          class="grid grid-cols-3 gap-3 rounded-2xl bg-white shadow px-3 py-3"
          v-for="i in 10"
          :key="i"
        >
          <div class="w-full h-[80px] overflow-hidden">
            <img
              :src="LoadingImageCover"
              alt=""
              class="w-full h-full rounded-xl opacity-50"
            />
          </div>
          <div class="col-span-2 space-y-2">
            <p
              class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-1"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-[50px] h-3 animate-pulse mt-2"
            ></p>

            <button
              class="bg-main animate-pulse text-sm font-semibold text-white px-3 py-1 rounded-lg inline-block"
            >
              loading
            </button>
          </div>
        </div>
      </div>
      <div class="px-6">
        <div class="space-y-3 min-h-[600px]" v-if="searchTag == 1 && !loading">
          <div
            class="rounded-2xl bg-white shadow gap-3"
            v-for="i in dests?.data"
            :key="i"
            @click="goDetail(i?.id)"
          >
            <SearchCart
              :image="i?.feature_img"
              :name="i?.name"
              :city_name="i?.city?.name"
              :price="'read about '"
            />
          </div>
        </div>
        <div class="space-y-3 min-h-[600px]" v-if="searchTag == 2 && !loading">
          <div
            class="rounded-2xl bg-white shadow gap-3"
            v-for="i in dests?.data"
            :key="i"
            @click="goDetail(i?.id)"
          >
            <SearchCart
              :image="i?.feature_img"
              :name="i?.name"
              :city_name="i?.city?.name"
              :price="'read about '"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
