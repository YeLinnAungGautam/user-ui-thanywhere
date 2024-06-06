<script setup>
import HeaderHomeVue from "../components/layout/HeaderHome.vue";
import Layout from "../components/layout/LayoutHome.vue";
import searchIcon from "../assets/icons/Search Bar Icons & Headline icons/search bar search icon.svg";
import HotelsGradesVue from "../components/hotelbookings/HotelsGrades.vue";
import stayinbangkok from "../assets/db";
import {
  ChevronDownIcon,
  HeartIcon,
  ChevronUpIcon,
} from "@heroicons/vue/24/outline";
import {
  MapPinIcon,
  BuildingOffice2Icon,
  StarIcon,
} from "@heroicons/vue/24/solid";
import StarPartVue from "../components/home/StarPart.vue";
import Modal from "../components/layout/Modal.vue";
import { DialogPanel, DialogTitle } from "@headlessui/vue";
import { ref } from "vue";

const filterModal = ref(false);

const data = stayinbangkok;
</script>

<template>
  <Layout>
    <HeaderHomeVue>
      <div class="px-6 space-y-6">
        <div class="text-white">
          <p class="text-base font-semibold tracking-wider">hotel bookings</p>
          <p class="text-xs">bangkok, pattaya, phuket, etc...</p>
        </div>
        <div class="relative">
          <input
            type="search"
            name=""
            placeholder=" search"
            class="w-full rounded-full px-6 py-4 text-xs text-main focus:outline-none"
            id=""
          />

          <img
            :src="searchIcon"
            class="w-5 h-5 absolute top-3.5 right-5 text-main"
            alt=""
          />
        </div>
      </div>
    </HeaderHomeVue>
    <div class="h-auto pb-20 pt-8 space-y-10">
      <HotelsGradesVue />
      <div class="space-y-4 px-6">
        <div class="flex justify-between items-center mb-2">
          <h1 class="text-main font-semibold">recommanded hotels</h1>
          <div
            @click="filterModal = true"
            class="text-[10px] font-semibold text-main flex justify-end items-center gap-1"
          >
            filter <ChevronDownIcon class="w-3 h-3" />
          </div>
        </div>
        <div
          class="border border-black/10 rounded-2xl shadow-sm bg-white grid grid-cols-11 gap-3 p-2.5"
          v-for="i in data"
          :key="i"
        >
          <div class="w-full col-span-5 h-[180px] overflow-hidden rounded-2xl">
            <img
              :src="i?.images[0].image"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div class="col-span-6 relative">
            <HeartIcon class="w-4 h-4 absolute top-0 right-0 text-main" />
            <div class="mr-6 overflow-hidden">
              <p class="text-sm font-semibold text-main">{{ i.name }}</p>
              <div class="flex justify-between items-center">
                <StarPartVue :count="3" />
                <div
                  class="text-[10px] flex justify-end items-center gap-0.5 py-1"
                >
                  <MapPinIcon class="w-3 h-3 text-black/50" />
                  <p>{{ i?.city.name }}</p>
                </div>
              </div>
              <p class="text-[8px] h-[36px] overflow-hidden">
                {{ i.description }}
              </p>
              <div class="absolute bottom-0 space-y-0.5">
                <p class="text-[10px]">nearby places</p>
                <div class="flex justify-start gap-2 items-center">
                  <div
                    class="text-[8px] flex justify-end text-main items-center gap-0.5 py-1"
                  >
                    <BuildingOffice2Icon class="w-2.5 h-2.5 text-main" />
                    <p>{{ i.place }}</p>
                  </div>
                </div>
                <p class="text-[10px] pb-1">start price</p>
                <p
                  class="bg-main text-white text-sm font-semibold px-3 inline-block py-0.5 rounded-full"
                >
                  {{ i.lowest_room_price }} THB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal :isOpen="filterModal" @closeModal="filterModal = false">
        <DialogPanel
          class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all"
        >
          <DialogTitle
            as="div"
            class="text-lg flex justify-between items-center font-medium text-main leading-6 text-gray-900 font-poppins mb-5"
          >
            <p class="opacity-0">--</p>
            <p>filter</p>
            <p
              class="text-black text-xl font-bold"
              @click="filterModal = false"
            >
              X
            </p>
          </DialogTitle>
          <div class="font-poppins border border-black/10 p-4 rounded-xl">
            <div class="space-y-3 border-b border-black/10 pb-4">
              <div class="flex justify-between items-center">
                <p class="text-sm font-semibold">start rating</p>
                <ChevronUpIcon class="w-4 h-4" />
              </div>
              <div class="flex flex-wrap justify-start items-center gap-2 mr-5">
                <div
                  class="border border-black/60 rounded-lg px-2 py-2"
                  v-for="(i, index) in 4"
                  :key="index"
                >
                  <div class="flex justify-center items-center gap-1">
                    <p class="text-sm">{{ index + 2 }}</p>
                    <StarIcon class="w-5 h-5 text-main" />
                  </div>
                  <p class="text-[8px] text-black/70">6+hotels</p>
                </div>
              </div>
            </div>
            <div class="space-y-3 border-b border-black/10 pb-2 pt-4">
              <div class="flex justify-between items-center">
                <p class="text-sm font-semibold">price</p>
                <ChevronUpIcon class="w-4 h-4" />
              </div>
              <div class="space-y-2">
                <p class="text-xs font-medium">0 THB - 100000 THB</p>
                <div class="relative">
                  <div
                    class="bg-white w-6 h-6 absolute bottom-3.5 rounded-full border border-main"
                  ></div>
                  <input
                    id="small-range"
                    type="range"
                    min="0"
                    max="100000"
                    value="100000"
                    class="w-full h-0.5 mb-6 focus:outline-none bg-main rounded-lg appearance-none cursor-pointer range-sm"
                  />
                </div>
              </div>
            </div>
            <div class="space-y-3 pb-2 pt-4">
              <div class="flex justify-between items-center">
                <p class="text-sm font-semibold">nearby places</p>
                <ChevronUpIcon class="w-4 h-4" />
              </div>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <p class="text-xs font-medium">sukhumvit BTS</p>
                  <input type="radio" value="radio" name="default-radio" />
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-xs font-medium">ratchada</p>
                  <input
                    type="radio"
                    value="radio"
                    name="default-radio"
                    id=""
                  />
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-xs font-medium">
                    don mueng internaional airport
                  </p>
                  <input
                    type="radio"
                    value="radio"
                    name="default-radio"
                    id=""
                  />
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-xs font-medium">
                    suvarnabhumi international airport
                  </p>
                  <input
                    type="radio"
                    value="radio"
                    name="default-radio"
                    id=""
                  />
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-xs font-medium">night bazaar</p>
                  <input
                    type="radio"
                    value="radio"
                    name="default-radio"
                    id=""
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-between gap-4 items-center pt-4">
              <button
                class="text-center border border-black/10 rounded-full py-2 w-[40%] text-sm text-main font-semibold"
              >
                clear
              </button>
              <button
                class="text-center border bg-main border-black/10 rounded-full py-2 w-[60%] text-sm text-white font-semibold"
              >
                see 50 hotels
              </button>
            </div>
          </div>
        </DialogPanel>
      </Modal>
    </div>
  </Layout>
</template>
<style>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid rgb(255, 40, 2);
  background: #fff;
  cursor: pointer;
  margin-top: -1px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
}
input[type="radio"] {
  display: grid;
  place-content: center;
  appearance: none;
  margin: 0 0 0;
  width: 1.2rem;
  border-radius: 5px;
  height: 1.2rem;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ff6b00;
}

input[type="radio"]:checked {
  background-color: #ff6b00;
}

.radio {
  grid-template-columns: 1rem auto;
  gap: 0.5rem;
  background-color: hsl(183, 100%, 15%);
}
</style>
