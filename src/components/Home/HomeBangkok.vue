<script setup>
import ProductCartVue from "../ProductCart/VantourCart.vue";
import { useCategoryStore } from "../../stores/category";
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

const props = defineProps({
  data: Object,
});

const dataArray = ref([]);
const destinations = ref("");

const searchId = ref("");
const filterArray = (id) => {
  searchId.value = id;
  dataArray.value = [];
  console.log(id);

  if (id) {
    dataArray.value = props.data?.private_van_tours.filter((tour) => {
      return tour.destinations.some(
        (destination) => destination.category.id == id
      );
    });
  }
};

const goPage = (id, name) => {
  router.push({
    name: "product-van",
    params: {
      id: id,
      city: name,
    },
  });
};

onMounted(async () => {
  const res = await categoryStore.getSimpleListAction();
  destinations.value = res;
  // console.log(props.data?.private_van_tours, "this is data");
});
</script>

<template>
  <div>
    <div class="">
      <div class="flex justify-between items-center">
        <p class="text-lg font-semibold">{{ data.name }} Tours :</p>
        <div>
          <div
            @click="goPage(data.id, data.name)"
            class="text-[10px] px-2 rounded-lg bg-main text-white py-0.5 cursor-pointer font-semibold"
          >
            See more
          </div>
        </div>
      </div>

      <div
        class="flex justify-start items-center gap-2 py-4 overflow-x-scroll scroll-container text-[10px] text-black/80"
      >
        <p
          @click="filterArray('')"
          class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold whitespace-nowrap"
        >
          All
        </p>
        <p
          v-for="p in destinations?.data"
          :key="p"
          @click="filterArray(p.id)"
          class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold whitespace-nowrap"
          :class="
            searchId != '' && searchId == p.id ? 'text-red font-semibold' : ''
          "
        >
          {{ p.name }}
        </p>
      </div>
    </div>
    <div
      class="flex overflow-x-scroll scroll-container space-x-6 pb-4"
      v-if="!searchId"
    >
      <div v-for="(a, index) in data?.private_van_tours" :key="index">
        <ProductCartVue :data="a" />
      </div>
    </div>
    <div
      class="flex overflow-x-scroll scroll-container space-x-6 pb-4"
      v-if="searchId"
    >
      <div v-for="(a, index) in dataArray" :key="index">
        <ProductCartVue :data="a" />
      </div>
    </div>
  </div>
</template>
