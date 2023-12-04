<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { storeToRefs } from "pinia";
import { useToastStore } from "../stores/toast";
import { useAirTicketStore } from "../stores/airticket";
import { useAirLineStore } from "../stores/airline";

const router = useRouter();
const route = useRoute();
const toastStore = useToastStore();
const airticketStore = useAirTicketStore();
const airlineStore = useAirLineStore();
const { airline } = storeToRefs(airlineStore);

const errors = ref(null);

const formData = ref({
  id: "",
  airline_id: "",
  price: "",
  description: "",
});

const addNewHandler = async () => {
  const frmData = new FormData();
  frmData.append("_method", "PUT");
  frmData.append("airline_id", formData.value.airline_id);
  frmData.append("price", formData.value.price);
  frmData.append("description", formData.value.description);

  try {
    const response = await airticketStore.updateAction(
      frmData,
      route.params.id
    );
    formData.value = {
      id: "",
      airline_id: "",
      price: "",
      description: "",
    };
    errors.value = null;
    toastStore.showToast({
      icon: "success",
      title: response.message,
    });
    goBack();
  } catch (error) {
    // if (error.response.data.errors) {
    //   errors.value = error.response.data.errors;
    // }
    if (error.response) {
      toastStore.showToast({
        icon: "error",
        title: error.response.data.message,
      });
    }
    // setTimeout(async () => {
    //   await hotelStore.toggleLoading();
    // }, 5000);
  }
};

const goBack = () => {
  router.go(-1);
};

const getDetail = async () => {
  const res = await airticketStore.getDetailAction(route.params.id);
  console.log(res);
  const data = res.result;
  formData.value.price = data.price;
  formData.value.airline_id = data?.airline.id;
  formData.value.description = data.description;
};

onMounted(async () => {
  await getDetail();
  await airlineStore.getSimpleListAction();
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

        <p class="text-main text-2xl font-semibold w-full text-center">
          Ticket Edit
        </p>
      </div>
      <div>
        <form
          @submit.prevent="addNewHandler"
          class="mt-4 px-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2"
        >
          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800"
              >AirTicket Field</label
            >
            <input
              type="text"
              v-model="formData.price"
              id="name"
              class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
            />
          </div>

          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800">Airline Name</label>
            <v-select
              v-model="formData.airline_id"
              class="w-full min-h-10 text-sm border-main border rounded bg-white focus:outline-none focus:border-none"
              :options="airline?.data"
              label="name"
              :clearable="false"
              :reduce="(airline) => airline.id"
              placeholder="Choose Airline"
            ></v-select>
          </div>
          <div class="space-y-2">
            <label class="text-sm text-gray-800">Description</label>
            <textarea
              v-model="formData.description"
              rows="3"
              id="title"
              class="w-full text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
              placeholder="enter description"
            />
          </div>

          <button
            type="submit"
            class="text-end flex justify-end items-center col-span-1 sm:col-span-2 mt-6"
          >
            <div
              class="flex justify-end items-center space-x-4 px-4 py-2 rounded border-main bg-main text-white border"
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="">Update</p>
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
