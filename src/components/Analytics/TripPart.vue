<script setup></script>

<template>
  <div class="px-4 space-y-4">
    <div class="bg-main rounded-3xl pt-3 pb-4 pr-3 pl-6 space-y-6">
      <div class="flex justify-between items-center">
        <p class="text-white text-xs">Ongoing Bookings Today</p>

        <p class="text-black px-6 py-2 bg-white rounded-full text-xs">Today</p>
      </div>
      <div class="space-y-2">
        <p class="text-white text-5xl font-semibold flex justify-start gap-3">
          5<svg
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
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </p>
        <p class="text-white text-xl font-semibold">Expenses are Unpaid</p>
      </div>
      <div class="space-y-2">
        <p class="text-white text-5xl font-semibold flex justify-start gap-3">
          2<svg
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
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </p>
        <p class="text-white text-xl font-semibold">Confirmation Awaiting</p>
      </div>
    </div>
    <div class="">
      <div class="pt-5 space-y-4 pb-5">
        <div
          class="text-main text-lg flex justify-between items-center font-semibold pb-3"
        >
          <p>Bookings Today</p>
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
          class="text-main text-base px-6 flex justify-between items-center border-main border py-4 mx-2 rounded-3xl"
          v-for="z in 4"
          :key="z"
        >
          <p>Hotel Bookings</p>
          <p class="font-semibold text-lg">15</p>
        </div>
      </div>
    </div>
  </div>
</template>
