<template>
  <div class="relative bg-background">
    <div class="min-h-screen">
      <slot />
    </div>
    <div class="fixed z-30 bottom-0 w-full">
      <Footer />
    </div>
    <!-- <UpdateNotification /> -->
  </div>
</template>

<script setup>
// import UpdateNotification from "./UpdateNotification.vue";
import Footer from "./FooterHome.vue";
</script>
