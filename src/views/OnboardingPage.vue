<template>
  <div>
    <div class="bg-black/5">
      <div v-if="!next">
        <LanguagePartVue @change="change" />
      </div>

      <div v-if="next">
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
