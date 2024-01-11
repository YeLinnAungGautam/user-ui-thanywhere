<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
import { Switch } from "@headlessui/vue";
const props = defineProps({
  main: [Object],
});
const booking_summmary_part = ref(false);
const bookingSummaryHandle = () => {
  booking_summmary_part.value = !booking_summmary_part.value;
};

const productType = (text) => {
  if (typeof text === "string") {
    let parts = text.split("\\");

    // Get the last part of the array
    let className = parts[parts.length - 1];

    return className;
  }
};
const enabled = ref(false);

const days = computed(() => {
  if (props.main?.checkin_date && props.main?.checkout_date) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const startDateTimestamp = new Date(props.main.checkin_date).getTime();
    const endDateTimestamp = new Date(props.main.checkout_date).getTime();
    let result = Math.abs(
      Math.round((endDateTimestamp - startDateTimestamp) / oneDay)
    );
    console.log(result);
    return result;
  }
});
</script>
<template>
  <div>
    <div
      class="flex justify-start items-center px-4 py-2 bg-white space-x-4 text-xs border-b border-black cursor-pointer"
      @click="bookingSummaryHandle"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        data-slot="icon"
        class="w-6 h-6"
        v-if="!booking_summmary_part"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        data-slot="icon"
        class="w-6 h-6"
        v-if="booking_summmary_part"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 15.75 7.5-7.5 7.5 7.5"
        />
      </svg>

      <p>RECEIPT IMAGES : {{ main?.crm_id }}</p>
    </div>
    <div
      class="grid grid-cols-2 gap-4 bg-gray-200/50 py-4 px-4 bg-black/5 animate__animated animate__fadeIn"
      v-if="booking_summmary_part"
    >
      <div
        class="grid grid-cols-2 col-span-2 gap-4 bg-gray-200/50"
        v-if="main?.booking.receipts.length > 0"
      >
        <div v-for="(image, index) in main?.booking.receipts" :key="index">
          <p class="text-xs mb-2 mt-2 text-main">
            Receipt Image {{ index + 1 }}
          </p>
          <a :href="image.image" target="_blink">
            <img :src="image.image" alt="" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
