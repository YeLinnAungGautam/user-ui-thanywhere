<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import AirTicketItem from "../components/AirTicketItem.vue";
import { useAirLineStore } from "../stores/airline";
import { useAirTicketStore } from "../stores/airticket";
import NoDataPage from "../components/NoDataPage.vue";
import Pagination from "../components/Pagination.vue";

const router = useRouter();
const route = useRoute();
const airlineStore = useAirLineStore();
const airticketStore = useAirTicketStore();

const { airline } = storeToRefs(airlineStore);
const { airtickets, airticket, loading } = storeToRefs(airticketStore);

const airline_name = ref("");

const chooseType = ref([
  { id: 1, name: "van tour" },
  { id: 2, name: "group tour" },
  { id: 3, name: "hotel" },
  { id: 4, name: "attraction" },
]);

const createPage = () => {
  router.push({
    name: "ticket-create",
  });
};

const goBack = () => {
  router.go(-1);
};

const clear = () => {
  airline_name.value = "";
};

const changePage = async (url) => {
  console.log(url);
  let data = {
    search: airline_name.value,
  };
  await airticketStore.getChangePage(url, data);
};

const changes = async (message) => {
  if ((message = "Room Deleted")) {
    airline_name.value = "";
  }
};

onMounted(async () => {
  await airlineStore.getSimpleListAction();
  await airticketStore.getSimpleListAction();
  console.log(airline.value, "this is airline");
  airline_name.value = route.params.name;
});

watch(airline_name, async (newValue) => {
  await airticketStore.getListAction({ search: airline_name.value });
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
          AirLine Ticket
        </p>
      </div>
      <div
        class="bg-main/10 py-2 pl-3 pr-2 rounded-3xl flex justify-between items-center"
      >
        <div class="mr-2" @click="clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="!airline_name"
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
            v-if="airline_name"
            src="../../public/clear-svgrepo-com (1).svg"
            class="w-6 h-6"
            alt=""
          />
          <!-- <p class="text-main">Search</p> -->
        </div>
        <p
          v-if="airline_name"
          class="text-start ml-2 py-1 text-base text-main w-full"
        >
          {{ airline_name }}
        </p>
        <v-select
          v-if="!airline_name"
          class="style-chooser w-full"
          :options="airticket?.data"
          v-model="airline_name"
          label="price"
          :clearable="false"
          :reduce="(d) => d.price"
          placeholder="Search"
        ></v-select>
      </div>
      <!-- <div class="flex py-1.5 mb-5 gap-3 flex-wrap">
        <v-select
          class="style-chooser bg-white rounded-full border border-main min-w-[100px]"
          :options="chooseType"
          label="name"
          :clearable="false"
          :reduce="(d) => d.name"
          placeholder="Price"
        ></v-select>
        <v-select
          class="style-chooser bg-white rounded-full border border-main min-w-[100px]"
          :options="chooseType"
          label="name"
          :clearable="false"
          :reduce="(d) => d.name"
          placeholder="Pax"
        ></v-select>
      </div> -->
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
        <div
          class="space-y-2"
          v-for="(airticket, index) in airtickets?.data"
          :key="index"
        >
          <AirTicketItem
            :id="airticket.id"
            :airtickets="airticket"
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
          v-if="airtickets?.data.length == 0"
        >
          <NoDataPage />
        </div>
      </div>
      <div>
        <Pagination
          v-if="!loading"
          :data="airtickets"
          @change-page="changePage"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
