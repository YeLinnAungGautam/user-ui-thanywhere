<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useAirTicketStore } from "../stores/airticket";
import { useToastStore } from "../stores/toast";

const props = defineProps({
  id: Number,
  airtickets: [Object],
});

const router = useRouter();
const airticketStore = useAirTicketStore();
const toastStore = useToastStore();

const emit = defineEmits();

const goEdit = (id) => {
  router.push({
    name: "ticket-edit",
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
  <div class="space-y-2 relative overflow-hidden rounded-lg">
    <div
      class="h-[240px] sm:h-[250px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-xl"
    >
      <img
        src="../../public/flightticket.jpg"
        alt=""
        class="object-cover w-full h-full object-center"
      />
    </div>

    <div class="flex justify-between items-strat gap-2">
      <div class="space-y-2 mt-2">
        <p class="text-base pl-2 font-semibold text-main">
          {{ airtickets.price }} ( {{ airtickets?.airline.name }} )
        </p>
        <!-- <p class="text-base pl-2 font-semibold text-main">
          {{ airtickets.name }}
        </p> -->

        <p class="text-xs pl-2">{{ airtickets.description }}</p>
        <!-- <p class="text-sm pl-2">{{ city_name }}</p> -->
        <!-- <p class="text-sm pl-2 text-main">Allowment Available</p> -->
      </div>
      <div class="text-end mt-2 space-y-2">
        <!-- <p class="text-xl pl-2 font-semibold text-main">
          {{ airtickets?.tickets.length }} tickets
        </p>
        <p class="text-base pl-2 font-semibold text-main">
          $ {{ airtickets.starting_balance }}
        </p> -->
      </div>
    </div>
  </div>
</template>
