<script setup>
import ReceiptSelectVue from "./ReceiptSelect.vue";
</script>

<template>
  <div class="px-4 space-y-4">
    <div class="bg-main rounded-3xl pt-3 pb-4 pr-3 pl-6 space-y-6">
      <div class="flex justify-between items-center">
        <p class="text-white text-xs">Unpaid Receipts</p>

        <input
          type="month"
          name=""
          id=""
          class="border-0 focus:ring-0 focus:border-none focus:border-0 text-black px-2 py-2 bg-white rounded-full text-xs"
        />
      </div>
      <div class="space-y-2">
        <p class="text-white text-5xl font-semibold">-325,000</p>
        <p class="text-white text-xl font-semibold">THB Unpaid</p>
      </div>
      <div class="space-y-2">
        <p class="text-white text-5xl font-semibold">32</p>
        <p class="text-white text-xl font-semibold">Bookings are Unpaid</p>
      </div>
    </div>
    <div>
      <ReceiptSelectVue />
    </div>
  </div>
</template>
