<template>
  <div>
    <div class="bg-white rounded-lg shadow-custom">
      <div
        class="flex justify-between items-center border-b border-black/10 px-3 pt-2 rounded-t-xl pb-2"
        :class="data?.status == 'fully_paid' ? 'bg-green/30' : 'bg-main/30'"
      >
        <div class="flex justify-end items-center gap-x-2">
          <p
            class="text-sm font-medium text-green"
            v-if="data?.status == 'fully_paid'"
          >
            Booking Confirm
          </p>
          <p
            class="text-sm font-medium text-main"
            v-if="data?.status != 'fully_paid'"
          >
            Booking Pending
          </p>
        </div>
        <p
          class="font-semibold text-lg"
          :class="data?.status == 'fully_paid' ? 'text-green' : 'text-main'"
        >
          ฿ {{ data?.amount }}
        </p>
      </div>
      <div class="grid grid-cols-3 pt-3 gap-4 text-xs p-3">
        <div class="w-full h-[100px] overflow-hidden rounded-lg">
          <img
            v-if="data?.product?.images?.length > 0 || data?.product?.images"
            :src="
              data?.product?.images[0]?.image
                ? data?.product?.images[0].image
                : 'https://api-blog.thanywhere.com/storage/images/1712124148_51925_1.jpg'
            "
            alt=""
            class="w-full h-full object-cover"
          />
          <img
            v-if="data?.product?.images?.length == 0 || !data?.product?.images"
            src="https://d3lcr32v2pp4l1.cloudfront.net/Pictures/1024x536/4/9/4/74494_thai-airways-747_60990.jpg"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
        <div class="col-span-2 space-y-1">
          <p class="text-main text-sm line-clamp-1 font-semibold">
            {{ data?.product?.name }}
          </p>
          <p v-if="data?.car != null">{{ data?.car?.name }}</p>
          <p v-if="data?.variation != null">{{ data?.variation?.name }}</p>
          <p v-if="data?.room != null">{{ data?.room?.name }}</p>
          <p v-if="data?.ticket != null">{{ data?.ticket?.price }}</p>

          <p
            class="line-clamp-1 bg-black/5 inline-block px-2 py-0.5 rounded-lg"
          >
            {{ data?.service_date }}
          </p>
          <p class="line-clamp-1">quantity : {{ data?.quantity }}</p>
          <!-- <div class="flex justify-start gap-x-2 items-center">
            <p class="font-semibold text-xl">฿ {{ data?.sub_total }}</p>
            <p class="underline">{{ data?.payment_status }}</p>
          </div> -->
          <!-- <div class="flex justify-start items-center pt-2">
            <button
              class="border border-black font-medium cursor-pointer px-2 py-1 rounded-lg"
            >
              Review Order
            </button>
          </div> -->
        </div>
        <div>
          <div class="flex justify-start gap-x-2 items-center">
            <button
              @click="showPdfAction(data?.booking.id)"
              class="border border-black font-medium cursor-pointer px-2 py-1 rounded-lg"
            >
              Reciept
            </button>
            <button
              v-if="data?.product_type != 'App\\Models\\PrivateVanTour'"
              class="border border-black font-medium cursor-pointer px-2 py-1 rounded-lg"
            >
              Comfirmation
            </button>
            <button
              class="border border-black font-medium cursor-pointer px-2 py-1 rounded-lg"
            >
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  data: Object,
});

// const showPdfViewer = ref(false);
const pdfUrl = ref("");

const showPdfAction = (id) => {
  pdfUrl.value = `https://api-blog.thanywhere.com/admin/bookings/${id}/receipt?paid=1`;
  console.log("====================================");
  console.log(pdfUrl.value, "this is url");
  window.open(pdfUrl.value);
  console.log("====================================");
};

console.log("====================================");
console.log(props);
console.log("====================================");
</script>
