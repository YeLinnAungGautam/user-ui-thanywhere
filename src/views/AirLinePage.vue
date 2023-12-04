<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import Pagination from "../components/Pagination.vue";
import { useAirLineStore } from "../stores/airline";
import AirLineItem from "../components/AirLineItem.vue";

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
  let data = {
    search: search.value,
  };
  await airlineStore.getChangePage(url, data);
  // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const getList = async () => {
  const res = await airlineStore.getSimpleListAction();

  for (let i = 0; i < res.result.data.length; i++) {
    chooseType.value.push(res.result.data[i].name);
  }
};

// const showEdit = () => {
//   console.log("hello");
// };
const clear = () => {
  search.value = "";
};

const search = ref("");

const changes = async (message) => {
  if ((message = "Deleted")) {
    search.value = "";
    await airlineStore.getListAction();
  }
};

onMounted(async () => {
  await airlineStore.getListAction();
  await getList();
});

watch(search, async (newValue) => {
  await airlineStore.getListAction({ search: search.value });
});
</script>

<template>
  <div class="bg-white">
    <NavbarVue />
    <div class="py-5 px-4 space-y-4">
      <div class="relative">
        <div
          class="flex justify-start items-center gap-2 text-main absolute top-1"
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
        <div
          class="bg-main text-white p-2 rounded-full absolute top-[-5px] right-0"
          @click="createPage"
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
              d="M12 6v12m6-6H6"
            />
          </svg>
        </div>
        <p class="text-main text-2xl font-semibold w-full text-center">
          AirLines
        </p>
      </div>
      <div
        class="bg-main/10 py-2 pl-3 pr-2 rounded-3xl flex justify-between items-center"
      >
        <div class="mr-2" @click="clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="!search"
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
            v-if="search"
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
          class="style-chooser bg-white rounded-full border border-main min-w-[100px]"
          :options="chooseType"
          label="name"
          :clearable="false"
          :reduce="(d) => d.name"
          placeholder="Filter "
        ></v-select>
        <v-select
          class="style-chooser bg-white rounded-full border border-main min-w-[100px]"
          :options="chooseType"
          label="name"
          :clearable="false"
          :reduce="(d) => d.name"
          placeholder="Filter"
        ></v-select>
        <v-select
          class="style-chooser bg-white rounded-full border border-main min-w-[100px]"
          :options="chooseType"
          label="name"
          :clearable="false"
          :reduce="(d) => d.name"
          placeholder="Filter"
        ></v-select>
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
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 pt-2"
        v-if="!loading"
      >
        <div v-for="(airline, index) in airlines?.data" :key="index">
          <AirLineItem :id="airline.id" :airlines="airline" @change="changes" />
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
