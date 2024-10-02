<template>
  <div>
    <div class="space-y-2">
      <div class="w-full h-[190px] p overflow-hidden" @click="clickAction()">
        <ImageCarouselForCart :data="images" :style="'h-[190px]'" />
      </div>
      <div class="flex justify-between items-center gap-x-2 px-4">
        <div>
          <p class="text-sm font-medium">{{ data.name }}</p>
          <div class="flex justify-start gap-x-3 items-center py-2">
            <p
              class="flex justify-start items-center gap-x-1 text-xs font-normal"
            >
              <UserIcon class="w-4 h-4" /> {{ data.max_person }} pax
            </p>
            <p class="flex justify-start items-center gap-x-1 text-xs">
              <ArrowsPointingInIcon class="w-4 h-4" />comming soon
            </p>
          </div>
        </div>
        <div class="text-xl text-main whitespace-nowrap font-semibold text-end">
          ฿ {{ data.room_price }}
          <p
            @click="openRoom(data.id)"
            class="text-[10px] underline text-black font-normal whitespace-nowrap"
          >
            view detail
          </p>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <p
          @click="openCount"
          class="border flex justify-evenly items-center border-black/10 text-sm text-center w-full rounded-l-3xl py-2"
        >
          rooms
          <span class="flex justify-end gap-x-2 items-center"
            >{{ roomCount }} <ChevronDownIcon class="w-4 h-4"
          /></span>
        </p>
        <p
          @click="bookingAction"
          class="border border-black/10 text-sm bg-main text-white text-center w-full rounded-r-3xl py-2"
        >
          Book now
        </p>
      </div>
      <div
        class="border border-main/10 text-sm text-main rounded-full text-center w-full py-2"
      >
        Add to Cart
      </div>
    </div>
    <vue-bottom-sheet ref="myBottomSheetRoom" :max-height="1500">
      <div class="font-poppins">
        <div class="h-[90vh]">
          <div class="flex justify-between gap-x-2 items-center px-6 pb-4">
            <p class="text-base font-medium">{{ detail?.name }}</p>
            <XMarkIcon class="w-8 h-8" @click="closeRoom" />
          </div>
          <div class="ml-4 mr-4 rounded-xl h-[85vh] overflow-scroll">
            <div class="w-full h-[220px] p overflow-hidden">
              <ImageCarouselForCart :data="images" :style="'h-[220px]'" />
            </div>
            <div
              class="bg-white mt-4 mb-10 p-5 rounded-3xl border border-black/10 space-y-3"
            >
              <h1 class="font-medium">popular amenities</h1>
              <div class="space-y-2 border-b border-black/10">
                <p class="text-sm font-medium pb-2 pt-2">bathroom</p>
                <div
                  class="flex justify-start items-center gap-2"
                  v-for="(b, index) in bathroom"
                  :key="b.id"
                  :class="index == bathroom.length - 1 ? 'pb-5' : ''"
                >
                  <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
                  <p class="text-[12px]">{{ b.name }}</p>
                </div>
              </div>

              <div class="space-y-2 pt-2">
                <p class="text-sm font-medium pb-2">food & drinks</p>
                <div
                  class="flex justify-start items-center gap-2"
                  v-for="b in food"
                  :key="b.id"
                >
                  <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
                  <p class="text-[12px]">{{ b.name }}</p>
                </div>
              </div>
              <div class="flex justify-between items-center pt-4">
                <p class="text-xs font-medium">taxs & fees included</p>
                <div class="text-end">
                  <p class="text-[8px]">total amount</p>
                  <p class="font-semibold text-main text-lg">
                    ฿ {{ detail?.room_price }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
    <vue-bottom-sheet ref="myBottomSheetCount" :max-height="1500">
      <div class="font-poppins">
        <div class="">
          <div class="flex justify-between items-center px-6 pb-4">
            <p class="text-base font-medium">Rooms</p>
            <XMarkIcon class="w-5 h-5" @click="closeCount" />
          </div>
          <div
            class="ml-4 mr-4 divide-y divide-black/10 h-[40vh] overflow-scroll"
          >
            <div v-for="r in 6" :key="r" @click="roomCount = r">
              <div class="flex justify-between py-3 items-center px-6">
                <p class="text-sm">{{ r }} {{ r < 2 ? "room" : "rooms" }}</p>
                <input
                  type="checkbox"
                  name=""
                  :checked="roomCount == r"
                  id=""
                />
              </div>
            </div>
          </div>
          <div class="px-4 pb-3" @click="closeCount">
            <p
              class="text-center py-2 bg-main text-white text-base font-medium rounded-3xl"
            >
              choose ({{ roomCount }} Rooms )
            </p>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script setup>
import ImageCarouselForCart from "./ImageCarouselForCart.vue";
import { defineProps, onMounted, ref, defineEmits } from "vue";
import {
  UserIcon,
  ArrowsPointingInIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";
import { useRoomStore } from "@/stores/room";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";

const roomStore = useRoomStore();

const props = defineProps({
  data: Object,
});

const emit = defineEmits(["openImage", "booking"]);

const clickAction = () => {
  emit("openImage", props.data.name);
};

const images = ref([]);
const roomCount = ref(1);

const bathroom = [
  { id: 1, name: "bathropes" },
  { id: 2, name: "free toiletries" },
  { id: 3, name: "hair dryer" },
  { id: 4, name: "private bedroom" },
  { id: 5, name: "rainfall showerhead" },
  { id: 6, name: "shampoo" },
  { id: 7, name: "shower" },
  { id: 8, name: "slippers" },
  { id: 9, name: "toothpaste" },
  { id: 10, name: "toothbrush" },
];

const food = [
  { id: 1, name: "electric kettle" },
  { id: 2, name: "free bottled water" },
  { id: 3, name: "refrigerator" },
  { id: 4, name: "hydrated drinks" },
];

const myBottomSheetRoom = ref(null);
const myBottomSheetCount = ref(null);

const openCount = () => {
  myBottomSheetCount.value.open();
};
const closeCount = () => {
  myBottomSheetCount.value.close();
};

const detail = ref(null);
const openRoom = async (id) => {
  const res = await roomStore.getDetailAction(id);
  detail.value = res.data;
  console.log("====================================");
  console.log(detail.value);
  console.log("====================================");
  myBottomSheetRoom.value.open();
};
const closeRoom = () => {
  myBottomSheetRoom.value.close();
};

const getImages = () => {
  if (props.data?.images) {
    for (let a = 0; a < props.data?.images.length; a++) {
      images.value.push(props.data?.images[a].image);
    }
  }
};

const bookingAction = () => {
  let data = {
    room_qty: roomCount.value,
    amount: props?.data?.room_price,
    total_amount: props?.data?.room_price * roomCount.value,
    room_name: props?.data?.name,
    choose: props?.data,
  };
  emit("booking", data);
};

onMounted(() => {
  images.value = [];
  if (props.data) {
    getImages();
  }
});
</script>
