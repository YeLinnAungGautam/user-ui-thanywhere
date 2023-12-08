<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import Pagination from "../components/Pagination.vue";
import { useVantourStore } from "../stores/vantour";
import VantourListItem from "../components/VantourListItem.vue";
import { useCityStore } from "../stores/city";
import { useCarStore } from "../stores/car";

const router = useRouter();
const vantourStore = useVantourStore();
const cityStore = useCityStore();
const carStore = useCarStore();

const { vantours, vantour, loading } = storeToRefs(vantourStore);
const { cities } = storeToRefs(cityStore);
const { cars } = storeToRefs(carStore);

const chooseType = ref([]);
const choosePlace = ref([]);

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
  router.push({ name: "vantours-create" });
};

const changePage = async (url) => {
  console.log(url);
  // let data = {
  //   search: search.value,
  //   city_id: city_id.value,
  //   car_id: car_id.value,
  // };
  await vantourStore.getChangePage(url, watchSystem.value);
  // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const getList = async () => {
  const res = await vantourStore.getSimpleListAction();

  for (let i = 0; i < res.result.data.length; i++) {
    chooseType.value.push(res.result.data[i].name);
    choosePlace.value.push(res.result.data[i].place);
  }
};

const clear = () => {
  search.value = "";
  city_id.value = "";
  car_id.value = "";
};

const search = ref("");
const city_id = ref("");
const car_id = ref("");

const changes = async (message) => {
  if ((message = "Deleted")) {
    search.value = "";
    await vantourStore.getListAction();
  }
};

const showPricePage = ref(false);

const watchSystem = computed(() => {
  const result = {};

  if (search.value != "" && search.value != undefined) {
    result.search = search.value;
  }
  if (city_id.value != "" && city_id.value != undefined) {
    result.city_id = city_id.value;
  }
  if (car_id.value != "" && car_id.value != undefined) {
    result.car_id = car_id.value;
  }
  return result;
});

onMounted(async () => {
  await vantourStore.getListAction();
  await getList();
  await carStore.getSimpleListAction();
  await cityStore.getSimpleListAction();
});

watch(search, async (newValue) => {
  await vantourStore.getListAction(watchSystem.value);
});
watch(city_id, async (newValue) => {
  await vantourStore.getListAction(watchSystem.value);
});
watch(car_id, async (newValue) => {
  await vantourStore.getListAction(watchSystem.value);
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
          Van Tours
        </p>
      </div>
      <div
        class="bg-main/10 py-1 pl-3 pr-2 rounded-3xl flex justify-between items-center"
      >
        <div class="mr-2" @click="clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="!search && !city_id && !car_id"
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
            v-if="search || city_id || car_id"
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
          :options="cities?.data"
          label="name"
          v-model="city_id"
          :clearable="false"
          :reduce="(d) => d.id"
          placeholder="City "
        ></v-select>
        <v-select
          class="style-chooser bg-white rounded-full border border-main min-w-[100px]"
          :options="cars?.data"
          label="name"
          v-model="car_id"
          :clearable="false"
          :reduce="(d) => d.id"
          placeholder="Car "
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
        <div v-for="(vantour, index) in vantours?.data" :key="index">
          <VantourListItem
            :id="vantour.id"
            :vantours="vantour"
            @change="changes"
          />
        </div>
      </div>
      <div>
        <Pagination
          v-if="!loading"
          :data="vantours"
          @change-page="changePage"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
