<script setup>
import NavbarVue from "./Navbar.vue";
import FooterVue from "./Footer.vue";
</script>

<template>
  <div class="text-sm relative">
    <NavbarVue />
    <div class="">
      <slot />
    </div>

    <FooterVue />
  </div>
</template>
