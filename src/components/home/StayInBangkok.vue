<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-main font-semibold px-6">stays in bangkok</h1>
      <div
        @click="goMore()"
        class="text-[10px] font-semibold text-main cursor-pointer flex justify-end items-center gap-1 mr-6"
      >
        <p>see more</p>
        <ChevronDownIcon class="w-3 h-3" />
      </div>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-6 mt-6">
      <div
        class="bg-white shadow-sm rounded-2xl mb-2 border border-black/10"
        v-for="(i, index) in lists"
        :key="index"
        @click="goDetialPage(i?.id)"
      >
        <div class="w-full h-[140px] p-1.5 overflow-hidden">
          <img
            :src="i.images[0].image"
            class="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </div>
        <div class="px-3 py-0">
          <!-- <StarPartVue :count="5" /> -->
          <p class="text-[10px] text-black font-medium">
            {{ i.rating }}-star rating
          </p>
          <p class="font-semibold text-sm pt-1">{{ i.name }}</p>
          <p class="text-[8px] bg-black/10 rounded-md py-0.5 px-1 inline-block">
            {{ i.place }}
          </p>
          <p
            class="text-[9px] pt-1 max-h-[44px] overflow-hidden"
            v-html="
              language == 'english'
                ? i?.full_description_en
                : i?.full_description
            "
          ></p>
          <div class="">
            <p class="text-xs font-medium mt-2">starting price</p>
            <button
              class="bg-main px-4 mt-2 mb-3 py-0.5 rounded-2xl text-sm text-white"
            >
              {{ i.lowest_room_price }} THB
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { onMounted, ref } from "vue";
// import StarPartVue from "./StarPart.vue";
// import stayinbangkok from "../../assets/db";
import { useRouter } from "vue-router";
import { useHotelStore } from "../../stores/hotel";
import { storeToRefs } from "pinia";
import { useSettingStore } from "../../stores/setting";

// const data = ref(null);
const router = useRouter();
const hotelStore = useHotelStore();
const settingStore = useSettingStore();
const { language } = storeToRefs(settingStore);

const goDetialPage = (id) => {
  router.push({ name: "HomeDetail", params: { id: id } });
};

const lists = ref(null);

const goMore = () => {
  router.push(`/home/hotel-filter/2/Bangkok`);
};

onMounted(async () => {
  // data.value = stayinbangkok;
  const res = await hotelStore.getListAction({ city_id: 2, limit: 8 });
  lists.value = res.data;
  settingStore.getLanguage();
});
</script>
