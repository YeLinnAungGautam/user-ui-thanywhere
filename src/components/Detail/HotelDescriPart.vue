<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

const props = defineProps({
  data: Object,
});

onMounted(() => {
  console.log(props.data, "this is des");
});
</script>

<template>
  <div>
    <div class="space-y-4 py-4 min-h-[200px]">
      <h1 class="text-lg font-medium">Description :</h1>
      <div class="space-y-3">
        <p class="text-justify">
          {{ data?.description }}
        </p>
      </div>
    </div>
  </div>
</template>
