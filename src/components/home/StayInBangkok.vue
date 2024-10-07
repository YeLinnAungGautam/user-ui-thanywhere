<template>
  <div class="relative">
    <div
      class="flex justify-between items-center sticky top-0 z-10 py-2 bg-background"
    >
      <div
        class="text-main font-semibold flex justify-start items-center flex-nowrap line-clamp-1 pl-6"
      >
        <p class="whitespace-nowrap">stays in bangkok</p>
        <p
          v-if="choosePlace"
          class="px-2 py-0.5 mx-2 text-[10px] bg-black/10 text-black/80 font-medium rounded-xl whitespace-nowrap line-clamp-1"
        >
          {{ choosePlace }}
        </p>
      </div>
      <div
        @click="showModal = !showModal"
        class="text-[10px] font-semibold text-main cursor-pointer flex justify-end items-center gap-1 mr-6"
      >
        <p class="whitespace-nowrap line-clamp-1">filter place</p>
        <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div
      class="flex justify-start items-center overflow-x-scroll space-x-1.5 pt-1 px-6 scroll-container"
    >
      <p
        @click="getList('0-1200')"
        :class="type == '0-1200' ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border rounded-full"
      >
        budget <span class="text-[8px]">( &lt; 1200)</span>
      </p>
      <p
        @click="getList('1200-1800')"
        :class="
          type == '1200-1800' ? 'border-main text-main' : 'border-black/10'
        "
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border rounded-full"
      >
        standard <span class="text-[8px]">(1200 - 1800)</span>
      </p>
      <p
        @click="getList('1800-3000')"
        :class="
          type == '1800-3000' ? 'border-main text-main' : 'border-black/10'
        "
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border rounded-full"
      >
        premium <span class="text-[8px]">(1800 - 3000)</span>
      </p>
      <p
        @click="getList('3000-100000')"
        :class="
          type == '3000-100000' ? 'border-main text-main' : 'border-black/10'
        "
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border rounded-full"
      >
        luxury <span class="text-[8px]">(3000+)</span>
      </p>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-6 mt-4"
      v-if="loading"
    >
      <div v-for="a in 8" :key="a">
        <!-- v-if="lists.length == 0" -->
        <div class="bg-white shadow-sm rounded-2xl mb-2 border border-black/10">
          <div class="w-full h-[140px] p-1.5 overflow-hidden">
            <img
              :src="LoadingImageCover"
              class="w-full h-full object-cover opacity-30 rounded-xl"
              alt=""
            />
          </div>
          <div class="px-3 py-1">
            <p
              class="text-main text-[10px] bg-black/20 w-10 h-2 animate-pulse"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-32 h-4 animate-pulse mt-2"
            ></p>
            <p
              class="text-main text-[10px] bg-black/20 w-10 h-3 mt-2 animate-pulse"
            ></p>
            <p
              class="text-main text-[10px] bg-black/20 w-full h-2 mt-2 animate-pulse"
            ></p>
            <p
              class="text-main text-[10px] bg-black/20 w-full h-2 mt-1 animate-pulse"
            ></p>
            <p
              class="text-main text-[10px] bg-black/20 w-full h-2 mt-1 animate-pulse"
            ></p>

            <button
              class="bg-main animate-pulse px-3 mt-2 mb-2 py-1 rounded-xl text-xs font-semibold text-white"
            >
              loading
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="lists.length == 0 && !loading"
      class="flex flex-1 justify-center space-x-3 mt-3 py-20 items-center overflow-x-scroll scroll-container"
    >
      <img :src="issue" class="w-10 h-10" alt="" />
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-6 mt-4"
      v-if="lists.length > 0 && !loading"
    >
      <div
        class="bg-white shadow-sm rounded-2xl mb-2 border border-black/10"
        v-for="(i, index) in lists"
        :key="index"
        @click="goDetialPage(i?.id)"
      >
        <StayInBangkokCart :i="i" />
      </div>
    </div>
    <div
      @click="goMore()"
      class="text-[10px] font-semibold text-main flex justify-center mt-2 items-center gap-1 border border-black/10 mx-6 py-2 rounded-xl"
    >
      <p class="whitespace-nowrap">see more</p>
      <ChevronDownIcon class="w-3 h-3" />
    </div>
    <Modal v-model="showModal">
      <h2 class="text-sm text-main font-medium">Choose Place</h2>
      <!-- <input
        type="search"
        v-model="searchTerm"
        name=""
        class="w-full border border-main px-4 mt-3 py-1.5 text-sm rounded-2xl text-main focus:outline-none bg-transparent"
        id=""
      /> -->
      <div class="space-y-1 h-[200px] overflow-y-scroll pt-3">
        <div
          class="flex justify-between items-center space-y-1 pr-4"
          @click="choosePlace = ''"
        >
          <p
            class="text-xs w-[120px] line-clamp-1"
            :class="choosePlace == '' ? 'text-main' : ''"
          >
            All places
          </p>
          <input type="checkbox" name="" :checked="choosePlace == ''" id="" />
        </div>
        <div
          class="flex justify-between items-center space-y-2 pr-4"
          v-for="c in filteredCities ?? []"
          :key="c"
          @click="choosePlace = c"
        >
          <p
            class="text-xs w-[120px] line-clamp-1"
            :class="c == choosePlace ? 'text-main' : ''"
          >
            {{ c }}
          </p>
          <input type="checkbox" name="" :checked="c == choosePlace" id="" />
        </div>
      </div>
      <div class="space-x-2 flex justify-between items-center pt-3">
        <button
          class="px-3 py-1 text-xs text-white bg-main rounded-2xl border border-main"
          @click="chooseAction"
        >
          Choose
        </button>
        <button
          class="px-3 py-1 text-xs text-main bg-transparent border border-main rounded-2xl"
          @click="showModal = !showModal"
        >
          Close
        </button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref, computed } from "vue";
