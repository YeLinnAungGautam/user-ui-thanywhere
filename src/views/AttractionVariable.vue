<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import VariationItem from "../components/VariationItem.vue";
import { useEntranceStore } from "../stores/entrance";
import { useVariationStore } from "../stores/variations";
import NoDataPage from "../components/NoDataPage.vue";
import Pagination from "../components/Pagination.vue";

const router = useRouter();
const route = useRoute();
const entranceStore = useEntranceStore();
const variationStore = useVariationStore();

const { entrance } = storeToRefs(entranceStore);
const { variations, variation, loading } = storeToRefs(variationStore);

const chooseType = ref([
  { id: 1, name: "van tour" },
  { id: 2, name: "group tour" },
  { id: 3, name: "hotel" },
  { id: 4, name: "attraction" },
]);

const variation_id = ref("");
const variation_name = ref("");
const priceShow = ref(false);
const max_price = ref("");

const createPage = () => {
  router.push({
    name: "variations-create",
  });
};

const goBack = () => {
  router.go(-1);
};

const clear = () => {
  variation_id.value = "";
  variation_name.value = "";
  max_price.value = "";
  priceShow.value = false;
};

const changePage = async (url) => {
  console.log(url);
  // let data = {
  //   variation_id: variation_id.value,
  // };
  await roomStore.getChangePage(url, watchSystem.value);
};

const changes = async (message) => {
  if ((message = "Room Deleted")) {
    variation_id.value = "";
  }
};

const watchSystem = computed(() => {
  const result = {};

  if (variation_id.value != "" && variation_id.value != undefined) {
    result.entrance_ticket_id = variation_id.value;
  }
  if (max_price.value != "" && max_price.value != undefined) {
    result.max_price = max_price.value;
  }
  return result;
});

onMounted(async () => {
  variation_id.value = route.params.id;
  variation_name.value = route.params.name;
  await entranceStore.getSimpleListAction();
});

watch(variation_id, async (newValue) => {
  await variationStore.getListAction(watchSystem.value);
});
watch(max_price, async (newValue) => {
  await variationStore.getListAction(watchSystem.value);
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
          Variations
        </p>
      </div>
      <div
        class="bg-main/5 py-2 pl-3 pr-2 rounded-xl shadow flex justify-between items-center"
      >
        <div class="mr-2" @click="clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="!variation_id && !max_price"
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
            v-if="variation_id || max_price"
            src="../../public/clear-svgrepo-com (1).svg"
            class="w-6 h-6"
            alt=""
          />
          <!-- <p class="text-main">Search</p> -->
        </div>
        <p
          v-if="variation_name"
          class="text-start ml-2 py-1 text-base text-main w-full"
        >
          {{ variation_name }}
        </p>
        <v-select
          v-if="!variation_name"
          class="style-chooser w-full"
          :options="entrance?.data"
          v-model="variation_id"
          label="name"
          :clearable="false"
          :reduce="(d) => d.id"
          placeholder="Search"
        ></v-select>
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
              max="10000"
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
        <div
          class="space-y-2"
          v-for="(variation, index) in variations?.data"
          :key="index"
        >
          <VariationItem
            :id="variation.id"
            :variations="variation"
            @change="changes"
          />
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 pt-2"
        v-if="!loading"
      >
        <div
          class="space-y-2 col-span-1 md:col-span-2"
          v-if="variations?.data.length == 0"
        >
          <NoDataPage />
        </div>
      </div>
      <div>
        <Pagination
          v-if="!loading"
          :data="variations"
          @change-page="changePage"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
