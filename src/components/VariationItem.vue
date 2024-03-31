<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
// import { useHotelStore } from "../stores/hotel";
import { useVariationStore } from "../stores/variations";
import { useToastStore } from "../stores/toast";

const props = defineProps({
  id: Number,
  variations: Object,
});

const router = useRouter();
// const hotelStore = useHotelStore();
const toastStore = useToastStore();
const variationStore = useVariationStore();

const emit = defineEmits();

// const goEdit = (id) => {
//   router.push({
//     name: "variations-edit",
//     params: {
//       id: id,
//     },
//   });
// };

const showEdit = ref(false);
const showSetting = () => {
  showEdit.value = !showEdit.value;
};
</script>

<template>
  <div class="space-y-4 relative overflow-hidden rounded-lg">
    <div
      class="h-[240px] sm:h-[250px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-xl shadow"
    >
      <img src="../../public/attraction.jpg" alt="" class="object-cover" />
    </div>

    <div>
      <div class="space-y-1 mt-2">
        <p class="text-base pl-2 font-semibold text-main">
          {{ variations.name }}
        </p>
        <p class="text-sm pl-2 text-black/80">
          {{ variations?.entrance_ticket.name }}
        </p>
        <!-- <p class="text-sm pl-2">2 Person Max</p> -->
        <!-- 
        <p class="text-sm pl-2 text-main">Allowment Available</p> -->
      </div>
      <div class="text-start mt-2">
        <p class="text-xl pl-2 font-semibold text-main">
          {{ variations.price }} THB
        </p>
        <!-- <p class="text-xl pl-2 font-semibold text-main">3 Room Types</p> -->
      </div>
    </div>
  </div>
</template>
