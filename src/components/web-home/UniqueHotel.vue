<template>
  <div>
    <!-- <div class="flex justify-between items-center">
      <h1 class="text-main font-semibold px-6">unique hotels in thailand</h1>
      <div
        @click="goMore"
        class="text-[10px] font-semibold text-main flex justify-end items-center gap-1 mr-6"
      >
        <p>see more</p>
        <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div> -->
    <div class="grid grid-cols-1 gap-3 h-[700px] overflow-y-auto">
      <div
        class="bg-white shadow-sm pb-4 grid grid-cols-3 gap-4 mb-2"
        :class="
          index == data.length - 1
            ? ' border-b border-white'
            : 'border-b border-black/5'
        "
        v-for="(i, index) in data"
        :key="index"
        @click="goDetialPage(i?.id)"
      >
        <div class="w-full h-[140px] p-1.5 overflow-hidden">
          <img
            :src="i?.images[0]?.image"
            class="w-full h-full object-cover rounded-xl"
            alt=""
            v-if="i?.images.length > 0"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s"
            v-if="i?.images.length == 0"
            class="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </div>
        <div class="px-3 py-4 col-span-2">
          <!-- <StarPartVue :count="5" /> -->

          <p class="font-semibold text-sm pt-1">{{ i.name }}</p>
          <p
            class="text-[10px] bg-black/10 rounded-md py-0.5 px-2 inline-block"
          >
            {{ i.place }}
          </p>

          <p
            class="text-xs pt-1 h-[52px] overflow-hidden"
            v-if="i.description != 'null'"
          >
            {{ i.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center pb-4 pt-2">
      <div
        @click="goMore"
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
// import StarPartVue from "./StarPart.vue";
import unidb from "../../assets/unquiddb";
import { useRouter } from "vue-router";

const data = ref(null);

// const seeMore = ref(true);
const router = useRouter();

const goDetialPage = (id) => {
  router.push({ name: "HomeDetail", params: { id: id } });
};

const goMore = () => {
  router.push(`/home/hotel-filter/2/Bangkok/null/null/null`);
};

onMounted(() => {
  data.value = unidb;
  console.log("====================================");
  console.log(data.value);
  console.log("====================================");
});
</script>
