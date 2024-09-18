<template>
  <div class="h-[600px] overflow-scroll">
    <div class="space-y-10 pt-10">
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
              'w-[100px]': d.id == 1,
              '-left-1 w-[80px]': d.id == 1,
              'w-[68px]': d.id == 2,
              'w-[80px]': d.id !== 1 && d.id !== 2,
            }"
          />
          <img
            :src="background"
            :class="{
              'left-2': d.id == 1,
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
            <div
              class="bg-gradient-to-tr absolute to-main from-main/20 w-[93%] h-[130px] rounded-2xl"
            ></div>
            <div
              class="relative w-[150px] h-[150px] mt-8 overflow-hidden border bg-white border-main rounded-full mx-auto shadow-custom"
            >
              <img
                :src="info?.image"
                :alt="info?.name"
                class="h-auto absolute w-full z-10 object-cover"
              />
              <img
                :src="background"
                class="absolute w-[300px] z-0 -bottom-4"
                alt=""
              />
            </div>
            <div class="mt-4 px-4 divide-y divide-black/10">
              <div class="flex justify-between items-center py-2">
                <div class="flex justify-start items-center gap-x-2">
                  <img :src="profileImage" class="w-8 h-8" alt="" />
                  <p class="text-sm">role</p>
                </div>
                <p class="text-sm">{{ info?.role }}</p>
              </div>
              <div class="flex justify-between items-center py-2">
                <div class="flex justify-start items-center gap-x-2">
                  <img :src="callIcon" class="w-8 h-8" alt="" />
                  <p class="text-sm">phone</p>
                </div>
                <p class="text-sm">{{ info?.phone }}</p>
              </div>
              <div class="flex justify-between items-center py-2">
                <div class="flex justify-start items-center gap-x-2">
                  <img :src="viberIcon" class="w-8 h-8" alt="" />
                  <p class="text-sm">viber</p>
                </div>
                <p class="text-sm">{{ info?.viber }}</p>
              </div>
              <div class="flex justify-between items-center py-2">
                <div class="flex justify-start items-center gap-x-2">
                  <img :src="whatsappIcon" class="w-8 h-8" alt="" />
                  <p class="text-sm">whatsapp</p>
                </div>
                <p class="text-sm">{{ info?.whatsApp }}</p>
              </div>
              <div class="pt-4 text-sm">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tenetur animi, illo dicta reprehenderit, culpa excepturi veniam
                in maiores reiciendis laborum omnis, necessitatibus quis sit
                quas consectetur. Quos accusamus excepturi tempore!
              </div>
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
import { InformationCircleIcon } from "@heroicons/vue/24/solid";
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
