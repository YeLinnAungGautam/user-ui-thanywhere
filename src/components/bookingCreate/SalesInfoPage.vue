<script setup>
import { storeToRefs } from "pinia";
import { ref, defineProps, defineEmits, onMounted, watch } from "vue";

const props = defineProps({});

const emit = defineEmits();

const showInfo = () => {
  emit("change", "changes");
};

const change = (id) => {
  checkValue.value = id;
  emit("checked", checkValue.value);
};
</script>

<template>
  <div>
    <div class="relative">
      <div
        class="flex justify-start items-center gap-2 py-4 px-4 text-main"
        @click="showInfo"
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
      <div class="px-4 w-full space-y-2"></div>
    </div>
  </div>
</template>
