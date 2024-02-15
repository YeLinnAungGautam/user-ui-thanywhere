<script setup>
import ProductCartVue from "../../ProductCart/HotelCart.vue";
import { useDestinationStore } from "../../../stores/destination";
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const destinationStore = useDestinationStore();
const { dests } = storeToRefs(destinationStore);

const props = defineProps({
  data: Object,
});

const dataArray = ref([]);
const destinations = ref("");

const searchId = ref("");
const filterArray = (name) => {
  searchId.value = name;
  dataArray.value = [];
  console.log(name);

  if (name) {
    dataArray.value = [];
    dataArray.value = props.data?.hotels.filter((tour) => {
      // console.log(tour.place);
      return tour.place == name;
    });
  }
};

const goPage = (id, name) => {
  router.push({
    name: "product-hot-search",
    params: {
      id: id,
      city: name,
    },
  });
  // console.log(id, name);
};

onMounted(async () => {
  // const res = await destinationStore.getSimpleListAction();
  // destinations.value = res;
});
</script>

<template>
  <div>
    <div class="">
      <div class="flex justify-between items-center">
        <p class="text-lg font-semibold">{{ data.name }} hotels :</p>
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
          v-for="p in data.hotels"
          :key="p"
          @click="filterArray(p.place)"
          class="py-1 px-3 border border-black/20 rounded-full hover:border-none cursor-pointer hover:text-red hover:font-semibold whitespace-nowrap"
          :class="
            searchId != '' && searchId == p.place
              ? 'text-red font-semibold'
              : ''
          "
        >
          {{ p.place }}
        </p>
      </div>
    </div>
    <div
      class="flex overflow-x-scroll scroll-container space-x-6 pb-4"
      v-if="!searchId"
    >
      <div v-for="(a, index) in data?.hotels" :key="index">
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
