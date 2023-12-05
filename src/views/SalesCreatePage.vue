<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { Switch } from "@headlessui/vue";
import SalesItemListVue from "../components/SalesItemList.vue";
import CustomerPageVue from "../components/bookingCreate/CustomerPage.vue";
import { useCustomerStore } from "../stores/customer";
import { storeToRefs } from "pinia";
import SalesInfoPageVue from "../components/bookingCreate/SalesInfoPage.vue";

const router = useRouter();
const enabled = ref(false);
const customerStore = useCustomerStore();

const { customers } = storeToRefs(customerStore);

const showCustomer = ref(false);
const showInfo = ref(false);

const changesCustomerShow = (message) => {
  if (message == "changes") {
    showCustomer.value = false;
  }
};
const changesSalesInfo = (message) => {
  if (message == "changes") {
    showInfo.value = false;
  }
};

const formData = ref({
  customer_id: "",
});

const customerId = (data) => {
  console.log(data);
  formData.value.customer_id = data;
};

const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  await customerStore.getSimpleListAction();
  console.log(customers.value);
});
</script>

<template>
  <div>
    <NavbarVue />
    <div class="py-5 px-4 space-y-4 bg-black/5 min-h-screen">
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

        <p class="text-main text-xl font-semibold w-full text-center">
          Sales Create
        </p>
      </div>
      <div class="space-y-5 pt-3 text-sm">
        <div
          class="flex justify-between items-center bg-white px-4 py-2"
          @click="showCustomer = true"
        >
          <p class="text-main" v-if="formData.customer_id == ''">
            customer select
          </p>
          <div class="text-main" v-if="formData.customer_id != ''">
            <div v-for="customer in customers?.data" :key="customer.id">
              <p v-if="customer.id == formData.customer_id" class=" ">
                {{ customer.name }}
              </p>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-main"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div class="text-sm">
          <div
            @click="showInfo = true"
            class="flex justify-between items-center text-sm bg-white px-4 py-2"
          >
            <p class="text-main text-sm">Booking Information Add & Detail</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-main"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div class="grid grid-cols-2 gap-3 bg-white pl-4 pr-6 py-2">
            <p>Sale Date</p>
            <p>10-1-2023</p>
            <p>Balance Due Date</p>
            <p>10-1-2023</p>
            <p>Sold From</p>
            <p>facebook</p>
            <p>Payment Currency</p>
            <p>THB</p>
            <p>Bank Name</p>
            <p>...</p>
            <p>Payment Method</p>
            <p>...</p>
            <p>Exchange Rate</p>
            <p>...</p>
          </div>
        </div>
        <div class="flex justify-between items-center bg-white px-4 py-2">
          <div class="flex justify-start items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-red"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p>Detail</p>
              <p>100 * 40000 each</p>
              <small>service date : 2/2/2023</small>
            </div>
          </div>
          <p class="text-lg font-semibold">4000,00</p>
        </div>
        <div class="flex justify-start space-x-3 items-center px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-main"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p class="text-main">Add Booking Sales List</p>
        </div>
        <div>
          <div
            class="flex justify-between items-center bg-transparent px-4 py-2"
          >
            <p class="">Subtotal</p>
            <p class="text-base font-semibold">THB 4000,000</p>
          </div>
          <div
            class="flex justify-between items-center border-b border-black/10 bg-white px-4 py-2"
          >
            <p class="">Discount</p>
            <p class="text-base font-semibold">0</p>
          </div>
          <div class="flex justify-between items-center bg-white px-4 py-2">
            <p class="">Tax</p>
            <p class="">Tax out of scope</p>
            <p></p>
          </div>
          <div
            class="flex justify-between items-start bg-transparent px-4 py-2"
          >
            <p class="">Total</p>
            <div>
              <p class="text-base font-semibold">THB 4000,000</p>
              <small class="">( 1 THB = 1.00 THB )</small>
            </div>
          </div>
          <div
            class="flex justify-between items-center border-b border-black/10 bg-white px-4 py-2"
          >
            <p class="">Deposit</p>
            <p class="text-base font-semibold">0</p>
          </div>
          <div
            class="flex justify-between items-center bg-transparent px-4 py-2"
          >
            <p class="">Balance Due</p>
            <p class="text-base font-semibold">THB 4,000.00</p>
          </div>
        </div>
      </div>
      <div
        class="absolute top-[90px] left-0 w-screen h-full overflow-scroll bg-gray z-10 animate__animated animate__fadeIn"
        v-if="showCustomer"
      >
        <CustomerPageVue
          @change="changesCustomerShow"
          @checked="customerId"
          :customerId="formData.customer_id"
        />
      </div>
      <div
        class="absolute top-[90px] left-0 w-screen h-full overflow-scroll bg-gray z-10 animate__animated animate__fadeIn"
        v-if="showInfo"
      >
        <SalesInfoPageVue @change="changesSalesInfo" />
      </div>
    </div>
  </div>
</template>
