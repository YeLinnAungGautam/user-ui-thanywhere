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

      <p>CUSTOMER INFORMATION</p>
    </div>
    <div
      class="grid grid-cols-2 gap-4 bg-gray-200/50 py-4 px-4 bg-black/5 animate__animated animate__fadeIn"
      v-if="booking_summmary_part"
    >
      <div class="space-y-1">
        <p class="text-main text-xs">Name</p>
        <p class="font-semibold text-xs">{{ main?.customer_info.name }}</p>
      </div>
      <div class="space-y-1">
        <p class="text-main text-xs">Contact</p>
        <p class="font-semibold text-xs">
          {{ main?.customer_info.phone_number }}
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-main text-xs">Passport Number</p>
        <p class="font-semibold text-xs">
          {{ main?.customer_info.nrc_number }}
        </p>
      </div>
      <div class="space-y-1">
        <p class="text-main text-xs">Email:</p>
        <p class="font-semibold text-xs">{{ main?.customer_info.email }}</p>
      </div>
      <!-- <div
        class="col-span-2 grid grid-cols-2 gap-4"
        v-if="
          main?.product_type == 'App\\Models\\EntranceTicket' ||
          main?.product_type == 'App\\Models\\Hotel' ||
          formData.product_type == 'App\\Models\\Airline'
        "
      >
        <div class="space-y-1">
          <p class="text-xs text-gray-400">Is Associated ?</p>
          <p class="text-main text-xs">
            <Switch
              v-model="enabled"
              :class="enabled ? ' bg-orange-600' : 'bg-gray-500'"
              class="relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <span class="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                :class="enabled ? 'translate-x-9' : 'translate-x-0'"
                class="pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
              />
            </Switch>
          </p>
        </div>
        <div class=" pr-4 space-y-1" v-if="enabled">
          <p class="text-xs text-gray-400">Associated Customer Name</p>
          <input
            type="text"
            name=""
            v-model="secForm.customer_name"
            class="h-8 w-full font-semibold bg-white border border-gray-300 shadow-sm px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-300 text-xs"
            id=""
          />
        </div>
        <div class=" space-y-1" v-if="enabled">
          <p class="text-xs text-gray-400">Associated Customer Phone</p>
          <input
            type="number"
            v-model="secForm.customer_phone"
            name=""
            class="h-8 w-full font-semibold bg-white border border-gray-300 shadow-sm px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-300 text-xs"
            id=""
          />
        </div>
        <div class=" pr-4 space-y-1" v-if="enabled">
          <p class="text-xs text-gray-400">Associated Customer Passport</p>
          <input
            type="text"
            v-model="secForm.customer_passport_number"
            name=""
            class="h-8 w-full font-semibold bg-white border border-gray-300 shadow-sm px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-300 text-xs"
            id=""
          />
        </div>

        <div class=" space-y-1">
          <input
            type="file"
            ref="featureImageInput"
            multiple
            class="hidden"
            @change="handlerCustomerPassport"
            accept="image/*"
          />
          <p
            class="text-white text-xs inline-block cursor-pointer bg-[#ff613c] rounded-sm px-2 py-1"
            @click.prevent="openFileFeaturePicker"
          >
            Add New Customer Passport multiple
          </p>
        </div>
        <div class="px-10 space-y-1 col-span-2">
          <p
            class="text-main text-xs"
            v-if="featureCusPassPreview.length > 0"
          >
            Preview Images for Customer Passport
          </p>
          <div
            v-if="featureCusPassPreview.length > 0"
            class="grid grid-cols-3 gap-4"
          >
            <div
              v-for="(img, index) in featureCusPassPreview"
              :key="index"
              class="relative"
            >
              <img :src="img" alt="" />
              <span
                class="absolute top-[-10px] right-0"
                @click="removeCustomerPassportImage(index)"
              >
                <i class="fa-solid fa-circle-minus text-red-600 text-lg"></i>
              </span>
            </div>
          </div>
          <p
            class="text-main text-xs"
            v-if="customer_passport_data.length > 0"
          >
            Customer Passports
          </p>
          <div
            v-if="customer_passport_data.length > 0"
            class="grid grid-cols-3 gap-4"
          >
            <div
              v-for="(img, index) in customer_passport_data"
              :key="index"
              class="relative"
            >
              <a :href="img.file">
                <img :src="img.file" alt="" />
              </a>
              <span
                class="absolute top-[-10px] right-0"
                @click="deleteCustomerPassport(img.id)"
              >
                <i class="fa-solid fa-circle-minus text-red-600 text-lg"></i>
              </span>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
