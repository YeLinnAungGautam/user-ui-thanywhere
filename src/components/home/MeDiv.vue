<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useAdminStore } from "../../stores/admin";

const authStore = useAuthStore();
const adminStore = useAdminStore();

const { user } = storeToRefs(authStore);

const getMeHandle = async () => {
  const res = await authStore.getMe();
};

const rank = ref("");
const getRank = async () => {
  const res = await adminStore.rankAction();
  console.log(res.result.rank);
  rank.value = res.result.rank;
};

onMounted(async () => {
  await getMeHandle();
  await getRank();
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
      <p class="text-xs text-white mt-10 pb-8">
        Today Ranking # <span class="text-base">{{ rank }}</span>
      </p>
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
