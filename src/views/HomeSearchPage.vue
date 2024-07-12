<script setup>
import HeaderHome from "../components/layout/HeaderHome.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import Layout from "../components/layout/LayoutHome.vue";
import { useHotelStore } from "../stores/hotel";
import { useVantourStore } from "../stores/vantour";
import { useEntranceStore } from "../stores/entrance";
import debounce from "lodash.debounce";

const hotelStore = useHotelStore();
const entranceStore = useEntranceStore();
const vantourStore = useVantourStore();

const router = useRouter();
const route = useRoute();

const searchTag = ref(1);
const searchLists = ref(null);
const searchLoading = ref(false);
const search = ref("");

const type = ref("hotel");

const searchTagChange = async (tag, city_id) => {
  searchTag.value = tag;
  if (city_id != null) {
    if (type.value == "hotel") {
      await getHotelList(city_id);
    } else if (type.value == "entrance") {
      await getEntranceList(city_id);
    } else if (type.value == "vantour") {
      await getVantourList(city_id);
    }
  } else {
    if (type.value == "hotel") {
      await getHotelList();
    } else if (type.value == "entrance") {
      await getEntranceList();
    } else if (type.value == "vantour") {
      await getVantourList();
    }
  }
};

const getHotelList = async (city_id) => {
  searchLoading.value = true;
  const response = await hotelStore.getListAction({
    search: search.value,
    city_id: city_id,
  });
  console.log(response.data);
  searchLists.value = response.data;
  searchLoading.value = false;
};
const getEntranceList = async (city_id) => {
  searchLoading.value = true;
  const response = await entranceStore.getListAction({
    search: search.value,
    city_id: city_id,
  });
  searchLists.value = response.data;
  searchLoading.value = false;
};
const getVantourList = async (city_id) => {
  searchLoading.value = true;
  const response = await vantourStore.getListAction({
    search: search.value,
    city_id: city_id,
  });
  console.log(response.data);
  searchLists.value = response.data;
  searchLoading.value = false;
};

watch(
  search,
  debounce(async () => {
    if (type.value == "hotel") {
      await getHotelList();
    } else if (type.value == "entrance") {
      await getEntranceList();
    } else if (type.value == "vantour") {
      await getVantourList();
    }
    router.push({
      name: "HomeSearch",
      query: {
        search: search.value,
        type: type.value,
      },
    });
  }, 500)
);

watch(type, async () => {
  if (type.value == "hotel") {
    await getHotelList();
  } else if (type.value == "entrance") {
    await getEntranceList();
  } else if (type.value == "vantour") {
    await getVantourList();
  }
  router.push({
    name: "HomeSearch",
    query: {
      search: search.value,
      type: type.value,
    },
  });
});

