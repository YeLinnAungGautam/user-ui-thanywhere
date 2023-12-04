<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, defineProps, defineEmits } from "vue";
import { useCarStore } from "../../stores/car";
import NoDataPageVue from "../NoDataPage.vue";

const carStore = useCarStore();

const { cars } = storeToRefs(carStore);

const props = defineProps({
  items: Array,
});
const emit = defineEmits();

const remove = (i) => {
  emit("remove", i);
};
</script>

<template>
  <div class="pt-6 px-4 space-y-3 h-auto overflow-scroll">
    <p class="text-center text-main font-semibold pb-3">
      Choose Car & Price Lists
    </p>
    <div
      class="bg-white rounded-md p-4 grid grid-cols-2 gap-1 shadow relative max-w-md mx-auto"
      v-for="(item, index) in items"
      :key="index"
    >
      <p class="text-main font-medium text-sm">Car Name :</p>
      <div>
        <p
          class="text-black font-medium text-sm"
          v-for="(c, index) in cars?.data"
          :key="index"
        >
          <span v-if="c.id == item.car">{{ c.name }}</span>
        </p>
      </div>
      <p class="text-main font-medium text-sm">Price :</p>
      <p class="text-black font-medium text-sm">{{ item.price }} thb</p>
      <p class="text-main font-medium text-sm">Agent Price :</p>
      <p class="text-black font-medium text-sm">{{ item.agent_price }} thb</p>
      <div class="absolute bottom-2 right-2" @click="remove(index)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 bg-red rounded-full text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15"
          />
        </svg>
      </div>
    </div>
    <div v-if="items == ''" class="pt-10">
      <p class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-20 h-20 text-red mx-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </p>
      <p class="text-center py-3 text-red text-sm">
        Need To Add Data , Click the plus button !
      </p>
    </div>
  </div>
</template>
