<template>
  <div>
    <!-- <div class="flex justify-between items-center">
      <h1 class="text-main font-semibold px-6">best selling van tours</h1>
      <div
        @click="router.push('/home/van-tour')"
        class="text-[10px] font-semibold text-main flex justify-end items-center gap-1 mr-6"
      >
        <p>see more</p>
        <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div> -->
    <div class="grid grid-cols-1 gap-3 h-[700px] overflow-y-auto">
      <div
        class="bg-white shadow-sm pb-4 grid grid-cols-3 gap-4 mb-2"
        v-for="(i, index) in data"
        :class="
          index == data.length - 1
            ? ' border-b border-white'
            : 'border-b border-black/5'
        "
        :key="index"
      >
        <div class="w-full h-[140px] p-1.5 overflow-hidden">
          <img
            :src="i.cover_image"
            class="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </div>
        <div class="px-3 py-3 col-span-2">
          <!-- <StarPartVue :count="3" /> -->
          <p class="font-semibold text-sm pt-1">{{ i.name }}</p>
          <p
            class="text-[10px] bg-black/10 rounded-md py-0.5 px-2 inline-block"
          >
            {{ i?.cities[0]?.name }}
          </p>
          <p
            class="text-[10px] bg-black/10 rounded-md py-0.5 px-2 mx-2 inline-block"
          >
            3 destinations
          </p>
          <p class="text-xs pt-1 h-[52px] overflow-hidden">
            {{ i?.long_description }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center pb-4 pt-2">
      <div
        @click="router.push('/home/van-tour')"
        class="text-black border border-black/20 rounded-xl inline-block text-center py-3 font-semibold w-[300px]"
      >
        see more
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
// import StarPartVue from "../home/StarPart.vue";
import vantourdb from "../../assets/vantourdb";
import { useRouter } from "vue-router";

// const seeMore = ref(true);
const router = useRouter();
const data = ref(null);

onMounted(() => {
  data.value = vantourdb;
  console.log("====================================");
  console.log(data.value);
  console.log("====================================");
});
</script>
