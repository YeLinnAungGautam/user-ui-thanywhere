<template>
  <div>
    <div>
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

const change = () => {
  next.value = true;
};
</script>
