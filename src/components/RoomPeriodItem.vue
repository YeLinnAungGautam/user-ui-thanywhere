<template>
  <div class="relative">
    <svg
      @click="remove(id)"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 text-red absolute top-2 right-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <div
      class="space-y-1 py-2 rounded-md grid-cols-2 grid w-full bg-white border border-main px-2 text-sm"
    >
      <p class="font-semibold">Name :</p>
      <p class="">{{ items.period_name }}</p>
      <p>
        <span class="font-semibold">sale price</span> : {{ items.sale_price }}
      </p>
      <p>
        <span class="font-semibold">cost price</span> : {{ items.cost_price }}
      </p>
      <p>
        <span class="font-semibold">start date</span> : {{ items.start_date }}
      </p>
      <p><span class="font-semibold">end date</span> : {{ items.end_date }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  id: Number,
  items: Array,
});
const emit = defineEmits();

const remove = (i) => {
  emit("remove", i);
};

onMounted(() => {
  console.log(props.items);
});
</script>
