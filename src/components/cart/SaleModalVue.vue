<template>
  <div class="h-[400px] overflow-scroll">
    <div class="space-y-10 pt-10">
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
            :class="d.id == 7 || d.id == 4 || d.id == 2 ? 'left-4' : ''"
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

    alert("Message copied to clipboard. Paste it into Viber manually.");

    // const myHeaders = new Headers();
    // myHeaders.append(
    //   "Authorization",
    //   "App 4eef2d3514a785edd29ce2dd2a51fb25-c95144c7-a6f0-48f2-8fb9-edcc676a6e17"
    // );
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Accept", "application/json");

    // const raw = JSON.stringify({
    //   messages: [
    //     {
    //       sender: "DemoCompany",
    //       destinations: [{ to: "66994533971" }], // Phone number of the recipient
    //       content: {
    //         text: "Hello, this is testing order message", // Viber message
    //         type: "TEXT",
    //       },
    //       smsFailover: {
    //         sender: "09664023249", // Sender of the SMS failover
    //         text: "Failover message text", // SMS message content
    //         validityPeriod: {
    //           amount: 2, // Time period for SMS to be valid
    //           timeUnit: "HOURS", // Unit of time for the validity period
    //         },
    //       },
    //     },
    //   ],
    // });

    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch("https://g96z6e.api.infobip.com/viber/2/messages", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));
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
