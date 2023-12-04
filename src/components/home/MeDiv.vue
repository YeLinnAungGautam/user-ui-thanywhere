<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const getMeHandle = async () => {
  const res = await authStore.getMe();
};

onMounted(async () => {
  await getMeHandle();
  console.log(user.value);
});
</script>

<template>
  <div
    class="mx-4 my-4 bg-gradient-to-l to-[#ffb95d] from-main drop-shadow px-10 flex justify-between items-center rounded-lg"
  >
    <div>
      <p class="text-white pt-10 font-semibold">{{ user?.name }}</p>
      <p class="text-white/80 text-sm">{{ user?.role }}</p>
      <p class="text-xs text-white mt-10 pb-8">Monthly Ranking #...</p>
    </div>
    <div>
      <img
        src="../../../public/logo.jpg"
        class="w-[90px] rounded-full"
        alt=""
      />
    </div>
  </div>
</template>
