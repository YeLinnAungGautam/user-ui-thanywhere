<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { useEntranceStore } from "../stores/entrance";
import Pagination from "../components/Pagination.vue";
import AttractionListItem from "../components/AttractionListItem.vue";
import { useCityStore } from "../stores/city";
import NoDataPageVue from "../components/NoDataPage.vue";

const router = useRouter();
const entranceStore = useEntranceStore();
const cityStore = useCityStore();

const { entrances, entrance, loading } = storeToRefs(entranceStore);
const { cities } = storeToRefs(cityStore);

const chooseType = ref([]);

const goBack = () => {
  router.go(-1);
};
const createPage = () => {
  router.push({ name: "attraction-create" });
};

const changePage = async (url) => {
  console.log(url);
  // let data = {
  //   search: search.value,
  //   city_id: city_id.value,
  // };
  await entranceStore.getChangePage(url, watchSystem.value);
  // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const getList = async () => {
  const res = await entranceStore.getSimpleListAction();

  for (let i = 0; i < res.data.length; i++) {
    chooseType.value.push(res.data[i].name);
  }
};

// const showEdit = () => {
//   console.log("hello");
// };
const clear = () => {
  search.value = "";
  city_id.value = "";
};

const search = ref("");
const city_id = ref("");

const changes = async (message) => {
  if ((message = "Hotel Deleted")) {
    search.value = "";
    city_id.value = "";
    await getList();
    await entranceStore.getListAction();
  }
};

const watchSystem = computed(() => {
  const result = {};

  if (search.value != "" && search.value != undefined) {
    result.search = search.value;
  }
  if (city_id.value != "" && city_id.value != undefined) {
    result.city_id = city_id.value;
  }
  return result;
});

const entranceList = ref([]);

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  let res = await entranceStore.getListAction();
  await cityStore.getSimpleListAction();
  entranceList.value = res.data;
  await getList();
});

const searchAction = async () => {
  console.log(watchSystem.value, "this is watch");
  const res = await entranceStore.getListAction(watchSystem.value);
  entranceList.value = res.data;
};

watch(search, async (newValue) => {
  entranceList.value = [];
  await searchAction();
});
watch(city_id, async (newValue) => {
  entranceList.value = [];
  await searchAction();
});

// infinite scrolling part

const handleScroll = () => {
  const bottomOfWindow =
    Math.floor(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.offsetHeight - 100;
  // console.log(bottomOfWindow);

  if (bottomOfWindow) {
    console.log("This is the bottom of the window");
    // console.log(entrances?.value.meta.current_page, "this is hotel");
    if (entrances?.value.meta.current_page < entrances?.value.meta.last_page) {
      changePage(
        entrances?.value.meta.links[entrances?.value.meta.current_page + 1].url
      );
    }
  }

  const scrolledDown = document.documentElement.scrollTop > 250.39999389648438;
  // console.log(document.documentElement.scrollTop, "this is top");
  if (scrolledDown) {
    showSearch.value = true;
  } else {
    showSearch.value = false;
  }
};

const showSearch = ref(false);

const searchActionButton = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

watch(entrances, async (newValue) => {
  entranceList.value = [...entranceList.value, ...newValue.data];

  console.log(entranceList.value, "this is add new");
});
</script>

<template>
  <div class="bg-white">
    <NavbarVue />
    <div class="py-5 px-4 space-y-4">
      <div class="relative">
        <div
          class="flex justify-start items-center gap-2 text-main absolute top-0 text-sm"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </div>

        <p class="text-main text-lg font-semibold w-full text-center">
          Attractions
        </p>
      </div>
      <div
        class="bg-main/5 py-2 pl-3 pr-2 rounded-xl shadow flex justify-between items-center"
      >
        <div class="mr-2" @click="clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="!search && !city_id"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-main"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <img
            v-if="search || city_id"
            src="../../public/clear-svgrepo-com (1).svg"
            class="w-6 h-6"
            alt=""
          />
          <!-- <p class="text-main">Search</p> -->
        </div>
        <v-select
          class="style-chooser w-full"
          :options="chooseType"
          v-model="search"
          label="name"
          :clearable="false"
          :reduce="(d) => d"
          placeholder="Search"
        ></v-select>
        <!-- @option:selected="chooseName()" -->
      </div>
      <div class="flex py-1.5 mb-5 gap-3 flex-wrap">
        <v-select
          class="style-chooser bg-white rounded-xl border border-main min-w-[100px]"
          :options="cities?.data"
          label="name"
          :clearable="false"
          v-model="city_id"
          :reduce="(d) => d.id"
          placeholder="City"
        ></v-select>
      </div>
      <div
        class="pb-3 pt-4 px-4 flex justify-end text-main font-semibold border-b border-b-black/20 bg-white sticky -top-1 z-20"
        v-if="showSearch"
        @click="searchActionButton"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        search
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 pb-5">
        <div v-for="(entrance, index) in entranceList" :key="index">
          <AttractionListItem
            :id="entrance.id"
            :attractions="entrance"
            @change="changes"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 pt-2">
        <div
          class="space-y-2 col-span-1 md:col-span-2"
          v-if="entranceList.length == 0"
        >
          <NoDataPageVue />
        </div>
      </div>
      <div
        class="relative flex justify-center items-center py-[30%]"
        v-if="loading"
      >
        <div
          class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-main"
        ></div>
        <img src="../../public/logo.jpg" class="rounded-full h-16 w-16" />
      </div>
      <!-- <div>
        <Pagination
          v-if="!loading"
          :data="entrances"
          @change-page="changePage"
        />
      </div> -->
    </div>
  </div>
</template>

<style></style>
