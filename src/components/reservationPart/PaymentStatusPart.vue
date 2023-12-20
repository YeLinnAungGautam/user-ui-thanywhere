<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
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

      <p>PAYMENT STATUS</p>
    </div>
    <div
      class="grid grid-cols-2 gap-4 bg-gray-200/50 py-4 px-4 bg-black/5 animate__animated animate__fadeIn"
      v-if="booking_summmary_part"
    >
      <div class="space-y-1">
        <p class="text-gray-400 text-xs text-main">Total Amount</p>
        <p class="font-semibold text-xs py-1.5" v-if="!main?.checkin_date">
          {{ main?.selling_price * main?.quantity }}
        </p>
        <p class="font-semibold text-xs py-1.5" v-if="main?.checkin_date">
          {{ main?.selling_price * main?.quantity * days }}
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-gray-400 text-xs text-main">Payment Currency</p>
        <p class="font-semibold text-xs py-1.5">
          {{ main?.booking.payment_currency }}
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-gray-400 text-xs text-main">Payment Method:</p>
        <p class="font-semibold text-xs py-1.5">
          {{ main?.booking.payment_method }}
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-gray-400 text-xs text-main">Payment Status</p>
        <p class="font-semibold text-xs py-1.5">
          {{ main?.booking.payment_status }}
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-gray-400 text-xs text-main">Payment Due:</p>
        <!-- <input
          v-model="main?.service_date"
          type="date"
          disabled
          id="title"
          class="h-8 font-semibold w-full py-0 text-gray-900 focus:outline-none focus:border-0 text-xs"
        /> -->
        <p class="text-xs font-semibold">
          {{ main?.booking.balance_due_date }}
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-gray-400 text-xs text-main">Service Date:</p>
        <p class="text-xs font-semibold">
          {{ main?.service_date }}
        </p>
      </div>
    </div>
  </div>
</template>
