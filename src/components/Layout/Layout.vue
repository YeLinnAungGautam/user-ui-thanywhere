<script setup>
import NavbarVue from "./Navbar.vue";
import FooterVue from "./Footer.vue";
import { computed } from "vue";

const currentUserUsage = computed(() => {
  if (window.innerWidth > 768) {
    return false;
  } else {
    return true;
  }
});
</script>

<template>
  <div class="text-sm relative">
    <div
      class="flex justify-center items-center w-full h-full"
      v-if="!currentUserUsage"
    >
      <img
        src="https://img.freepik.com/free-vector/eye-catching-coming-soon-web-page-background-with-megaphone-design_1017-50903.jpg?t=st=1711611402~exp=1711615002~hmac=95ca4b567f4b43e786a84e08214bdf819c1c539d42c7d2e9a4b6ca4cd7bb43ec&w=740"
        alt=""
      />
    </div>
    <div v-if="currentUserUsage">
      <NavbarVue />
      <div class="">
        <slot />
      </div>

      <FooterVue />
    </div>
  </div>
</template>
