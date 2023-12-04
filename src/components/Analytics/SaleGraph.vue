<script setup>
import { BarChart, LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const saleData = {
  labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
  datasets: [
    {
      label: "Sales",
      data: [3000, 4000, 6000, 5000, 2000],
      backgroundColor: ["#FF6300"],
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
</script>

<template>
  <div>
    <LineChart :chartData="saleData" />
    <div class="mt-6 mb-4">
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
