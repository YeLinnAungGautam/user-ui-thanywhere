<template>
  <div>
    <div
      v-show="imageLoaded"
      class="shadow rounded-2xl p-2 border border-black/5 max-w-[220px]"
      :class="isActive ? 'bg-main' : 'bg-white'"
    >
      <div class="w-[200px] h-[120px] relative">
        <div class="w-full h-full overflow-hidden rounded-xl relative">
          <img
            :src="
              i?.images[0]?.image
                ? i.images[0]?.image
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEoaTsWQuPn6bW-_n6hqZvmy5Lh64qwETLg&s'
            "
            @load="onImageLoad"
            class="w-full h-full object-cover"
            alt=""
          />
          <p
            v-if="i?.has_breakfast == 1"
            class="text-[8px] text-main bg-white px-1.5 py-1 rounded-xl absolute top-2 right-2"
          >
            Breakfast Included
          </p>
        </div>
        <p
          v-if="percent != 0 && percent != NaN"
          class="text-xs bg-red/90 text-white rounded-full absolute -bottom-2 z-20 right-2 px-3 py-1 font-medium"
        >
          {{ percent }}% OFF
        </p>
      </div>
      <div class="px-2 pb-2 pt-3 space-y-2">
        <p
          class="font-medium text-sm line-clamp-1"
          :class="isActive ? 'text-white' : 'text-black'"
        >
          {{ i?.name }}
        </p>

        <div class="flex justify-between items-center">
          <button
            class="text-lg font-semibold"
            :class="isActive ? 'text-white' : 'text-main'"
          >
            {{ i?.room_price }}thb
            <span
              class="text-[10px] line-through text-black/50"
              v-if="
                i?.owner_price != 'null' &&
                i?.owner_price != 0 &&
                i?.owner_price != i?.room_price
              "
              >{{ i?.owner_price }}thb</span
            >
          </button>
          <p
            class="text-xs border rounded-full px-3 py-1 font-medium"
            @click="openRoom(i.id)"
            :class="
              isActive
                ? 'bg-main border-white text-white'
                : 'bg-white border-black/10 text-black'
            "
          >
            view
          </p>
        </div>
      </div>
    </div>

    <div
      v-show="!imageLoaded"
      class="bg-white shadow rounded-3xl p-2 border border-black/5 max-w-[220px]"
    >
      <div class="w-[200px] h-[150px] overflow-hidden">
        <img
          :src="LoadingImageCover"
          class="w-full h-full object-cover rounded-2xl opacity-20"
          alt=""
        />
      </div>
      <div class="bg-white p-2 space-y-2">
        <p
          class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-1"
        ></p>
        <p
          class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-1"
        ></p>
        <button
          class="bg-main animate-pulse px-3 mt-2 mb-2 py-1 rounded-xl text-xs font-semibold text-white"
        >
          loading
        </button>
      </div>
    </div>

    <vue-bottom-sheet ref="myBottomSheetRoom" :max-height="1500">
      <div class="font-poppins">
        <div class="h-[100vh]">
          <div class="flex justify-between items-center px-6 pb-4">
            <p class="text-base font-medium">{{ detail?.name }}</p>
            <XMarkIcon class="w-5 h-5" @click="closeRoom" />
          </div>
          <div class="ml-4 mr-4 rounded-xl h-[90vh] overflow-scroll">
            <ImageCarousel :data="detail?.images" />
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
                    {{ detail?.room_price }} THB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import ImageCarousel from "../../components/hotelbookings/ImageCarouselRoom.vue";
// import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";
import { useRoomStore } from "../../stores/room";

const roomStore = useRoomStore();
const settingStore = useSettingStore();
// const { language } = storeToRefs(settingStore);

const props = defineProps({
  i: Object,
  isActive: Boolean,
});

const imageLoaded = ref(false);

const onImageLoad = () => {
  imageLoaded.value = true;
  console.log("Image loaded");
};

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

const percent = computed(() => {
  if (
    props.i?.owner_price &&
    props.i?.room_price &&
    props.i?.owner_price != "null"
  ) {
    const calculatedPercent = (
      ((props.i?.owner_price * 1 - props.i?.room_price * 1) /
        props.i?.owner_price) *
      100
    ).toFixed(0); // Round to 2 decimal places if necessary
    return `${calculatedPercent}`;
  } else {
    return `0`;
  }
});

const myBottomSheetRoom = ref(null);
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

onMounted(() => {
  // console.log(props.i, "this is i");
  settingStore.getLanguage();
});
</script>
