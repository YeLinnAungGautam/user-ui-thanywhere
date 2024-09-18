<template>
  <div class="relative">
    <div
      class="flex justify-between items-center sticky z-10 top-0 py-2 bg-background"
    >
      <h1 class="text-main font-semibold px-6">best selling attractions</h1>
      <div
        @click="showModal = !showModal"
        class="text-[10px] font-semibold text-main flex justify-end items-center gap-1 mr-6"
      >
        <p class="whitespace-nowrap">filter city</p>
        <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div
      class="flex justify-start items-center overflow-x-scroll space-x-1.5 pt-1 px-6 scroll-container"
    >
      <p
        @click="category_id = 32"
        :class="category_id == 32 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        amusement park
      </p>
      <p
        @click="category_id = 40"
        :class="category_id == 40 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        dinner cruises
      </p>
      <p
        @click="category_id = 31"
        :class="category_id == 31 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        water parks
      </p>
      <p
        @click="category_id = 17"
        :class="category_id == 17 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        safari
      </p>
      <p
        @click="category_id = 16"
        :class="category_id == 16 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        museums
      </p>
      <p
        @click="category_id = 29"
        :class="category_id == 29 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        theme parks
      </p>
      <p
        @click="category_id = 54"
        :class="category_id == 54 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        buffet
      </p>
      <p
        @click="category_id = 42"
        :class="category_id == 42 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        island tours
      </p>
      <p
        @click="category_id = 39"
        :class="category_id == 39 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        shows
      </p>
      <p
        @click="category_id = 22"
        :class="category_id == 22 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        skywalks
      </p>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-6 mt-4"
      v-if="data.length == 0"
    >
      <div v-for="a in 8" :key="a">
        <!-- v-if="data.length == 0" -->
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
            <p
              class="text-main text-[10px] bg-black/20 w-10 h-3 mt-4 animate-pulse"
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
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-6 mt-4"
      v-if="data.length > 0"
    >
      <div
        class="bg-white shadow-sm rounded-2xl mb-2 border border-black/10"
        v-for="(i, index) in data"
        :key="index"
        @click="goDetialPage(i.id)"
      >
        <BestSellingAttractionVue :i="i" />
      </div>
    </div>
    <div
      @click="router.push(`/home/attraction-result/2/Bangkok`)"
      class="text-[10px] font-semibold text-main flex justify-center mt-2 items-center gap-1 border border-black/10 mx-6 py-2 rounded-xl"
    >
      <p class="whitespace-nowrap">see more</p>
      <ChevronDownIcon class="w-3 h-3" />
    </div>
    <Modal v-model="showModal">
      <h2 class="text-sm text-main font-medium">Choose City</h2>
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
          @click="chooseCityAction('')"
        >
          <p class="text-xs" :class="chooseCity.id == '' ? 'text-main' : ''">
            All
          </p>
          <input type="checkbox" name="" :checked="chooseCity.id == ''" id="" />
        </div>
        <div
          class="flex justify-between items-center space-y-1 pr-4"
          v-for="c in filteredCities ?? []"
          :key="c"
          @click="chooseCityAction(c)"
        >
          <p class="text-xs" :class="c.id == chooseCity.id ? 'text-main' : ''">
            {{ c.name }}
          </p>
          <input
            type="checkbox"
            name=""
            :checked="c.id == chooseCity.id"
            id=""
          />
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
import { onMounted, ref, watch, computed } from "vue";
// import StarPartVue from "./StarPart.vue";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";
import { useRouter } from "vue-router";
import { useEntranceStore } from "../../stores/entrance";
import BestSellingAttractionVue from "../../components/LoadingCarts/BestSellingAttraction.vue";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import Modal from "./ShowModal.vue";
import { useCityStore } from "@/stores/city";

// const seeMore = ref(true);
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);
const entranceStore = useEntranceStore();
const cityStore = useCityStore();
const { cities } = storeToRefs(cityStore);

const router = useRouter();
const data = ref([]);

const goDetialPage = (id) => {
  router.push({
    name: "HomeAttractionDetail",
    params: { id: id },
    query: { language: language.value },
  });
};

const chooseAction = async () => {
  data.value = [];
  const res = await entranceStore.getListAction({
    city_id: chooseCity.value.id,
    category_id: category_id.value,
  });
  data.value = res.data;
  showModal.value = false;
};

const searchTerm = ref("");
// Computed property to filter the city list based on the search term
const filteredCities = computed(() => {
  if (cities?.value != null) {
    return cities.value.data.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  } else {
    return [];
  }
});

const category_id = ref(40);
const chooseCity = ref({
  id: "",
  name: "",
});
const chooseCityAction = (c) => {
  if (c != "") {
    chooseCity.value = {
      id: c.id,
      name: c.name,
    };
  } else {
    chooseCity.value = {
      id: "",
      name: "",
    };
  }
};
const showModal = ref(false);
// const list = ref([]);

watch(category_id, async (newValue) => {
  if (newValue) {
    data.value = [];
    let setdata = {
      category_id: category_id.value,
      limit: 8,
    };
    if (chooseCity.value.id != "") {
      setdata.city_id = chooseCity.value.id;
    }
    const res = await entranceStore.getListAction(setdata);
    data.value = res.data;
  }
});

watch(showModal, async (newValue) => {
  if (newValue == true) {
    if (cities.value == null) {
      await cityStore.getSimpleListAction();
    }
  }
});

onMounted(async () => {
  await settingStore.getLanguage();
  data.value = [];
  const res = await entranceStore.getListAction({ limit: 8 });
  data.value = res.data;
  console.log("====================================");
  console.log(data.value, "this is data");
  console.log("====================================");
});
</script>
