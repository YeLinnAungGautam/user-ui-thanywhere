<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import Pagination from "../components/Pagination.vue";
import { useAirLineStore } from "../stores/airline";
import AirLineItem from "../components/AirLineItem.vue";
import NoDataPageVue from "../components/NoDataPage.vue";

const router = useRouter();
const airlineStore = useAirLineStore();

const { airlines, airline, loading } = storeToRefs(airlineStore);

const chooseType = ref([]);

const goRoom = (id) => {
  router.push({
    name: "room",
    params: {
      id: id,
    },
  });
};
const goBack = () => {
  router.go(-1);
};
const createPage = () => {
  router.push({ name: "airline-create" });
};

const changePage = async (url) => {
  console.log(url);
  // let data = {
  //   search: search.value,
  // };
  await airlineStore.getChangePage(url, watchSystem.value);
  // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const getList = async () => {
  const res = await airlineStore.getSimpleListAction();

  for (let i = 0; i < res.data.length; i++) {
    chooseType.value.push(res.data[i].name);
  }
};

// const showEdit = () => {
//   console.log("hello");
// };
const clear = () => {
  search.value = "";
  priceShow.value = false;
  max_price.value = "";
};

const search = ref("");
const priceShow = ref(false);
const max_price = ref("");

const changes = async (message) => {
  if ((message = "Deleted")) {
    search.value = "";
    await airlineStore.getListAction();
  }
};

const watchSystem = computed(() => {
  const result = {};

  if (search.value != "" && search.value != undefined) {
    result.search = search.value;
  }
  if (max_price.value != "" && max_price.value != undefined) {
    result.max_price = max_price.value;
  }
  return result;
});

onMounted(async () => {
  await airlineStore.getListAction();
  await getList();
});

watch(search, async (newValue) => {
  await airlineStore.getListAction(watchSystem.value);
});
watch(max_price, async (newValue) => {
  await airlineStore.getListAction(watchSystem.value);
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
          AirLines
        </p>
      </div>
      <div
        class="bg-main/5 py-2 pl-3 pr-2 rounded-xl flex justify-between items-center shadow"
      >
        <div class="mr-2" @click="clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="!search && !max_price"
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
            v-if="search || max_price"
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
        <div
          @click="priceShow = true"
          class="bg-white rounded-xl border border-main min-w-[100px] text-main px-4 py-1"
        >
          <div class="flex justify-between items-center" v-if="!priceShow">
            price
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.9"
              stroke="currentColor"
              class="w-4 h-4 font-bold"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <div v-if="priceShow" class="pt-1 flex justify-center items-center">
            <input
              type="range"
              v-model="max_price"
              min="0"
              class="bg-main mr-2"
              max="1000"
            />
            {{ max_price }} THB
          </div>
        </div>
      </div>
      <div
        class="relative flex justify-center items-center py-[50%]"
        v-if="loading"
      >
        <div
          class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-main"
        ></div>
        <img src="../../public/logo.jpg" class="rounded-full h-16 w-16" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5" v-if="!loading">
        <div v-for="(airline, index) in airlines?.data" :key="index">
          <AirLineItem :id="airline.id" :airlines="airline" @change="changes" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5" v-if="!loading">
        <div
          class="space-y-2 col-span-1 md:col-span-2"
          v-if="airlines?.data.length == 0"
        >
          <NoDataPageVue />
        </div>
      </div>
      <div>
        <Pagination
          v-if="!loading"
          :data="airlines"
          @change-page="changePage"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
