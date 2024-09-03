<script setup>
import { onMounted, ref, watch, defineEmits, computed } from "vue";
import { useCityStore } from "../../stores/city";
import { storeToRefs } from "pinia";
// import vantourdb from "../assets/vantourdb";
import debounce from "lodash.debounce";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
// import { MapPinIcon } from "@heroicons/vue/24/solid";
import MapImage from "../../assets/s/pin 1 (1).png";

const cityStore = useCityStore();

const { cities } = storeToRefs(cityStore);

const all = ref(false);
// const data = vantourdb;

const search = ref("");
const searchId = ref(null);
const search_by_name = ref("");

const searchFunction = (data) => {
  search.value = data.name;
  searchId.value = data.id;
  closetype();
};

const emit = defineEmits();

const closetype = () => {
  let data = {
    id: searchId.value,
    name: search.value,
  };
  emit("changeCity", data);
};

const clearCity = () => {
  search.value = "";
  searchId.value = null;
  emit("clearChange", "clear");
};

const lowercaseCity = (name) => {
  return name.toLowerCase();
};

onMounted(async () => {
  await cityStore.getSimpleListAction();
  console.log(cities.value);
});

const searchList = ref(null);

watch(
  [search_by_name, searchId],
  debounce(async () => {
    const res = await cityStore.getSearchListAction({
      search: search_by_name.value,
    });
    console.log("====================================");
    console.log(res, "this is search");
    searchList.value = res.data;
    console.log("====================================");
  }, 500)
);
</script>

<template>
  <div class="relative h-[100%]">
    <div class="relative px-4">
      <!-- <div class="bg-main absolute top-0 left-0 w-full h-full"></div> -->
      <div class="">
        <div class="relative z-10 w-full">
          <MagnifyingGlassIcon
            class="w-6 h-6 absolute top-3 text-main left-3"
          />
          <input
            type="search"
            name=""
            v-model="search_by_name"
            @keyup.enter="goResultPage"
            placeholder=" search"
            class="w-full rounded-full border border-main pr-6 pl-12 py-4 text-xs text-main focus:outline-none"
            id=""
          />
        </div>
      </div>
      <div class="pt-5 space-y-2 pr-2">
        <div class="flex justify-between items-center">
          <p class="text-sm font-semibold text-white pb-2">
            most popular cities
          </p>
          <p class="text-white text-[10px] cursor-pointer" @click="all = !all">
            {{ all ? "show less" : "show more" }}
          </p>
        </div>
        <div class="flex justify-start items-center gap-2 flex-wrap pb-5">
          <div v-for="(c, index) in cities?.data" :key="c.id">
            <p
              v-if="index < 6 || all"
              @click="searchFunction(c)"
              class="px-4 py-1.5 text-[10px] rounded-full"
              :class="
                searchId == c.id
                  ? 'bg-main border  border-white  text-white'
                  : 'bg-white text-main border   border-black/10'
              "
            >
              {{ c?.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="border shadow-custom border-black/10 bg-white rounded-2xl space-y-4 overflow-hidden p-4 h-[600px]"
    >
      <div
        class="flex justify-start items-center gap-4"
        v-for="c in searchList"
        :key="c.id"
        @click="searchFunction(c)"
        :class="
          searchId == c.id ? ' border-b font-semibold border-main pb-2' : ''
        "
      >
        <!-- <MapPinIcon class="w-9 h-9 text-main ml-2" /> -->
        <img :src="MapImage" class="w-6 h-6 text-main ml-2" alt="" />
        <div>
          <p class="text-lg text-main font-semibold mt-2">
            {{ lowercaseCity(c.name) }}
          </p>
          <p class="text-xs text-main font-normal">
            thailand <span class="">.</span> 20 van tours
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex sticky bottom-0 w-full z-20 bg-white justify-between gap-4 px-4 items-center py-4 border-t border-black/10"
    >
      <p class="text-main text-sm underline" @click="clearCity">Clear</p>
      <button
        @click="closetype"
        class="text-center border bg-main border-black/10 rounded-full py-2 w-[40%] text-sm text-white font-semibold"
      >
        choose
      </button>
    </div>
  </div>
</template>
