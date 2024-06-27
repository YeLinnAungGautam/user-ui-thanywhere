<script setup>
import logoIcon from "../../assets/logo.png";
import profileIcon from "../../assets/icons/Search Bar Icons & Headline icons/account icon.svg";
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const router = useRouter();
const props = defineProps({
  showTitle: Boolean,
});

const goHomePage = () => {
  router.push("/home");
};
</script>

<template>
  <div class="w-full bg-gradient-to-b to-main from-main/60 rounded-b-[30px]">
    <div class="w-full pt-4 pb-6">
      <div
        class="flex justify-between items-center text-white px-6 pb-4"
        v-if="props.showTitle"
      >
        <img :src="logoIcon" class="w-10 h-10" alt="" @click="goHomePage" />
        <p class="font-semibold tracking-wide text-lg">THAILAND ANYWHERE</p>
        <!-- <UserCircleIcon class="w-6 h-6 text-white" /> -->
        <img :src="profileIcon" class="w-6 h-6" alt="" />
      </div>
      <slot />
    </div>
  </div>
</template>
