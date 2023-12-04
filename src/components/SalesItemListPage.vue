<script setup>
import { ref, defineProps, defineEmits } from "vue";

const showMore = ref(false);

const props = defineProps({
  index: Number,
});

const emit = defineEmits();
</script>

<template>
  <div class="px-4 py-4">
    <div class="space-y-2" v-if="!showMore">
      <div class="space-y-2">
        <label class="text-sm text-gray-800">Product Type</label>
        <v-select
          class="w-full h-10 text-sm rounded border border-main bg-white focus:outline-none focus:border-none"
          :options="hotel?.data"
          label="name"
          :clearable="false"
          :reduce="(hotel) => hotel.id"
          placeholder="product type"
        ></v-select>
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-800">Product Name</label>
        <v-select
          class="w-full h-10 text-sm rounded border border-main bg-white focus:outline-none focus:border-none"
          :options="hotel?.data"
          label="name"
          :clearable="false"
          :reduce="(hotel) => hotel.id"
          placeholder="product name"
        ></v-select>
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-800">Variable</label>
        <v-select
          class="w-full h-10 text-sm rounded border border-main bg-white focus:outline-none focus:border-none"
          :options="hotel?.data"
          label="name"
          :clearable="false"
          :reduce="(hotel) => hotel.id"
          placeholder="variable "
        ></v-select>
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-800">Service Date</label>
        <input
          type="date"
          id="name"
          class="w-full col-span-2 h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-800">Rate</label>
        <input
          type="number"
          class="w-full col-span-2 h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-800">Quantity</label>
        <input
          type="number"
          class="w-full col-span-2 h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-800">Amount</label>
        <div class="flex justify-start items-center gap-2">
          <input
            type="number"
            class="w-full col-span-2 h-10 px-4 text-sm py-2 border font-semibold border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
          />
          <p
            class="font-extrabold text-lg text-white bg-main border py-1 px-2 rounded-lg"
          >
            THB
          </p>
        </div>
      </div>
    </div>
    <div class="animate__animated animate__fadeIn" v-if="showMore">
      <div class="space-y-2">
        <p class="text-sm">Description</p>
        <textarea
          name=""
          id=""
          class="w-full col-span-2 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
          cols="30"
          rows="2"
          placeholder="enter description"
        ></textarea>
      </div>
      <div class="space-y-2">
        <p class="text-sm">Special Request</p>
        <textarea
          name=""
          id=""
          class="w-full col-span-2 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
          cols="30"
          rows="2"
          placeholder="enter special request"
        ></textarea>
      </div>
      <div class="space-y-2">
        <p class="text-sm">Pickup Location</p>
        <textarea
          name=""
          id=""
          class="w-full col-span-2 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
          cols="30"
          rows="2"
          placeholder="enter pickup location"
        ></textarea>
      </div>
      <div class="space-y-2">
        <p class="text-sm">Dropoff Location</p>
        <textarea
          name=""
          id=""
          class="w-full col-span-2 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
          cols="30"
          rows="2"
          placeholder="enter dropoff location"
        ></textarea>
      </div>
      <div class="space-y-2">
        <p class="text-sm">Pickup Time</p>
        <input
          type="time"
          name=""
          v-model="itemPickupTime"
          class="w-full col-span-2 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300 h-10"
          id=""
        />
      </div>
    </div>
    <div class="text-sm pb-2 pt-4 flex justify-start items-center gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 bg-main rounded-full text-white"
        @click="showMore = !showMore"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 bg-red rounded-full text-white"
        @click="$emit('myEvent', index)"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
      </svg>
    </div>
  </div>
</template>
