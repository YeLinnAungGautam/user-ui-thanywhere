<template>
  <div class="w-full h-[80vh] overflow-hidden rounded-lg">
    <div class="bg-black/5">
      <div v-if="!next" class="w-full">
        <LanguagePartVue @change="change" />
      </div>

      <div v-if="next" class="w-full">
        <ShowOnboardingVue @change="onchangeComponent" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ShowOnboardingVue from "../components/home/ShowOnboarding.vue";
import LanguagePartVue from "../components/home/LanguagePart.vue";
import { ref } from "vue";

const next = ref(false);

const loading = ref(true);

const change = () => {
  next.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
