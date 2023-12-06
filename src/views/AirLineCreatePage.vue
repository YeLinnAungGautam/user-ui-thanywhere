<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { storeToRefs } from "pinia";
import { useToastStore } from "../stores/toast";
import { useAirLineStore } from "../stores/airline";

const router = useRouter();
const route = useRoute();
const toastStore = useToastStore();
const airlineStore = useAirLineStore();

const errors = ref(null);

const formData = ref({
  id: "",
  name: "",
  contract: null,
  starting_balance: "",
  legal_name: "",
});

const getFile = (e) => {
  formData.value.contract = e.target.files[0];
};

const addNewHandler = async () => {
  const frmData = new FormData();
  frmData.append("name", formData.value.name);
  formData.value.contract
    ? frmData.append("contract", formData.value.contract)
    : "";
  frmData.append("starting_balance", formData.value.starting_balance);
  frmData.append("legal_name", formData.value.legal_name);

  try {
    const response = await airlineStore.addNewAction(frmData);
    formData.value = {
      id: "",
      name: "",
      contract: null,
      starting_balance: "",
      legal_name: "",
    };
    errors.value = null;
    toastStore.showToast({
      icon: "success",
      title: response.message,
    });
    router.push({ name: "airline" });
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
          Airline Create
        </p>
      </div>
      <div>
        <form
          @submit.prevent="addNewHandler"
          class="mt-4 px-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2"
        >
          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800">Airline Name</label>
            <input
              type="text"
              v-model="formData.name"
              id="name"
              class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
            />
          </div>

          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800"
              >Starting Balance</label
            >
            <input
              type="number"
              v-model="formData.starting_balance"
              id="name"
              class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800">Legal Name</label>
            <input
              type="text"
              v-model="formData.legal_name"
              id="name"
              class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
            />
            <p v-if="errors?.legal_name" class="mt-1 text-sm text-red-600">
              {{ errors.legal_name[0] }}
            </p>
          </div>
          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800">Contracts</label>
            <input
              type="file"
              @change="getFile"
              id="name"
              class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
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
              <p class="">Create</p>
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
