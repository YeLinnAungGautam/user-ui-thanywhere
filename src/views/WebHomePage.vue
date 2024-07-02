<template>
  <div class="relative pb-10">
    <NavHeaderVue />
    <div class="sticky top-0 z-40 bg-white">
      <AllProductWebVue />
    </div>
    <HeroSectionVue />
    <ReadDestinationVue />
    <ThingToDoVue />
    <DivForTowVue />
  </div>
</template>

<script setup>
import HeroSectionVue from "../components/web-home/HeroSection.vue";
import AllProductWebVue from "../components/web-layout/AllProductWeb.vue";
import NavHeaderVue from "../components/web-layout/NavHeader.vue";
import ReadDestinationVue from "../components/web-home/ReadDestinations.vue";
import ThingToDoVue from "../components/web-home/ThingToDo.vue";
import DivForTowVue from "../components/web-home/DivForTow.vue";
</script>
