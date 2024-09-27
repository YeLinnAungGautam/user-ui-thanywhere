<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-main font-semibold px-6">why book with us</h1>
    </div>
    <div
      class="flex flex-1 justify-start space-x-3 mt-6 items-center overflow-x-scroll scroll-container"
    >
      <div
        class="bg-white rounded-3xl mb-3 px-2 pt-2"
        :class="index == 0 ? 'ml-6' : 'ml-0'"
        v-for="(i, index) in data"
        :key="i"
      >
        <div class="w-[200px] space-y-2 py-3 px-2">
          <img
            :src="i.image"
            class="h-auto"
            alt=""
            :class="i.id == 4 ? 'w-[90px]' : 'w-[80px]'"
          />
          <p class="text-[12px] font-semibold">{{ i.title }}</p>
          <p
            class="text-[10px] font-medium h-auto line-clamp-3 pb-1 text-black/80 text-left"
          >
            {{ i.description }}
          </p>
          <p
            @click="open(i.id)"
            class="text-xs bg-main inline-block text-white rounded-full px-3 py-1 font-medium"
          >
            learn more
          </p>
        </div>
      </div>
    </div>
    <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
      <div class="font-poppins">
        <div class="h-[80vh]">
          <div class="flex justify-between items-center px-6 pb-4">
            <p class="opacity-0">........</p>
            <p class="text-black text-sm font-medium" v-if="openPart == 1">
              Book With Confidence
            </p>
            <p class="text-black text-sm font-medium" v-if="openPart == 2">
              Visit Our Offices
            </p>
            <p class="text-black text-sm font-medium" v-if="openPart == 3">
              Travel With Trust
            </p>
            <p class="text-black text-sm font-medium" v-if="openPart == 6">
              Growing With You
            </p>
            <XMarkIcon class="w-5 h-5" @click="close" />
          </div>
          <div
            class="border border-black/10 p-4 ml-4 mr-4 rounded-xl h-[90vh] overflow-scroll"
          >
            <div v-if="openPart == 1">
              <BookWithConfidence />
            </div>
            <div v-if="openPart == 2">
              <VisitOurOffice />
            </div>
            <div v-if="openPart == 3">
              <TravelWithTrust />
            </div>
            <div v-if="openPart == 6">
              <BookWithConfidence />
            </div>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script setup>
import image1 from "../../assets/s/discover thailand.svg";
import image2 from "../../assets/s/get best prices.svg";
import image3 from "../../assets/s/book with confidence.png";
import image4 from "../../assets/trust.png";
import image5 from "../../assets/s/growing with you.svg";
import image6 from "../../assets/Trust_378x348.png";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import BookWithConfidence from "./whybookInfo/BookWithConfidence.vue";
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import VisitOurOffice from "./whybookInfo/VisitOurOffice.vue";
import TravelWithTrust from "./whybookInfo/TravelWithTrust.vue";
import { useRouter } from "vue-router";
const myBottomSheet = ref(null);
const openPart = ref("");

const router = useRouter();

const open = (id) => {
  if (id != 4 && id != 5) {
    openPart.value = id;
    myBottomSheet.value.open();
  }
  if (id == 4) {
    router.push("/home/destination");
  }
  if (id == 5) {
    router.push("/search");
  }
};

const close = () => {
  openPart.value = "";
  myBottomSheet.value.close();
};

const data = [
  {
    id: 1,
    title: "Book with Confidence",
    description:
      "Our team of trained agents are with you at every step of the way. Making your trip safe and easy.",
    image: image3,
  },
  {
    id: 2,
    title: "Visit our Offices",
    description:
      "Our global team and many more are working around the clock to improve travel experience.",
    image: image6,
  },
  {
    id: 3,
    title: "Travel with Trust",
    description:
      "TAT licensed and direct partnership allows us to resolve all matters at hand bringing you peace of mind.",
    image: image4,
  },
  {
    id: 4,
    title: "Discover Thailand",
    description:
      "Explore from hundreds of tours, attractions, hotels and destinations around Thailand.",
    image: image1,
  },
  {
    id: 5,
    title: "Get best prices",
    description:
      "Get great prices that are cheaper than walk-ins and save more on your next trip.",
    image: image2,
  },
  {
    id: 6,
    title: "Growing with You",
    description:
      "Our global team and many more are working around the clock to improve travel experience.",
    image: image5,
  },
];
</script>