// import StarPartVue from "./StarPart.vue";
// import stayinbangkok from "../../assets/db";
import { useSettingStore } from "../../stores/setting";
import { useRouter } from "vue-router";
import { useHotelStore } from "../../stores/hotel";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import StayInBangkokCart from "../../components/LoadingCarts/StayInBangkokCart.vue";
import { storeToRefs } from "pinia";
import Modal from "./ShowModal.vue";
import issue from "@/assets/no-connection.png";

// const data = ref(null);
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);
const router = useRouter();
const hotelStore = useHotelStore();

const goDetialPage = (id) => {
  router.push({
    name: "HomeDetail",
    params: { id: id },
    query: { language: language.value },
  });
};

const lists = ref([]);

const goMore = () => {
  router.push(
    `/v2/home/hotel-filter/2/Bangkok/?price=null&rating=null&place=null&facilities=null&search=`
  );
};

const type = ref("0-1200");

const loading = ref(false);

const getList = async (a) => {
  console.log(a, "this is type");
  loading.value = true;
  lists.value = [];
  type.value = a;
  let data = {
    city_id: 2,
    price_range: a,
    limit: 8,
  };
  if (choosePlace.value != "") {
    data.place = choosePlace.value;
  }
  const res = await hotelStore.getListAction(data);
  lists.value = res.data;
  console.log(lists.value, "this is stay in bangkkok");
  loading.value = false;
};

const placeList = ref([
  "Pratunam",
  "Don Mueang Airport",
  "Silom",
  "Sukhumvit",
  "Suvanabhumi Airport",
  "Siam",
  "Ramkhamhaeng",
  "Lumphini",
  "Ratchaprarop Road",
  "Bangkok",
  "Near Chatuchak weekend Market",
  "Near Shrewsbury International School Bangkok",
  "Pratunam Area",
  "China Town",
  "Riverside",
  "Sathorn",
  "Ratchathewi",
  "Chatuchak",
  "Thong Lo",
  "silom",
  "Watthana",
  "Khao san",
  "Ratchadapisek Road",
  "Bang Kapi",
  "Patong",
  "Impact Arena",
  "56 Rong Mai Alley",
  "Rama IV Rd",
  "Surawong",
  "Pathum Thani",
  "Phetchaburi",
  "Pracha Uthit",
  "Pratu Nam",
  "a",
  "Asoke",
  "pratunam",
  "Chiang Mai",
  "Makkasan",
  "Toscana Valley",
  "Khaosan",
  "Novotel Bangkok Impact",
  "Phasi Charoen",
  "Suvarnabhumi Airport",
  "Khao San",
  "Riverside Area",
  "Bangkapi",
  "Sathon",
  "NJoy Prestige Grand Hotel Don Mueang",
  "Florida Bangkok Hotel",
]);
const showModal = ref(false);
const searchTerm = ref("");
const choosePlace = ref("");

const filteredCities = computed(() => {
  if (placeList?.value.length != 0) {
    return placeList?.value.filter((place) =>
      place.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  } else {
    return [];
  }
});

const chooseAction = async () => {
  if (choosePlace.value != "") {
    loading.value = true;
    lists.value = [];
    const res = await hotelStore.getListAction({
      limit: 8,
      place: choosePlace.value,
      price_range: type.value,
    });
    lists.value = res.data;
    showModal.value = false;
    loading.value = false;
  } else {
    loading.value = true;
    lists.value = [];
    const res = await hotelStore.getListAction({
      limit: 8,
      city_id: 2,
      price_range: type.value,
    });
    lists.value = res.data;
    showModal.value = false;
    loading.value = false;
  }
};

onMounted(async () => {
  lists.value = [];
  loading.value = true;
  // data.value = stayinbangkok;
  let data = {
    city_id: 2,
    limit: 8,
    price_range: type.value,
  };
  if (choosePlace.value != "") {
    data.place = choosePlace.value;
  }
  const res = await hotelStore.getListAction(data);

  lists.value = res.data;
  loading.value = false;
});
</script>