onMounted(async () => {
  search.value = route.query.search ? route.query.search : "";
  type.value = route.query.type ? route.query.type : "hotel";
  await getHotelList();
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
              type="text"
              v-model="search"
              name=""
              placeholder=" search"
              class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
              id=""
            />

            <img
              :src="searchIcon"
              class="w-5 h-5 absolute top-3.5 right-5 text-main"
              alt=""
            />
          </div>
        </div>
        <div class="pt-5 space-y-2">
          <p class="text-sm font-semibold text-white pb-2">
            choose product type
          </p>
          <div class="flex justify-start items-center gap-2 flex-wrap">
            <p
              class="px-4 py-1.5 text-xs rounded-full"
              :class="
                type == 'hotel'
                  ? 'bg-main text-white border border-white'
                  : 'bg-white text-main'
              "
              @click="type = 'hotel'"
            >
              hotels
            </p>
            <p
              class="px-4 py-1.5 text-xs rounded-full"
              :class="
                type == 'entrance'
                  ? 'bg-main text-white border border-white'
                  : 'bg-white text-main'
              "
              @click="type = 'entrance'"
            >
              entrance tickets
            </p>
            <p
              class="px-4 py-1.5 text-xs rounded-full"
              :class="
                type == 'vantour'
                  ? 'bg-main text-white border border-white'
                  : 'bg-white text-main'
              "
              @click="type = 'vantour'"
            >
              vantours
            </p>

            <p
              class="px-4 py-1.5 text-xs rounded-full"
              :class="
                type == 'inclusive'
                  ? 'bg-main text-white border border-white'
                  : 'bg-white text-main'
              "
              @click="type = 'inclusive'"
            >
              all inclusive
            </p>
            <p
              class="px-4 py-1.5 text-xs rounded-full"
              :class="
                type == 'activity'
                  ? 'bg-main text-white border border-white'
                  : 'bg-white text-main'
              "
              @click="type = 'activity'"
            >
              activities
            </p>
            <p
              class="px-4 py-1.5 text-xs rounded-full"
              :class="
                type == 'ticket'
                  ? 'bg-main text-white border border-white'
                  : 'bg-white text-main'
              "
              @click="type = 'ticket'"
            >
              flight tickets
            </p>
          </div>
        </div>
      </div>
    </HeaderHome>
    <div class="h-auto pb-20 pt-8 space-y-6">
      <div
        class="flex flex-1 justify-start space-x-4 pr-4 items-center overflow-x-scroll scroll-container"
      >
        <div
          class="space-y-2 w-[6.5rem] cursor-pointer ml-6"
          :class="searchTag == 1 ? 'border-b-2 border-main' : ''"
          @click="searchTagChange(1, null)"
        >
          <p
            class="text-xs text-main font-semibold text-center whitespace-nowrap"
          >
            search products
          </p>
        </div>
        <div
          class="space-y-2 w-[4rem] cursor-pointer ml-6"
          :class="searchTag == 2 ? 'border-b-2 border-main' : ''"
          @click="searchTagChange(2, 2)"
        >
          <p
            class="text-xs text-main font-semibold text-center whitespace-nowrap"
          >
            bangkok
          </p>
        </div>
        <div
          class="space-y-2 w-[4rem] cursor-pointer ml-6"
          :class="searchTag == 3 ? 'border-b-2 border-main' : ''"
          @click="searchTagChange(3, 4)"
        >
          <p
            class="text-xs text-main font-semibold text-center whitespace-nowrap"
          >
            pattaya
          </p>
        </div>
        <div
          class="space-y-2 w-[4rem] cursor-pointer ml-6"
          :class="searchTag == 4 ? 'border-b-2 border-main' : ''"
          @click="searchTagChange(4, 9)"
        >
          <p
            class="text-xs text-main font-semibold text-center whitespace-nowrap"
          >
            Phuket
          </p>
        </div>
      </div>
      <div class="px-6">
        <transition-group name="slide" mode="out-in">
          <div
            class="space-y-3 min-h-[600px]"
            v-if="searchTag == 1 && type == 'hotel'"
          >
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in searchLists"
              :key="i"
              @click="router.push(`/home/detail/` + i.id)"
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
                    {{ i?.city?.name }}
                  </p>
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
          <div
            class="space-y-3 min-h-[600px]"
            v-if="searchTag == 1 && type == 'entrance'"
          >
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in searchLists"
              :key="i"
              @click="router.push(`/home/attraction-detail/` + i.id)"
            >
              <img
                :src="i?.cover_image"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">{{ i?.legal_name }}</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p
                    class="bg-black/10 text-[8px] px-2 py-0.5 rounded"
                    v-for="c in i?.cities"
                    :key="c"
                  >
                    {{ c?.name }}
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  {{ i?.lowest_variation_price }}THB
                </p>
              </div>
            </div>
          </div>
          <div
            class="space-y-3 min-h-[600px]"
            v-if="searchTag == 1 && type == 'vantour'"
          >
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in searchLists"
              :key="i"
              @click="router.push(`/home/van-tour-detail/` + i.id)"
            >
              <img
                :src="i?.cover_image"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">{{ i?.name }}</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p
                    class="bg-black/10 text-[8px] px-2 py-0.5 rounded"
                    v-for="c in i?.cities"
                    :key="c"
                  >
                    {{ c?.name }}
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  {{ i?.lowest_car_price }}THB
                </p>
              </div>
            </div>
          </div>
          <div
            class="space-y-3 min-h-[600px]"
            v-if="
              (searchTag == 2 || searchTag == 3 || searchTag == 4) &&
              type == 'hotel'
            "
          >
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in searchLists"
              :key="i"
              @click="router.push(`/home/detail/` + i.id)"
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
                    {{ i?.city?.name }}
                  </p>
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
          <div
            class="space-y-3 min-h-[600px]"
            v-if="
              (searchTag == 2 || searchTag == 3 || searchTag == 4) &&
              type == 'entrance'
            "
          >
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in searchLists"
              :key="i"
              @click="router.push(`/home/attraction-detail/` + i.id)"
            >
              <img
                :src="i?.cover_image"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">{{ i?.legal_name }}</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p
                    class="bg-black/10 text-[8px] px-2 py-0.5 rounded"
                    v-for="c in i?.cities"
                    :key="c"
                  >
                    {{ c?.name }}
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  {{ i?.lowest_variation_price }}THB
                </p>
              </div>
            </div>
          </div>
          <div
            class="space-y-3 min-h-[600px]"
            v-if="
              (searchTag == 2 || searchTag == 3 || searchTag == 4) &&
              type == 'vantour'
            "
          >
            <div
              class="rounded-2xl bg-white shadow grid grid-cols-3 p-3 gap-3"
              v-for="i in searchLists"
              :key="i"
              @click="router.push(`/home/van-tour-detail/` + i.id)"
            >
              <img
                :src="i?.cover_image"
                alt=""
                class="w-full h-full rounded-xl"
              />
              <div class="col-span-2 space-y-1">
                <p class="text-sm font-medium">{{ i?.name }}</p>
                <div
                  class="flex justify-start items-center gap-2 pb-2 flex-wrap"
                >
                  <p
                    class="bg-black/10 text-[8px] px-2 py-0.5 rounded"
                    v-for="c in i?.cities"
                    :key="c"
                  >
                    {{ c?.name }}
                  </p>
                </div>
                <p
                  class="text-sm font-semibold text-white bg-main px-3 py-1 rounded-lg inline-block"
                >
                  {{ i?.lowest_car_price }}THB
                </p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </Layout>
</template>

<style></style>
