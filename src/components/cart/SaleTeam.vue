<template>
  <div class="h-auto">
    <div class="space-y-10 pt-2">
      <div
        v-for="d in data"
        :key="d"
        @click="open(d)"
        class="gap-2 flex justify-between relative items-center border bg-main/5 border-main rounded-2xl px-4 py-4 shadow-md"
      >
        <div class="relative w-[35%]">
          <img
            :src="d.image"
            :alt="d.name"
            class="h-auto absolute -bottom-[36px] z-10 object-cover rounded-lg"
            :class="{
              'w-[120px]': d.id == 1,
              '-left-1 w-[90px]': d.id == 1,
              'w-[68px]': d.id == 2,
              'w-[80px]': d.id !== 1 && d.id !== 2,
            }"
          />
          <img
            :src="background"
            :class="{
              'left-0': d.id == 1,
              '-left-2': d.id == 7,
              '': d.id !== 1 && d.id !== 7,
            }"
            class="absolute w-[89px] z-0 -bottom-[49px]"
            alt=""
          />
        </div>
        <div class="col-span-2 w-[65%]">
          <p class="text-base line-clamp-1 font-semibold">{{ d.name }}</p>
          <p class="text-xs text-main font-medium line-clamp-1">{{ d.role }}</p>
        </div>
        <InformationCircleIcon class="w-8 h-8 text-main" />
      </div>
    </div>
    <vue-bottom-sheet ref="myBottomSheet" :max-height="1500">
      <div class="font-poppins">
        <div class="h-[80vh]">
          <div class="flex justify-between items-center px-6 pb-4">
            <p class="opacity-0">........</p>
            <p class="text-black text-sm font-medium">
              {{ info ? info.name : "info " }}
            </p>
            <XMarkIcon class="w-5 h-5" @click="close" />
          </div>
          <div
            class="border border-black/10 p-4 ml-4 mr-4 rounded-xl relative h-[90vh] overflow-scroll"
          >
            <!-- <div
              class="bg-gradient-to-tr absolute to-main from-main/20 w-[93%] h-[130px] rounded-2xl"
            ></div> -->
            <div class="grid grid-cols-2 gap-x-4">
              <div
                class="w-[150px] relative h-[150px] overflow-hidden border bg-white border-main rounded-full mx-auto shadow-custom"
              >
                <img
                  :src="info?.image"
                  :alt="info?.name"
                  class="h-auto absolute w-full z-10 object-cover"
                />
                <div
                  class="absolute bottom-0 left-0 w-[150px] h-[150px] bg-gradient-to-tr from-main to-main/80"
                ></div>
                <!-- <img
                  :src="background"
                  class="absolute w-[300px] z-0 -bottom-4"
                  alt=""
                /> -->
              </div>
              <div class="space-y-2 pt-4">
                <div>
                  <p class="text-sm text-main">Name</p>
                  <p class="text-sm">{{ info?.name }}</p>
                </div>
                <div>
                  <p class="text-sm text-main">Position</p>
                  <p class="text-sm">{{ info?.role }}</p>
                </div>
                <div>
                  <p class="text-sm text-main">Experience</p>
                  <p class="text-sm">8 + years</p>
                </div>
              </div>
            </div>
            <div
              class="py-3 bg-main text-white mt-6 rounded-2xl shadow-custom-input text-center"
            >
              Talk to {{ info?.name }}
            </div>
            <div class="grid grid-cols-3 gap-4 py-6">
              <div class="text-center">
                <p class="font-semibold text-3xl text-main">2.2k +</p>
                <p class="text-sm mr-12">Sales</p>
              </div>
              <div class="text-center">
                <p class="font-semibold text-3xl text-main">3.2k +</p>
                <p class="text-sm mr-2">Customers</p>
              </div>
              <div class="text-center">
                <p class="font-semibold text-3xl text-main">85 +</p>
                <p class="text-sm">Products</p>
              </div>
            </div>
            <div class="space-y-4">
              <p>Specialization</p>
              <div class="space-y-2">
                <div class="flex justify-start items-center gap-x-2">
                  <CheckBadgeIcon class="w-4 h-4 text-green" />
                  <p class="text-sm">All-Inclusive Tours</p>
                </div>
                <div class="flex justify-start items-center gap-x-2">
                  <CheckBadgeIcon class="w-4 h-4 text-green" />

                  <p class="text-sm">Company Trips</p>
                </div>
                <div class="flex justify-start items-center gap-x-2">
                  <CheckBadgeIcon class="w-4 h-4 text-green" />

                  <p class="text-sm">50 pax plus trip planning</p>
                </div>
                <div class="flex justify-start items-center gap-x-2">
                  <CheckBadgeIcon class="w-4 h-4 text-green" />

                  <p class="text-sm">all inclusive customer tours</p>
                </div>
              </div>
              <p>Biography</p>
              <p class="text-sm">coming soon ...</p>
            </div>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script setup>
import data from "./db";
import background from "../../assets/s/Background item.png";
import { CheckBadgeIcon, InformationCircleIcon } from "@heroicons/vue/24/solid";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import viberIcon from "../../assets/icons/viber.png";
import whatsappIcon from "../../assets/icons/whatsapp.png";
import callIcon from "../../assets/icons/phone-call.png";
import profileImage from "../../assets/icons/user.png";

const myBottomSheet = ref(null);
const info = ref(null);
const open = (a) => {
  info.value = a;
  myBottomSheet.value.open();
};

const close = () => {
  info.value = null;
  myBottomSheet.value.close();
};
</script>
