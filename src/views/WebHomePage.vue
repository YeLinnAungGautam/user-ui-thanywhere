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
    <Modal :isOpen="onBoradingShow" @closeModal="onBoradingShow = false">
      <DialogPanel
        class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-2 text-left align-middle shadow-xl transition-all"
      >
        <div class="w-full h-[400px] overflow-hidden rounded-lg">
          <img
            src="https://img.freepik.com/free-vector/creative-coming-soon-teaser-background_23-2148897256.jpg?t=st=1725118696~exp=1725122296~hmac=810bb85d8bad0ac85edf271ce9741479ccd5778811a5e85c8ebea081b9de4081&w=740"
            alt=""
            class="w-full h-full object-cover rounded"
          />
        </div>
      </DialogPanel>
    </Modal>
  </div>
</template>

<script setup>
import HeroSectionVue from "../components/web-home/HeroSection.vue";
import AllProductWebVue from "../components/web-layout/AllProductWeb.vue";
import NavHeaderVue from "../components/web-layout/NavHeader.vue";
import ReadDestinationVue from "../components/web-home/ReadDestinations.vue";
import ThingToDoVue from "../components/web-home/ThingToDo.vue";
import DivForTowVue from "../components/web-home/DivForTow.vue";
import { ref } from "vue";
import Modal from "../components/layout/Modal.vue";

const onBoradingShow = ref(true);
</script>
