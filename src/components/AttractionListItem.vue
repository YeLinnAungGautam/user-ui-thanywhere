<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useEntranceStore } from "../stores/entrance";
import { useToastStore } from "../stores/toast";

const props = defineProps({
  id: Number,
  attractions: [Object],
});

const router = useRouter();
const entranceStore = useEntranceStore();
const toastStore = useToastStore();

const emit = defineEmits();

const goVariation = (id, name) => {
  router.push({
    name: "variations",
    params: {
      id: id,
      name: name,
    },
  });
};
const goEdit = (id) => {
  router.push({
    name: "attraction-edit",
    params: {
      id: id,
    },
  });
};
const goView = (id) => {
  router.push({
    name: "attraction-view",
    params: {
      id: id,
    },
  });
};

const showEdit = ref(false);
const showSetting = () => {
  showEdit.value = !showEdit.value;
};
</script>

<template>
  <div class="space-y-2 relative overflow-hidden rounded-lg group">
    <div
      class="h-[230px] sm:h-[300px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-xl"
    >
      <img
        :src="attractions.cover_image"
        alt=""
        class="w-full h-full object-cover object-center"
        v-if="attractions.cover_image != null"
      />
      <img
        src="../../public/default-image.jpg"
        alt=""
        class="w-full h-full object-cover object-center"
        v-if="attractions.cover_image == null"
      />
    </div>
    <div
      class="opacity-0 group-hover:opacity-100 absolute bg-white/80 top-[32%] w-full py-2 grid grid-cols-2 divide-x-2 divide-x-gray-400"
    >
      <p
        class="text-xs text-main text-center"
        @click="goVariation(id, attractions.name)"
      >
        View Tickets
      </p>
      <p class="text-xs text-main text-center" @click="goView(id)">
        View Detail
      </p>
    </div>

    <div class="flex justify-between items-center gap-2">
      <div class="space-y-2 mt-2">
        <p class="text-base pl-2 font-semibold text-main">
          {{ attractions.name }}
        </p>
        <div
          class="text-xs text-black/80 pl-2 font-semibold flex justify-start items-center gap-2 flex-wrap"
        >
          <p
            v-for="(city, index) in attractions?.cities"
            :key="index"
            class="bg-main/10 py-1 text-main rounded-lg px-2"
          >
            {{ city.name }}
          </p>
        </div>
        <p class="text-xs text-black/80 pl-2">{{ attractions.description }}</p>
        <!-- <p class="text-sm pl-2">{{ city_name }}</p> -->
        <!-- <p class="text-sm pl-2 text-main">Allowment Available</p> -->
      </div>
      <div class="text-end">
        <p class="text-4xl pl-2 font-semibold text-main">
          {{ attractions?.variations.length }}
          <span class="text-sm">ticket</span>
        </p>
        <!-- <p class="text-xl pl-2 font-semibold text-main">Totals</p> -->
      </div>
    </div>
  </div>
</template>
