<template>
  <div v-if="!loading" class="pt-10 px-10 lg:px-20">
    <div class="flex justify-between items-center pb-1">
      <h1 class="text-black text-xl font-semibold">things to do in bangkok</h1>
    </div>
    <div
      class="flex flex-1 justify-start space-x-3 mt-6 items-center overflow-x-scroll scroll-container"
    >
      <div
        class="bg-white shadow rounded-2xl mb-3 border border-black/10 p-2"
        v-for="i in entrances?.data"
        @click="router.push('/home/attraction-detail/' + i.id)"
        :key="i"
      >
        <div class="w-[250px] h-[150px] overflow-hidden">
          <img
            :src="i?.cover_image"
            v-if="i?.cover_image"
            class="w-full h-full object-cover rounded-2xl"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
            v-if="!i?.cover_image"
            class="w-full h-full object-cover rounded-2xl"
            alt=""
          />
        </div>
        <div class="px-3 py-2 space-y-2">
          <p class="font-semibold text-sm">{{ i?.name }}</p>
          <p
            class="text-black/60 bg-black/10 inline-block px-1 py-0.5 rounded-md text-[10px]"
          >
            bangkok
          </p>
          <p class="text-xs h-[60px] overflow-hidden">
            {{ i?.description }}
          </p>
          <div class="pt-2">
            <!-- {{ i?.lowest_variation_price }} thb /  -->
            <button
              class="bg-main px-6 mt-2 mb-2 py-2 rounded-lg font-semibold text-white"
            >
              view details
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center pt-4">
      <div
        @click="router.push(`/home/attraction-result/2/Bangkok`)"
        class="text-black border border-black/20 rounded-xl inline-block text-center py-3 font-semibold w-[300px]"
      >
        see more
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useEntranceStore } from "../../stores/entrance";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const entranceStore = useEntranceStore();
const router = useRouter();

const { entrances, loading } = storeToRefs(entranceStore);

onMounted(async () => {
  await entranceStore.getListAction({ city_id: 2 });
  console.log("====================================");
  console.log(entrances.value);
  console.log("====================================");
});
</script>
