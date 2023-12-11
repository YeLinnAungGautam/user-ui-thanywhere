<template>
  <div
    class="flex items-center justify-between mb-3 pt-3 border-t border-main"
    v-if="data"
  >
    <div class="">
      <nav class="inline-flex gap-3 w-full" aria-label="Pagination">
        <!-- <button
          v-for="page in pages"
          :key="page"
          @click.prevent="changePage(page.url)"
          aria-current="page"
          :disabled="!page.url"
          :class="[
            page.active ? 'bg-[#ff613c] text-white' : 'bg-white text-[#ff613c]',
            !page.url ? 'bg-gray-100 border-none text-gray-500' : '',
          ]"
          class="relative z-10 inline-flex items-center w-10 h-10 justify-center text-xs rounded-full font-medium focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {{ page.label }}
        </button> -->
        <p
          class="inline-block mr-2 text-gray-500 text-main font-semibold text-base"
        >
          {{ data.meta.current_page }}
        </p>
        <select
          v-model="selectedPage"
          @change="changePage(selectedPage.url)"
          class="bg-main rounded-full text-white text-sm divide-y divide-white"
        >
          <option
            v-for="page in pages"
            :key="page.label"
            :value="page"
            :selected="page.active"
            class="text-white text-sm text-center"
          >
            {{ page.label }}
          </option>
        </select>
      </nav>
    </div>
    <div>
      <p
        class="inline-block mr-2 text-gray-500 text-main font-semibold text-base"
      >
        {{ data.meta.from }} to {{ data.meta.to }} of
        {{ data.meta.total }} totals
      </p>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import axios from "axios";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const selectedPage = ref("");
const selectpageNumber = ref("");

const emit = defineEmits(["changePage"]);

const pages = computed(() => {
  return props.data?.meta.links.map((page) => {
    let label = page.label;
    if (label === "&laquo; Previous") {
      label = "<";
    }
    if (label === "Next &raquo;") {
      label = ">";
    }
    return { ...page, label: label };
  });
});

console.log("🚀 ~ file: Pagination.vue:54 ~ pages ~ pages:", pages.value);
const changePage = async (url) => {
  emit("changePage", url);
};

onMounted(() => {
  console.log(props?.data, "this is testing");
  // for (let i = 0; i < pages.length; i++) {
  //   if (pages[i].active) {
  //     selectpageNumber.value = pages[i].label;
  //   }
  // }
});
</script>

<style lang="scss" scoped></style>
