<template>
  <div class="space-y-10 pt-3">
    <div
      v-for="d in data"
      :key="d"
      @click="clickFunction(d)"
      class="gap-2 flex justify-between items-center border bg-main/5 border-main rounded-2xl px-4 py-4 shadow-md"
      :class="{
        'flex-row-reverse': d.id % 2 === 0,
        'flex-row': d.id % 2 !== 0,
      }"
    >
      <div class="relative w-[35%]">
        <img
          :src="d.image"
          :alt="d.name"
          class="h-auto absolute -bottom-[36px] z-10 object-cover rounded-lg"
          :class="d.id == 1 ? 'w-full' : 'w-[80px] left-4'"
        />
        <img
          :src="background"
          class="absolute w-[89px] z-0 -bottom-[49px]"
          alt=""
        />
      </div>
      <div class="col-span-2 w-[65%]">
        <p class="text-base line-clamp-1 font-semibold">{{ d.name }}</p>
        <p class="text-xs text-main font-medium line-clamp-1">{{ d.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from "./db";
import background from "../../assets/s/Background item.png";
import { defineProps, onMounted } from "vue";

const props = defineProps({
  type: String,
});

const clickFunction = (item) => {
  console.log("====================================");
  console.log(item);
  console.log("====================================");
  if (props.type === "viber" && item.viber) {
    // Encode the phone number to ensure it's URL-safe
    const phoneNumber = encodeURIComponent(item.viber);
    const viberUrl = `viber://chat?number=${phoneNumber}`;

    // Try opening the Viber chat
    const newWindow = window.open(viberUrl, "_blank");

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed == "undefined"
    ) {
      alert(
        "Unable to open Viber. Please ensure the Viber app is installed and try again."
      );
    }
  } else if (props.type === "whatsapp" && item.whatsApp) {
    // Encode the phone number to ensure it's URL-safe
    const phoneNumber = encodeURIComponent(item.whatsApp);
    const viberUrl = `https://wa.me/${phoneNumber}`;

    // Try opening the Viber chat
    const newWindow = window.open(viberUrl, "_blank");

    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed == "undefined"
    ) {
      alert(
        "Unable to open Viber. Please ensure the Viber app is installed and try again."
      );
    }
  } else if (props.type === "phone" && item.phone) {
    // Encode the phone number to ensure it's URL-safe
    window.open(`tel:${item.phone}`, "_self");
  }
};

onMounted(() => {
  console.log("====================================");
  console.log(props.type, "this is type");
  console.log("====================================");
});
</script>
