<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useAirLineStore } from "../stores/airline";
import { useToastStore } from "../stores/toast";

const props = defineProps({
  id: Number,
  airlines: [Object],
});

const router = useRouter();
const airlineStore = useAirLineStore();
const toastStore = useToastStore();

const emit = defineEmits();

const goTicket = (id, name) => {
  router.push({
    name: "ticket",
    params: {
      id: id,
      name: name,
    },
  });
};
const goView = (id) => {
  router.push({
    name: "airline-view",
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
  <div class="space-y-2 relative group overflow-hidden rounded-lg">
    <div
      class="h-[240px] sm:h-[250px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-xl"
    >
      <img
        src="../../public/flightticket.jpg"
        alt=""
        class="object-cover w-full h-full object-center"
      />
    </div>

    <div
      class="opacity-0 group-hover:opacity-100 absolute bg-white/80 top-[32%] w-full py-2 grid grid-cols-2 divide-x-2 divide-x-gray-400"
    >
      <p
        class="text-xs text-main text-center"
        @click="goTicket(id, airlines.name)"
      >
        Related tickets
      </p>
      <p class="text-xs text-main text-center" @click="goView(id)">
        View Detail
      </p>
    </div>

    <div class="flex justify-between items-strat gap-2">
      <div class="space-y-2 mt-2">
        <p class="text-base pl-2 font-semibold text-main">
          {{ airlines.legal_name }}
        </p>
        <p
          class="text-xs bg-main/10 px-3 py-1 rounded-md inline-block font-semibold text-main"
        >
          {{ airlines.name }}
        </p>

        <p class="text-sm pl-2">{{ airlines.description }}</p>
        <!-- <p class="text-sm pl-2">{{ city_name }}</p> -->
        <!-- <p class="text-sm pl-2 text-main">Allowment Available</p> -->
      </div>
      <div class="text-end mt-2 space-y-2">
        <p class="text-lg pl-2 font-semibold text-main">
          {{ airlines?.tickets.length }} tickets
        </p>
        <p
          class="text-xs bg-main/10 px-3 py-1 rounded-md inline-block font-semibold text-main"
        >
          $ {{ airlines.starting_balance }}
        </p>
      </div>
    </div>
  </div>
</template>
