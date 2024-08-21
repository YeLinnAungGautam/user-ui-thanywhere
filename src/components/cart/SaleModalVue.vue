<template>
  <div class="space-y-10 pt-3">
    <div
      v-for="d in data"
      :key="d"
      class="gap-2 flex justify-between items-center border bg-main/5 border-main rounded-2xl px-4 py-4 shadow-md"
      :class="{
        'flex-row-reverse': d.id % 2 === 0,
        'flex-row': d.id % 2 !== 0,
      }"
    >
      <div class="relative w-[35%]">
        <img
          :src="d.image"
          :alt="d.name"
          class="w-full h-auto absolute -bottom-10 z-10 object-cover rounded-lg"
        />
        <img :src="background" class="absolute z-0 -top-[41px]" alt="" />
      </div>
      <div class="col-span-2 w-[65%]">
        <p class="text-base line-clamp-1 font-semibold">{{ d.name }}</p>
        <p class="text-xs text-main font-medium">{{ d.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from "./db";
import background from "../../assets/s/Background item.png";
</script>
