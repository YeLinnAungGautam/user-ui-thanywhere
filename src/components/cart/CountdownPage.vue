<template>
  <div class="flex justify-center gap-x-2 items-center">
    <p>Booking expiry :</p>
    <p>{{ hours }}:{{ minutes }}:{{ seconds }}</p>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  time: {
    type: Number,
    default: 0,
  },
});

const remainingTime = ref(props.time);

const hours = computed(() => {
  return Math.floor(remainingTime.value / 3600);
});

const minutes = computed(() => {
  return Math.floor((remainingTime.value % 3600) / 60);
});

const seconds = computed(() => {
  return remainingTime.value % 60;
});

let interval;

onMounted(() => {
  interval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
