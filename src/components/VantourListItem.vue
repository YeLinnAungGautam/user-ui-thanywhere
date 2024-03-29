<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useVantourStore } from "../stores/vantour";
import { useToastStore } from "../stores/toast";

const props = defineProps({
  id: Number,
  vantours: Object,
});

const router = useRouter();
const vantourStore = useVantourStore();
const toastStore = useToastStore();

const emit = defineEmits();

const goRoom = (id, name) => {
  router.push({
    name: "room",
    params: {
      id: id,
      name: name,
    },
  });
};
const goList = (id) => {
  router.push({
    name: "vantours-carlist",
    params: {
      id: id,
    },
  });
};
const goEdit = (id) => {
  router.push({
    name: "vantours-edit",
    params: {
      id: id,
    },
  });
};
const goView = (id) => {
  router.push({
    name: "vantours-view",
    params: {
      id: id,
    },
  });
};

// const showPricePage = ref(false);

const showEdit = ref(false);
const showSetting = () => {
  showEdit.value = !showEdit.value;
};
</script>

<template>
  <div
    class="space-y-2 relative overflow-hidden rounded-xl"
    @click="goView(id)"
  >
    <div
      class="h-[240px] sm:h-[250px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-xl"
    >
      <img
        :src="vantours.cover_image"
        alt=""
        class="w-full h-full object-cover object-center"
        v-if="vantours.cover_image != null"
      />
      <img
        src="../../public/default-image.jpg"
        alt=""
        class="w-full h-full object-cover object-center"
        v-if="vantours.cover_image == null"
      />
    </div>

    <div class="">
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <p class="text-base pl-2 font-semibold text-main">
            {{ vantours.name }}
          </p>
        </div>
        <div
          class="text-base flex justify-between items-center pl-2 font-semibold pr-3 text-main gap-2 flex-wrap"
        >
          <p class="text-sm">price</p>
          <p class="text-lg">{{ vantours.lowest_car_price }} THB</p>
        </div>
        <div
          class="text-base flex justify-between items-center font-semibold pr-3 text-main gap-2 flex-wrap"
        >
          <div
            class="text-base pl-2 font-semibold flex justify-start items-center gap-2 flex-wrap"
          >
            <p
              v-for="(city, index) in vantours?.cities"
              :key="index"
              class="inline-block bg-main/20 text-xs px-2 py-1 rounded-md"
            >
              {{ city.name }}
            </p>
          </div>
          <p class="text-sm">{{ vantours?.cars.length }} car types</p>
        </div>
      </div>
    </div>
  </div>
</template>
