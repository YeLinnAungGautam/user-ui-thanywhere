<template>
  <div
    class="flex items-center justify-between mb-3 pt-3 border-t border-main"
    v-if="data"
  >
    <div class="">
      <nav class="inline-flex gap-3 w-full" aria-label="Pagination">
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
      <p class="inline-block mr-2 text-gray-500 text-main font-medium text-sm">
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
});
</script>

<style lang="scss" scoped></style>
