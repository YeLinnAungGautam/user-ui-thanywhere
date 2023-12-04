<script setup>
import { ref } from "vue";
import SalesItemListPageVue from "./SalesItemListPage.vue";

const items = ref([]);

const formitem = ref({
  product_type: "",
  product_id: "",
  car_id: "",
  car_list: [],
  room_id: "",
  room: null,
  service_date: "",
  quantity: "1",
  days: "",
  duration: "",
  selling_price: "",
  comment: "",
  reservation_status: "",
  payment_method: "",
  payment_status: "",
  amount: "",
  exchange_rate: "",
  cost_price: "",
  special_request: "",
  total_amount: "",
  pickup_location: "",
  pickup_time: "",
  dropoff_location: "",
  route_plan: "",
  checkin_date: "",
  room_number: "",
  checkout_date: "",
  customer_attachment: "",
});

const addNewitem = () => {
  items.value.push(formitem.value);
};

const removeFromitem = (indexGet) => {
  items.value.splice(indexGet, 1);
};

const remove = (changedData) => {
  removeFromitem(changedData);
};
</script>

<template>
  <div>
    <div
      class="px-4 pb-4 flex justify-start items-center gap-3"
      @click="addNewitem"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 bg-main text-white rounded-full"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v12m6-6H6"
        />
      </svg>

      <p class="text-sm text-main">Click to add new product</p>
    </div>
    <div class="flex space-x-2 overflow-x-scroll overflow-y-visible">
      <div
        class="min-w-[300px] bg-white shadow-md rounded-lg"
        v-for="(i, index) in items"
        :key="index"
      >
        <SalesItemListPageVue :index="index" @my-event="remove" />
      </div>
    </div>
  </div>
</template>
