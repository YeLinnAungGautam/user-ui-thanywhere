<template>
  <div class="relative bg-background">
    <div class="min-h-screen">
      <slot />
    </div>
    <div class="fixed bottom-0 w-full">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Footer from "./FooterHome.vue";
</script>
