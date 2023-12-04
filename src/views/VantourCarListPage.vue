<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { useVantourStore } from "../stores/vantour";
import NoDataPageVue from "../components/NoDataPage.vue";

const router = useRouter();
const route = useRoute();
const vantourStore = useVantourStore();

const vantour = ref(null);
const loading = ref(false);
const detail = async () => {
  loading.value = true;
  const res = await vantourStore.getDetailAction(route.params.id);
  console.log(res);
  loading.value = false;
  vantour.value = res.result;
};

const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  await detail();
});
</script>

<template>
  <div class="space-y-2 rounded-lg">
    <NavbarVue />
    <div class="px-4">
      <div class="relative">
        <div
          class="flex justify-start items-center gap-2 text-main absolute top-1"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </div>

        <p class="text-main text-lg pt-1 font-semibold w-full text-center">
          Vantour Car List
        </p>
      </div>
      <div class="pt-4" v-if="!loading">
        <div class="space-y-2 mt-2">
          <div
            class="text-base font-semibold grid grid-cols-2 gap-3 mx-2 px-2 border-b border-black/50 py-3 rounded"
            v-for="(c, index) in vantour?.cars"
            :key="index"
          >
            <p>{{ c.name }}</p>

            <p>{{ c.price }} THB</p>
            <p>Max Person</p>
            <p>{{ c.max_person }}</p>
            <p>Agent Price</p>
            <p>{{ c.agent_price }} THB</p>
          </div>
        </div>
        <div class="space-y-2 mt-2" v-if="vantour?.cars.length == 0">
          <div
            class="text-base font-semibold flex justify-center items-center gap-3 mx-2 px-2 py-3 rounded"
          >
            <NoDataPageVue />
          </div>
        </div>
      </div>
      <div v-if="loading" class="pt-4">
        <div
          class="relative flex justify-center items-center py-[50%]"
          v-if="loading"
        >
          <div
            class="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-main"
          ></div>
          <img src="../../public/logo.jpg" class="rounded-full h-16 w-16" />
        </div>
      </div>
    </div>
  </div>
</template>
