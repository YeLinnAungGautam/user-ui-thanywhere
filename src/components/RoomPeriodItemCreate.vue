<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, defineProps, defineEmits } from "vue";

const formPeriod = ref({
  period_name: "",
  start_date: "",
  end_date: "",
  sale_price: "",
  cost_price: "",
});

const emit = defineEmits();

const addToList = () => {
  console.log(formPeriod.value);
  emit("create", formPeriod.value);
  formPeriod.value = {
    period_name: "",
    start_date: "",
    end_date: "",
    sale_price: "",
    cost_price: "",
  };
};

onMounted(async () => {});
</script>

<template>
  <div class="px-6 pb-5 space-y-6">
    <p class="text-center text-main font-semibold">Choose Room Period</p>
    <div class="bg-white p-4 rounded-md shadow space-y-2 max-w-md mx-auto">
      <div class="space-y-2">
        <p class="text-sm">Period Name</p>
        <input
          v-model="formPeriod.period_name"
          type="text"
          id="title"
          class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
          placeholder="enter name"
        />
        <small class="text-red" v-if="!formPeriod.period_name"
          >need to fill name</small
        >
      </div>
      <div class="space-y-2">
        <p class="text-sm">Start Date</p>
        <input
          v-model="formPeriod.start_date"
          type="date"
          id="title"
          class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
          placeholder="enter prices"
          title="start date"
        />
        <small class="text-red" v-if="!formPeriod.start_date"
          >need to fill start date</small
        >
      </div>
      <div class="space-y-2">
        <p class="text-sm">End Date</p>
        <input
          v-model="formPeriod.end_date"
          type="date"
          id="title"
          class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
          title="end date"
        />
        <small class="text-red" v-if="!formPeriod.end_date"
          >need to fill end date</small
        >
      </div>
      <div class="space-y-2">
        <p class="text-sm">Sale Price</p>
        <input
          v-model="formPeriod.sale_price"
          type="number"
          id="title"
          class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
          placeholder="sale price"
        />
        <small class="text-red" v-if="!formPeriod.sale_price"
          >need to fill sale_price</small
        >
      </div>
      <div class="space-y-2">
        <p class="text-sm">Cost Price</p>
        <input
          v-model="formPeriod.cost_price"
          type="number"
          id="title"
          class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
          placeholder="cost price"
        />
        <small class="text-red" v-if="!formPeriod.cost_price"
          >need to fill cost_price</small
        >
      </div>
      <div
        class="w-full bg-main flex justify-center items-center gap-3 py-2 rounded text-white"
        @click="addToList"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 border border-white rounded-full text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
        <p>Add to List</p>
      </div>
    </div>
  </div>
</template>
