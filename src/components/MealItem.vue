<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
// import { useHotelStore } from "../stores/hotel";
import { useMealStore } from "../stores/meal";
import { useToastStore } from "../stores/toast";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  id: Number,
  rooms: Object,
});

const router = useRouter();
// const hotelStore = useHotelStore();
const toastStore = useToastStore();
const mealStore = useMealStore();

const emit = defineEmits();

const goEdit = (id) => {
  router.push({
    name: "meal-edit",
    params: {
      id: id,
    },
  });
};

const showEdit = ref(false);
const showSetting = () => {
  showEdit.value = !showEdit.value;
};

const deleteRoom = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2463EB",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await mealStore.deleteAction(id);
      toastStore.showToast({
        icon: "success",
        title: "Sucess Deleted",
      });
      emit("change", "Room Deleted");
    }
  });
};
</script>

<template>
  <div class="space-y-2 relative overflow-hidden rounded-lg">
    <div
      class="h-[230px] sm:h-[300px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-xl"
    >
      <div v-if="rooms?.images.length > 0">
        <Carousel :wrap-around="true">
          <Slide v-for="i in rooms?.images" :key="i.id">
            <div class="carousel__item">
              <div class="h-full w-full overflow-hidden rounded-xl">
                <img
                  :src="i.image"
                  alt=""
                  class="object-cover object-center w-full h-full"
                  v-if="i.image != null"
                />
                <img
                  src="../../public/default-image.jpg"
                  alt=""
                  class="object-cover object-center w-full h-full"
                  v-if="i.image == null"
                />
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <img
        src="../../public/default-image.jpg"
        alt=""
        class="object-cover object-center w-full h-full"
        v-if="rooms.images.length == 0"
      />
    </div>

    <div>
      <div class="space-y-1 mt-2">
        <p class="text-base pl-2 font-semibold text-main">
          {{ rooms.name }}
        </p>
        <p class="text-xs pl-2 text-black text-justify">
          {{ rooms.description }}
        </p>
        <p class="text-sm pl-2 text-main">{{ rooms.max_person }} Person Max</p>
        <!-- <p class="text-sm pl-2">Bangkok City</p>
        <p class="text-sm pl-2 text-main">Allowment Available</p> -->
      </div>
      <div class="text-start mt-2">
        <p
          class="text-lg font-semibold text-main bg-main/10 inline-block px-4 py-1 rounded-xl"
        >
          {{ rooms.meal_price }} THB
        </p>
        <!-- <p class="text-xl pl-2 font-semibold text-main">3 Room Types</p> -->
      </div>
    </div>
  </div>
</template>
