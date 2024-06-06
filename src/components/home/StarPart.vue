<script setup>
import { defineProps } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";
const props = defineProps({
  count: Number,
});
</script>

<template>
  <div class="flex justify-start items-center space-x-0.5">
    <StarIcon
      class="w-2 h-2"
      :class="props.count >= 1 ? 'text-main' : 'text-black/50'"
    />
    <StarIcon
      class="w-2 h-2"
      :class="props.count >= 2 ? 'text-main' : 'text-black/50'"
    />
    <StarIcon
      class="w-2 h-2"
      :class="props.count >= 3 ? 'text-main' : 'text-black/50'"
    />
    <StarIcon
      class="w-2 h-2"
      :class="props.count >= 4 ? 'text-main' : 'text-black/50'"
    />
    <StarIcon
      class="w-2 h-2"
      :class="props.count >= 5 ? 'text-main' : 'text-black/50'"
    />
  </div>
</template>
