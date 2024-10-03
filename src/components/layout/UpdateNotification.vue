<template>
  <div
    v-if="showNotification"
    class="fixed top-4 right-4 bg-main text-white p-4 rounded-lg shadow-lg z-50"
  >
    <p>A new version is available. Please reload the page to update.</p>
    <button
      @click="reloadPage"
      class="mt-2 bg-white text-main px-4 py-2 rounded"
    >
      Reload Now
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showNotification = ref(false);
let timer;

const checkForUpdate = () => {
  showNotification.value = true;
};

const reloadPage = () => {
  window.location.reload();
};

onMounted(() => {
  timer = setInterval(checkForUpdate, 30 * 60 * 1000); // 30 minutes in milliseconds
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
