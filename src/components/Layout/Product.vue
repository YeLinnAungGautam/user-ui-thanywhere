<script setup>
import {
  HomeModernIcon,
  HeartIcon,
  AdjustmentsHorizontalIcon,
  ArrowsRightLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { useCategoryStore } from "../../stores/category";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useCityStore } from "../../stores/city";
import Modal from "../Layout/Modal.vue";
import Pagination from "../Layout/Pagination.vue";

const router = useRouter();
const emit = defineEmits();
const categoryStore = useCategoryStore();
const cityStore = useCityStore();
const { categories } = storeToRefs(categoryStore);
const { city } = storeToRefs(cityStore);

const props = defineProps({
  name: String,
  total: Number,
});

const searchD = (id) => {
  console.log(id);
  emit("searchD", id);
  showModal.value = false;
};

const showModal = ref(false);

const showModalHander = () => {
  showModal.value = !showModal.value;
};

const changePage = async (url) => {
  await cityStore.getChangePage(url);
};

const chooseCity = (data) => {
  console.log(data);
  router.push({
    name: "product-van",
    params: {
      id: data.id,
      city: data.name,
    },
  });
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

const search = ref("");

onMounted(async () => {
  await categoryStore.getSimpleListAction();
  await cityStore.getSimpleListAction();
  console.log(city.value.data, "this is city");
});

watch(search, async () => {
  await categoryStore.getSimpleListAction({ search: search.value });
});
</script>
<template>
  <div class="">
    <Modal :isOpen="showModal" @closeModal="showModal = false">
      <DialogPanel
        class="w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl"
      >
        <DialogTitle
          as="h3"
          class="mb-5 text-lg font-medium leading-6 text-gray-900"
        >
          <div class="flex justify-between items-center pb-2 font-poppins">
            <p class="font-poppins text-xs">Click & Choose Category</p>
            <p
              @click="showModalHander"
              class="bg-main py-1 px-1 rounded-3xl text-xs text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </p>
          </div>
          <div class="space-y-3 font-poppins">
            <input
              type="text"
              name=""
              id=""
              class="text-sm border w-full py-2 px-4 rounded-md shadow-md"
              v-model="search"
              placeholder="search by name"
            />
            <div
              v-for="c in categories?.data"
              :key="c.id"
              class="px-4 py-2 rounded border border-black/30 shadow-md text-xs"
              @click="searchD(c.id)"
            >
              {{ c.name }}
            </div>
            <Pagination :data="categories" @change-page="changePage" />
            <div
              class="px-4 bg-main text-white py-2 rounded shadow-md text-xs"
              @click="searchD('')"
            >
              Clear Filter
            </div>
          </div>
        </DialogTitle>
      </DialogPanel>
    </Modal>
    <div class="px-4 bg-white">
      <div class="flex justify-between items-center pt-4">
        <div>
          <ChevronLeftIcon
            class="w-5 h-5 text-main cursor-pointer"
            @click="router.go(-1)"
          />
        </div>
        <div class="font-medium">
          Browse All Tour In
          <span class="text-main">{{ name }} ({{ total }})</span>
        </div>
        <div></div>
      </div>
      <div
        class="flex justify-start items-center gap-2 py-4 overflow-x-scroll scroll-container text-[10px] text-black/80"
      >
        <p
          @click="showModalHander"
          class="bg-main text-white py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold whitespace-nowrap"
        >
          Filter
        </p>
        <!-- <p
          @click="searchD('')"
          class="bg-white text-black py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold whitespace-nowrap"
        >
          All
        </p> -->
        <p
          v-for="p in city?.data"
          :key="p"
          @click="chooseCity(p)"
          class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold whitespace-nowrap"
          :class="name == p.name ? 'bg-main text-white' : ''"
        >
          {{ p.name }}
        </p>
      </div>
    </div>
  </div>
</template>
