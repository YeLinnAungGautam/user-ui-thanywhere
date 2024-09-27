<script setup>
import HeaderHome from "../components/layout/HeaderHome.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import searchIcon from "../assets/icons/search.png";
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import Layout from "../components/layout/LayoutHome.vue";
import { useHotelStore } from "../stores/hotel";
import { useVantourStore } from "../stores/vantour";
import { useEntranceStore } from "../stores/entrance";
import SearchCart from "../components/LoadingCarts/SearchCart.vue";
import debounce from "lodash.debounce";
import { useSettingStore } from "../stores/setting";
import LoadingImageCover from "../assets/web/loadingImageCover.jpg";
import { storeToRefs } from "pinia";

const hotelStore = useHotelStore();
const entranceStore = useEntranceStore();
const vantourStore = useVantourStore();
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

const router = useRouter();
const route = useRoute();

const searchTag = ref(1);
const searchLists = ref(null);
const searchLoading = ref(false);
const search = ref("");

const type = ref("hotel");
// const loading = ref(false);

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
  searchLoading.value = false;
  searchLists.value = response.data;
};
const getEntranceList = async (city_id) => {
  searchLoading.value = true;
  const response = await entranceStore.getListAction({
    search: search.value,
    city_id: city_id,
  });
  searchLoading.value = false;
  searchLists.value = response.data;
};
const getVantourList = async (city_id) => {
  searchLoading.value = true;
  const response = await vantourStore.getListAction({
    search: search.value,
    city_id: city_id,
  });
  console.log(response.data);
  searchLoading.value = false;
  searchLists.value = response.data;
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
  searchTag.value = 1;
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

const goSearchResultPage = () => {
  console.log("hello , ", type.value);
  if (type.value == "hotel") {
    router.push({
      name: "FilteredHotelBookings",
      params: {
        id: "null",
        name: "null",
      },
      query: {
        price: "null",
        rating: "null",
        place: "null",
        facilities: "null",
        search: search.value ? search.value : "",
      },
    });
  }
  if (type.value == "entrance") {
    router.push({
      name: "HomeAttractionResult",
      params: {
        id: "null",
        name: "null",
      },
      query: {
        search: search.value ? search.value : "",
      },
    });
  }
};

onMounted(async () => {
  await settingStore.getLanguage();
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
          <ChevronLeftIcon
            class="w-6 h-6 text-white"
            @click="router.push('/home')"
          />
          <div class="relative w-full">
            <input
              type="text"
              v-model="search"
              name=""
              placeholder=" search"
              class="w-full rounded-full shadow-custom-input px-6 py-4 text-xs text-main focus:outline-none"
              id=""
            />

            <div
              @click="goSearchResultPage"
              class="absolute top-2 right-2 bg-main px-3 py-2 rounded-full shadow-custom flex justify-end items-center gap-1"
            >
              <img :src="searchIcon" class="w-4 h-4" alt="" />
              <p class="text-white text-xs">search</p>
            </div>
          </div>
        </div>
        <div class="pt-5 space-y-2 pb-4">
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

            <!-- <p
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
            </p> -->
          </div>
        </div>
      </div>
    </HeaderHome>
    <div class="h-auto pb-20 pt-2 relative z-10 space-y-6">
      <div
        class="flex flex-1 justify-start space-x-4 pr-4 items-center overflow-x-scroll scroll-container"
      >
        <div
          class="space-y-1 w-auto cursor-pointer ml-6"
          @click="searchTagChange(1, null)"
        >
          <p
            class="text-xs font-semibold text-center whitespace-nowrap"
            :class="searchTag == 1 ? 'text-main' : 'text-black/40'"
          >
            Top selling
          </p>
          <p
            class="bg-main w-1 h-1 rounded-full mx-auto"
            :class="searchTag == 1 ? 'opacity-100' : 'opacity-0'"
          ></p>
        </div>
        <div
          class="space-y-1 w-auto cursor-pointer ml-6"
          @click="searchTagChange(2, 2)"
        >
          <p
            class="text-xs font-semibold text-center whitespace-nowrap"
            :class="searchTag == 2 ? 'text-main' : 'text-black/40'"
          >
            Bangkok
          </p>
          <p
            class="bg-main w-1 h-1 rounded-full mx-auto"
            :class="searchTag == 2 ? 'opacity-100' : 'opacity-0'"
          ></p>
        </div>
        <div
          class="space-y-1 w-auto cursor-pointer ml-6"
          @click="searchTagChange(3, 4)"
        >
          <p
            class="text-xs font-semibold text-center whitespace-nowrap"
            :class="searchTag == 3 ? 'text-main' : 'text-black/40'"
          >
            Pattaya
          </p>
          <p
            class="bg-main w-1 h-1 rounded-full mx-auto"
            :class="searchTag == 3 ? 'opacity-100' : 'opacity-0'"
          ></p>
        </div>
        <div
          class="space-y-1 w-auto cursor-pointer ml-6"
          @click="searchTagChange(4, 9)"
        >
          <p
            class="text-xs font-semibold text-center whitespace-nowrap"
            :class="searchTag == 4 ? 'text-main' : 'text-black/40'"
          >
            Phuket
          </p>
          <p
            class="bg-main w-1 h-1 rounded-full mx-auto"
            :class="searchTag == 4 ? 'opacity-100' : 'opacity-0'"
          ></p>
        </div>
      </div>
      <div class="px-6 space-y-3" v-show="searchLoading">
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
      <div class="px-6" v-show="!searchLoading">
        <div
          class="space-y-3 min-h-[600px]"
          v-if="searchTag == 1 && type == 'hotel'"
        >
          <div
            class="rounded-2xl bg-white shadow gap-3"
            v-for="i in searchLists"
            :key="i"
            @click="
              router.push(`/home/detail/` + i.id + `?language=${language}`)
            "
          >
            <SearchCart
              :image="i?.images[0]?.image"
              :name="i?.name"
              :city_name="i?.city?.name"
              :price="i?.lowest_room_price"
              :price_unit="i?.lowest_walk_in_price"
            />
          </div>
        </div>
        <div
          class="space-y-3 min-h-[600px]"
          v-if="searchTag == 1 && type == 'entrance'"
        >
          <div
            class="rounded-2xl bg-white shadow gap-3"
            v-for="i in searchLists"
            :key="i"
            @click="
              router.push(
                `/home/attraction-detail/` + i.id + `?language=${language}`
              )
            "
          >
            <SearchCart
              :image="i?.cover_image"
              :name="i?.legal_name"
              :city_name="i?.cities"
              :price="i?.lowest_variation_price"
              :price_unit="i?.lowest_walk_in_price"
            />
          </div>
        </div>
        <div
          class="space-y-3 min-h-[600px]"
          v-if="searchTag == 1 && type == 'vantour'"
        >
          <div
            class="rounded-2xl bg-white shadow gap-3"
            v-for="i in searchLists"
            :key="i"
            @click="
              router.push(
                `/home/van-tour-detail/` + i.id + `?language=${language}`
              )
            "
          >
            <SearchCart
              :image="i?.cover_image"
              :name="i?.name"
              :city_name="i?.cities"
              :price="i?.lowest_car_price"
              :price_unit="i?.lowest_walk_in_price"
            />
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
            class="rounded-2xl bg-white shadow gap-3"
            v-for="i in searchLists"
            :key="i"
            @click="
              router.push(`/home/detail/` + i.id + `?language=${language}`)
            "
          >
            <SearchCart
              :image="i?.images[0]?.image"
              :name="i?.name"
              :city_name="i?.city?.name"
              :price="i?.lowest_room_price"
              :price_unit="i?.lowest_walk_in_price"
            />
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
            class="rounded-2xl bg-white shadow gap-3"
            v-for="i in searchLists"
            :key="i"
            @click="
              router.push(
                `/home/attraction-detail/` + i.id + `?language=${language}`
              )
            "
          >
            <SearchCart
              :image="i?.cover_image"
              :name="i?.legal_name"
              :city_name="i?.cities"
              :price="i?.lowest_variation_price"
              :price_unit="i?.lowest_walk_in_price"
            />
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
            class="rounded-2xl bg-white shadow gap-3"
            v-for="i in searchLists"
            :key="i"
            @click="
              router.push(
                `/home/van-tour-detail/` + i.id + `?language=${language}`
              )
            "
          >
            <SearchCart
              :image="i?.cover_image"
              :name="i?.name"
              :city_name="i?.cities"
              :price="i?.lowest_car_price"
              :price_unit="i?.lowest_walk_in_price"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style></style>
