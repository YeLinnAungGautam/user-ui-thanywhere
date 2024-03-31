<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useGrouptourStore } from "../stores/grouptour";
import { useToastStore } from "../stores/toast";
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  id: Number,
  grouptours: Object,
});

const router = useRouter();
const grouptourStore = useGrouptourStore();
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
const goEdit = (id) => {
  router.push({
    name: "grouptour-edit",
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
  <div class="space-y-3 relative overflow-hidden rounded-lg">
    <div
      class="h-[240px] sm:h-[250px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-xl"
    >
      <div>
        <Carousel :wrap-around="true" v-if="grouptours?.images.length > 0">
          <Slide v-for="i in grouptours?.images" :key="i.id">
            <div class="carousel__item">
              <div
                class="h-[240px] sm:h-[250px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-xl"
              >
                <img
                  :src="i.image"
                  alt=""
                  class="object-cover w-full h-full object-center"
                  v-if="i.image != null"
                />
                <img
                  src="../../public/default-image.jpg"
                  alt=""
                  class="object-cover w-full h-full object-center"
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
        class="object-cover w-full h-full object-center"
        v-if="grouptours?.images.length == 0"
      />
    </div>

    <div class="pt-2">
      <div class="space-y-3">
        <div class="flex justify-between items-start">
          <div class="space-y-2">
            <p class="text-base pl-2 font-semibold text-main">
              {{ grouptours.name }}
            </p>

            <div
              class="text-xs pl-2 font-semibold flex justify-start items-center gap-2 flex-wrap"
            >
              <p
                v-for="(city, index) in grouptours?.cities"
                :key="index"
                class="bg-main/10 text-main p-1 rounded"
              >
                {{ city.name }}
              </p>
            </div>
          </div>
          <div>
            <p class="text-xl pl-2 flex-nowrap flex font-semibold text-main">
              {{ grouptours.price }}THB
            </p>
          </div>
        </div>
        <p class="text-xs pl-2 text-black/80 text-justify">
          {{ grouptours.description }}
        </p>
      </div>
    </div>
  </div>
</template>
