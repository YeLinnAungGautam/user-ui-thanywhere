<template>
  <div class="relative overflow-hidden">
    <div class="relative">
      <carousel v-bind="settings" @slide-start="handleSlideStart">
        <slide v-for="(slide, index) in showImage" :key="index">
          <div class="w-full h-full">
            <!-- <div class="w-full h-[420px] overflow-hidden">
              <img
                :src="slide.image"
                class="w-full h-full object-cover rounded-b-[60px]"
                alt=""
              />
            </div> -->
            <ImageCarouselCart :i="slide.image" />
          </div>
        </slide>

        <!-- <template #addons>
          <pagination class="customPagi" />
        </template> -->
        <template #addons>
          <!-- <pagination class="custom" /> -->
          <div
            class="custom flex justify-center items-center w-[50px] space-x-1 mb-8 overflow-hidden mx-auto"
          >
            <!-- <div
              class="rounded-full"
              v-for="(i, index) in showImage"
              :key="i"
              :class="[
                currentIndex == index ? 'bg-white w-3 h-3' : 'bg-[#dfdadae9]',
                index > 5 ? 'hidden' : '',
                currentSlideIndex == index ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5',
                prevSlideIndex == index ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5',
                currentIndex < 3 &&  totalSlideCount < 6 ? index < 2 ? 'hidden': ''
              ]"
            ></div> -->
            <div
              v-for="(slide, index) in visibleDots"
              :key="index"
              :class="[
                'rounded-full',
                currentIndex === slide ? 'bg-white w-3 h-3' : 'bg-[#e2e2e2f9]',
                currentIndex === slide ? 'w-[11px] h-[11px]' : 'w-1.5 h-1.5',
                currentSlideIndex == slide
                  ? 'w-2 h-2 bg-[#f2f2f2]'
                  : 'w-1.5 h-1.5',
                prevSlideIndex == slide
                  ? 'w-2 h-2 bg-[#f2f2f2]'
                  : 'w-1.5 h-1.5',
              ]"
            ></div>
          </div>
        </template>
      </carousel>
    </div>
    <div
      class="bg-white absolute -bottom-6 rounded-full h-[50px] w-full z-30"
    ></div>
  </div>
</template>

<script setup>
// import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { onMounted, defineProps, ref, computed } from "vue";
import ImageCarouselCart from "../LoadingCarts/ImageCarouselCart.vue";
// import homeGradesdb from "../../assets/homeGrades";

const settings = {
  itemsToShow: 1,
  snapAlign: "start",
};

const currentIndex = ref(0);
const totalSlideCount = ref(0);
const currentSlideIndex = ref(0);
const prevSlideIndex = ref(1);
const handleSlideStart = (index) => {
  console.log(index);
  console.log("====================================");
  console.log("====================================");
  currentIndex.value = index.slidingToIndex;
  totalSlideCount.value = index.slidesCount;
  currentSlideIndex.value = index.slidingToIndex + 1;
  prevSlideIndex.value = index.slidingToIndex - 1;
};

const props = defineProps({
  data: Array,
});

const visibleDots = computed(() => {
  const maxVisibleDots = 6;
  const start = Math.max(0, currentSlideIndex.value - 4);
  const end = Math.min(start + maxVisibleDots, showImage.value.length);

  return Array.from({ length: end - start }, (_, i) => start + i);
});

const showImage = ref([]);

const simple = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s",
  },
];

onMounted(() => {
  console.log("====================================");
  console.log(props?.data);
  console.log("====================================");
  if (props.data == undefined || props.data.length == 0) {
    showImage.value = simple;
    console.log("hello");
  } else {
    showImage.value = props.data;
  }
});
</script>

<style>
.customPagi {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
.customPagi .carousel__pagination-button {
  display: block;
  border: 0;
  margin: 0px 0px 20px 0px !important;
  cursor: pointer;
  padding: var(--vc-pgn-margin);
  background: transparent;
}
</style>
