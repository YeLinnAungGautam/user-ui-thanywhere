<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { useEntranceStore } from "../stores/entrance";
import { useToastStore } from "../stores/toast";
import { useVariationStore } from "../stores/variations";

const router = useRouter();
const route = useRoute();
const entranceStore = useEntranceStore();
const { entrance } = storeToRefs(entranceStore);
const toastStore = useToastStore();
const variationStore = useVariationStore();

const formData = ref({
  id: "",
  entrance_ticket_id: "",
  cost_price: "",
  price_name: "",
  price: "",
  description: "",
});

const goBack = () => {
  router.go(-1);
};

const errors = ref(null);
const addNewHandler = async () => {
  const frmData = new FormData();
  frmData.append("entrance_ticket_id", formData.value.entrance_ticket_id);
  frmData.append("description", formData.value.description);
  frmData.append("price", formData.value.price);
  frmData.append("cost_price", formData.value.cost_price);
  frmData.append("name", formData.value.price_name);
  frmData.append("_method", "PUT");
  try {
    const response = await variationStore.updateAction(
      frmData,
      route.params.id
    );
    formData.value = {
      id: "",
      entrance_ticket_id: "",
      cost_price: "",
      price_name: "",
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
    if (error.response) {
      toastStore.showToast({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }
};

const getDetail = async () => {
  const response = await variationStore.getDetailAction(route.params.id);
  const data = response.result;
  formData.value = {
    entrance_ticket_id: data.entrance_ticket?.id,
    cost_price: data.cost_price,
    price_name: data.name,
    price: data.price,
    description: data.description,
  };
};

onMounted(async () => {
  await entranceStore.getSimpleListAction();
  await getDetail();
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
          Variation Edit
        </p>
      </div>
      <div>
        <form
          @submit.prevent="addNewHandler"
          class="mt-4 px-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2"
        >
          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800">Ticket Name</label>
            <input
              type="text"
              v-model="formData.price_name"
              id="name"
              class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="space-y-2 mt-0 sm:mt-1">
            <p class="text-sm text-gray-800">Attraction Name</p>
            <v-select
              v-model="formData.entrance_ticket_id"
              class="w-full h-10 text-sm border-main border rounded bg-white focus:outline-none focus:border-none"
              :options="entrance?.data"
              label="name"
              :clearable="false"
              :reduce="(entrance) => entrance.id"
              placeholder="Choose attraction"
            ></v-select>
          </div>

          <div class="space-y-2">
            <label for="room_price" class="text-sm text-gray-800">Price</label>
            <input
              type="text"
              v-model="formData.price"
              id="room_price"
              class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="space-y-2">
            <label for="room_price" class="text-sm text-gray-800"
              >Cost Price</label
            >
            <input
              type="number"
              v-model="formData.cost_price"
              id="cost"
              class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="space-y-2">
            <label for="description" class="text-sm text-gray-800"
              >Description</label
            >
            <textarea
              v-model="formData.description"
              rows="3"
              id="description"
              class="w-full h-[150px] px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
            />
          </div>

          <button
            type="submit"
            class="text-end flex justify-end items-center col-span-1 sm:col-span-2 mt-3"
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
