<script setup></script>

<template>
  <div class="">
    <div class="pt-5 space-y-4">
      <div
        class="text-main text-lg flex justify-between items-center font-semibold pb-3"
      >
        <p>Unpaid Bookings</p>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </p>
      </div>
      <div
        class="text-main text-base px-2 flex justify-between items-center"
        v-for="z in 10"
        :key="z"
      >
        <p>Zaw Myo Paing</p>
        <p>360,000 thb</p>
      </div>
    </div>
    <div class="mt-8 mb-4">
      <div
        class="flex px-4 py-1.5 mb-5 space-x-2 rounded-lg shadow-sm bg-main/60 overflow-x-scroll"
      >
        <p class="bg-main px-4 py-1 text-xs rounded-full text-white">All</p>
        <p class="bg-white px-4 py-1 text-xs rounded-full text-black">Hotels</p>
        <p class="bg-white px-4 py-1 text-xs rounded-full text-black">
          VanTours
        </p>
        <p class="bg-white px-4 py-1 text-xs rounded-full text-black">
          Inclusive
        </p>
        <p class="bg-white px-4 py-1 text-xs rounded-full text-black">
          Attractions
        </p>
      </div>
    </div>
  </div>
</template>
