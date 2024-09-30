<template>
  <div class="pb-20">
    <div v-for="(item, index) in data" :key="index" class="space-y-6 pb-6 px-4">
      <div class="text-sm font-semibold text-black flex items-center gap-x-2">
        {{ item.title }}
      </div>
      <div class="flex flex-wrap gap-y-4">
        <img
          v-for="(image, index) in item.images"
          :key="index"
          :src="image.image"
          class="w-full h-auto object-cover rounded-lg shadow-custom"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

console.log(props.data, "this is data");
</script>
