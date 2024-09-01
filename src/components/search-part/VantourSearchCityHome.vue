<script setup>
import HeaderHome from "../../components/layout/HeaderHome.vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import Layout from "../../components/layout/LayoutHome.vue";
import { useCityStore } from "../../stores/city";
import { storeToRefs } from "pinia";
// import vantourdb from "../assets/vantourdb";
import debounce from "lodash.debounce";

const cityStore = useCityStore();

const { cities } = storeToRefs(cityStore);

const router = useRouter();

const all = ref(false);
// const data = vantourdb;

const search = ref("Bangkok");
const searchId = ref(2);
const search_by_name = ref("");

const searchFunction = (data) => {
  search.value = data.name;
  searchId.value = data.id;
};

onMounted(async () => {
  await cityStore.getSimpleListAction();
  console.log(cities.value);
});

watch(
  [search_by_name, searchId],
  debounce(async () => {
    await cityStore.getListAction({ name: search_by_name.value });
    console.log("====================================");
    console.log(cities.value, "this is search");
    console.log("====================================");
  }, 500)
);
</script>

<template>
  <Layout>
    <HeaderHome :showTitle="false">
      <div class="px-6">
        <div class="">
          <div class="pb-2 flex justify-between items-center">
            <XMarkIcon class="w-8 h-8 text-white" @click="router.back()" />
            <p class="text-sm font-semibold text-white">Select a destination</p>
            <p class="opacity-0">...</p>
          </div>
          <div class="relative w-full">
            <input
              type="search"
              name=""
              v-model="search_by_name"
              @keyup.enter="goResultPage"
              placeholder=" search"
              class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
              id=""
            />
          </div>
        </div>
        <div class="pt-5 space-y-2">
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-white pb-2">
              most popular cities
            </p>
            <p
              class="text-white text-[10px] cursor-pointer"
              @click="all = !all"
            >
              {{ all ? "show less" : "show more" }}
            </p>
          </div>
          <div class="flex justify-start items-center gap-2 flex-wrap">
            <div v-for="(c, index) in cities?.data" :key="c.id">
              <p
                v-if="index < 6 || all"
                @click="searchFunction(c)"
                class="px-4 py-1.5 text-[10px] rounded-full"
                :class="
                  searchId == c.id
                    ? 'bg-main/40 border border-white text-white'
                    : 'bg-white text-main'
                "
              >
                {{ c?.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </HeaderHome>
  </Layout>
</template>
