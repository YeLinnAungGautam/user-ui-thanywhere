<script setup>
import { onMounted, ref, watch, defineEmits } from "vue";
import { useCityStore } from "../../stores/city";
import { storeToRefs } from "pinia";
// import vantourdb from "../assets/vantourdb";
import debounce from "lodash.debounce";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { MapPinIcon } from "@heroicons/vue/24/solid";

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
  <div class="">
    <div class="">
      <div class="relative w-full">
        <!-- <img
          :src="searchIcon"
          class="w-6 h-6 absolute top-3 left-3 bg-main p-1 rounded-full"
          alt=""
        /> -->
        <MagnifyingGlassIcon class="w-6 h-6 absolute top-3 text-main left-3" />
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
    <div class="pt-5 space-y-2">
      <div class="flex justify-between items-center">
        <p class="text-sm font-semibold text-black pb-2">most popular cities</p>
        <p class="text-black text-[10px] cursor-pointer" @click="all = !all">
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
                ? 'bg-main border font-semibold border-white  text-white'
                : 'bg-white text-black/80 border font-semibold  border-black/10'
            "
          >
            {{ c?.name }}
          </p>
        </div>
      </div>
      <div
        class="border shadow-custom border-black/10 rounded-2xl space-y-4 overflow-hidden mt-4 p-4 h-[400px]"
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
          <MapPinIcon class="w-9 h-9 text-main ml-2" />
          <div>
            <p class="text-base text-main font-semibold mt-2">
              {{ c.name }}
            </p>
            <p class="text-xs text-main font-normal">thailand 20 van tours</p>
          </div>
        </div>
      </div>
      <div
        class="flex justify-between gap-4 px-4 items-center py-4 border-t border-black/10"
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
  </div>
</template>
