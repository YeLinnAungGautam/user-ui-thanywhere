<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, defineProps, defineEmits } from "vue";
import { useCarStore } from "../../stores/car";

const carStore = useCarStore();

const { cars } = storeToRefs(carStore);

const formPrice = ref({
  car: "",
  price: "",
  agent_price: "",
});

const emit = defineEmits();

const addToList = () => {
  console.log(formPrice.value);
  emit("create", formPrice.value);
  formPrice.value = {
    car: "",
    price: "",
    agent_price: "",
  };
};

onMounted(async () => {
  await carStore.getSimpleListAction();
});
</script>

<template>
  <div class="px-6 pb-5 space-y-6">
    <p class="text-center text-main font-semibold">Choose Car & Price</p>
    <div class="bg-white p-4 rounded-md shadow space-y-2 max-w-md mx-auto">
      <div class="space-y-2">
        <label class="text-sm text-gray-800">Choose Car</label>
        <v-select
          v-if="cars.data"
          label="name"
          v-model="formPrice.car"
          value="_id"
          :reduce="(car) => car.id"
          :options="cars?.data"
          class="w-full h-10 text-sm border-main border rounded bg-white focus:outline-none focus:border-none"
          placeholder="Choose cars"
        ></v-select>
        <small class="text-red" v-if="!formPrice.car"
          >Need to choose car type</small
        >
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-800">Price</label>
        <input
          type="number"
          id="name"
          v-model="formPrice.price"
          class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
        />
        <small class="text-red" v-if="!formPrice.price"
          >Need to fill data</small
        >
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-800">Agent Price</label>
        <input
          type="number"
          id="name"
          v-model="formPrice.agent_price"
          class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
        />
        <small class="text-red" v-if="!formPrice.agent_price"
          >Need to fill data</small
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
