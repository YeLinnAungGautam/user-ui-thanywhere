<template>
  <div>
    <div class="flex justify-between items-center relative">
      <h1 class="text-main font-semibold px-6">
        top things to do in {{ chooseCity.name }}
      </h1>
      <div
        @click="showModal = !showModal"
        class="text-[10px] font-semibold text-main flex justify-end items-center gap-1 mr-6"
      >
        <p class="whitespace-nowrap">filter city</p>
        <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div
      class="flex justify-start items-center overflow-x-scroll space-x-1.5 pt-3 px-6 scroll-container"
    >
      <p
        @click="category_id = ''"
        :class="category_id == '' ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        all
      </p>
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
      <!-- <p
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
      </p> -->
      <p
        @click="category_id = 22"
        :class="category_id == 22 ? 'border-main text-main' : 'border-black/10'"
        class="whitespace-nowrap px-3 py-1.5 text-[10px] border border-black/10 rounded-full"
      >
        skywalks
      </p>
    </div>
    <div
      v-if="loading"
      class="flex flex-1 justify-start space-x-3 items-center overflow-x-scroll scroll-container"
    >
      <!-- <ThingToDoLoadingCartVue /> -->
      <div
        class="bg-white shadow rounded-3xl mt-3 mb-3 px-2 pt-2"
        :class="index == 0 ? 'ml-6' : 'ml-0'"
        v-for="(i, index) in 8"
        :key="i"
      >
        <div>
          <div class="w-[200px] h-[100px] overflow-hidden animate-pulse">
            <img
              :src="LoadingImageCover"
              class="w-full h-full object-cover opacity-30 rounded-2xl"
              alt=""
            />
          </div>
          <div class="px-3 py-2">
            <p
              class="text-main text-[10px] bg-black/20 w-10 h-2 animate-pulse"
            ></p>
            <p
              class="font-semibold text-sm bg-black/20 w-20 h-4 animate-pulse mt-2"
            ></p>
            <button
              class="bg-main animate-pulse px-3 mt-2 mb-2 py-1 rounded-lg text-xs font-semibold text-white"
            >
              loading
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="list.length == 0 && !loading"
      class="flex flex-1 justify-center space-x-3 mt-3 py-20 items-center overflow-x-scroll scroll-container"
    >
      <img :src="issue" class="w-10 h-10" alt="" />
    </div>
    <div
      v-if="list.length > 0 && !loading"
      class="flex flex-1 justify-start space-x-3 mt-3 items-center overflow-x-scroll scroll-container"
    >
      <!-- <ThingToDoLoadingCartVue /> -->
      <div
        class="bg-white shadow rounded-3xl mb-3 px-2 pt-2"
        :class="index == 0 ? 'ml-6' : 'ml-0'"
        v-for="(i, index) in list"
        @click="
          router.push(
            '/home/attraction-detail/' + i.id + `?language=${language}`
          )
        "
        :key="i"
      >
        <ThingToDoLoadingCartVue :i="i" />
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
          v-for="c in cities?.data ?? []"
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
import { onMounted, ref, watch } from "vue";
import { useEntranceStore } from "../../stores/entrance";
import { storeToRefs } from "pinia";
import ThingToDoLoadingCartVue from "../LoadingCarts/ThingToDoLoadingCart.vue";
import { useRouter } from "vue-router";
import { useSettingStore } from "../../stores/setting";
import LoadingImageCover from "../../assets/web/loadingImageCover.jpg";
import Modal from "./ShowModal.vue";
import issue from "@/assets/no-connection.png";
import { useCityStore } from "@/stores/city";
// import { ref } from "@vue/reactivity";

const entranceStore = useEntranceStore();
const router = useRouter();
const settingStore = useSettingStore();
const cityStore = useCityStore();
const { cities } = storeToRefs(cityStore);
const { language } = storeToRefs(settingStore);
const loading = ref(false);

const category_id = ref("");
const list = ref([]);
const showModal = ref(false);

const chooseCity = ref({
  id: "2",
  name: "bangkok",
});
const chooseCityAction = (c) => {
  chooseCity.value = {
    id: c.id,
    name: c.name,
  };
};

const chooseAction = async () => {
  list.value = [];
  loading.value = true;
  category_id.value = "";
  const res = await entranceStore.getListAction({
    city_id: chooseCity.value.id,
    category_id: "",
  });
  list.value = res.data;
  loading.value = false;
  showModal.value = false;
};

// Computed property to filter the city list based on the search term

watch(category_id, async (newValue) => {
  if (newValue) {
    list.value = [];
    loading.value = true;
    const res = await entranceStore.getListAction({
      city_id: chooseCity.value.id,
      category_id: category_id.value,
    });
    list.value = res.data;
    loading.value = false;
  }
  if (newValue == "") {
    list.value = [];
    loading.value = true;
    const res = await entranceStore.getListAction({
      city_id: chooseCity.value.id,
      category_id: category_id.value,
    });
    list.value = res.data;
    loading.value = false;
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
  loading.value = true;
  const res = await entranceStore.getListAction({
    city_id: chooseCity.value.id,
    category_id: category_id.value,
  });
  await settingStore.getLanguage();
  console.log("====================================");
  // console.log(entrances.value);
  list.value = res.data;
  loading.value = false;
  console.log("====================================");
});
</script>
