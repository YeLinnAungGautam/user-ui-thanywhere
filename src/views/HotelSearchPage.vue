<script setup>
import HeaderHome from "../components/layout/HeaderHome.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import Layout from "../components/layout/LayoutHome.vue";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
import stayinbangkok from "../assets/db";

const cityStore = useCityStore();

const { cities, loading } = storeToRefs(cityStore);

const router = useRouter();

const searchTag = ref(1);

const goResultPage = () => {
  if (searchId.value) {
    router.push({
      name: "FilteredHotelBookings",
      // params: { id: searchId.value, name: search.value, price: "20000" },
      params: {
        id: searchId.value ? searchId.value : "null",
        name: search.value ? search.value : "null",
        price: "null",
        rating: "null",
        place: "null",
      },
    });
  }
};

const search = ref("Bangkok");
const searchId = ref(2);

const searchFunction = (data) => {
  search.value = data.name;
  searchId.value = data.id;
};

const all = ref(false);
const data = stayinbangkok;

const getCityData = async () => {
  await cityStore.getSimpleListAction();
};

onMounted(async () => {
  await getCityData();
  console.log(cities.value);
});

watch(searchId, () => {
  goResultPage();
});
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
              v-model="search"
              placeholder=" search"
              class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
              id=""
            />

            <img
              @click="goResultPage"
              :src="searchIcon"
              class="w-5 h-5 absolute top-3.5 right-5 text-main"
              alt=""
            />
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
          <div
            class="flex justify-start items-center gap-2 flex-wrap"
            v-if="!loading"
          >
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
          class="space-y-2 w-[5.5rem] cursor-pointer ml-6"
          :class="searchTag == 1 ? 'border-b-2 border-main' : ''"
          @click="searchTag = 1"
        >
          <p class="text-xs text-main font-semibold text-center text-nowrap">
            top searches
          </p>
        </div>
        <div
          class="space-y-2 w-[6.5rem] cursor-pointer ml-6"
          :class="searchTag == 2 ? 'border-b-2 border-main' : ''"
          @click="searchTag = 2"
        >
          <p class="text-xs text-main font-semibold text-center text-nowrap">
            trending hotels
          </p>
        </div>
      </div>
      <div class="px-6">
        <transition-group name="slide" mode="out-in">
          <div class="space-y-3 min-h-[600px]" v-if="searchTag == 1">
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in data"
              :key="i"
            >
              <img
                :src="i?.images[0]?.image"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">{{ i?.name }}</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    {{ i?.place }}
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  {{ i?.lowest_room_price }}THB
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-3 min-h-[600px]" v-if="searchTag == 2">
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in data"
              :key="i"
            >
              <img
                :src="i?.images[0]?.image"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">{{ i?.name }}</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p class="bg-black/10 text-[8px] px-2 py-0.5 rounded">
                    {{ i?.place }}
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  {{ i?.lowest_room_price }}THB
                </p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </Layout>
</template>
