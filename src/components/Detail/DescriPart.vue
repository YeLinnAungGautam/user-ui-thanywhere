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
  <div class="pb-8">
    <div class="space-y-4 py-3">
      <h1 class="text-lg font-medium">Description :</h1>
      <div class="space-y-3">
        <p class="text-justify">
          {{ data?.long_description }}
        </p>
      </div>
    </div>
    <div
      class="space-y-4 py-3"
      v-for="(d, index) in data?.destinations"
      :key="index"
    >
      <h1 class="text-lg font-medium">{{ d.name }} :</h1>
      <div class="space-y-3">
        <p class="text-justify">
          {{ d.description }}
        </p>
      </div>
    </div>
  </div>
</template>
