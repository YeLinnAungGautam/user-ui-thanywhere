<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useReservationStore } from "../../stores/reservation";
import { useToastStore } from "../../stores/toast";
import { useAuthStore } from "../../stores/auth";

const props = defineProps({
  id: Number,
  reservation: Object,
});

const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();
const reservationStore = useReservationStore();

const emit = defineEmits();

const productType = (text) => {
  let parts = text.split("\\");

  // Get the last part of the array
  let className = parts[parts.length - 1];

  return className;
};

const goEdit = (id) => {
  router.push({
    name: "reservation-update",
    params: {
      id: id,
    },
  });
};

const showEdit = ref(false);
const showSetting = () => {
  showEdit.value = !showEdit.value;
  showDropDown.value = false;
};

const showDropDown = ref(false);
const showDropDownHandle = () => {
  showDropDown.value = !showDropDown.value;
};

const format_type = (type) => {
  let data = "";
  data = type.split("\\").pop();
  return data;
};
</script>

<template>
  <div class="bg-white border-b">
    <div
      class="py-4 px-4 grid grid-cols-2 gap-3 relative"
      @click="showEdit = !showEdit"
    >
      <div
        class="flex justify-center gap-2 absolute top-0 w-full h-full col-span-2 items-center"
        :class="showEdit ? 'bg-black/20' : ''"
      >
        <div
          class="bg-white p-1 rounded-full text-black border shadow-md border-black/20 animate__animated animate__fadeIn"
          v-if="showEdit"
          @click="goEdit(id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
        </div>
      </div>
      <div class="col-span-1 space-y-2 py-2">
        <p class="font-semibold text-xs text-main">
          {{ productType(reservation.product_type) }}
        </p>
        <p class="font-semibold text-sm">
          {{ reservation.product?.name }}
        </p>
        <p class="font-semibold text-black text-xs">
          CURRENT - {{ reservation.booking?.crm_id }}
        </p>
        <p
          class="font-semibold text-black/80 text-xs"
          v-if="reservation.booking?.past_crm_id != null"
        >
          PAST - {{ reservation.booking?.past_crm_id }}
        </p>
      </div>
      <div class="col-span-1 space-y-2 text-end">
        <p class="font-semibold">THB {{ reservation.booking?.balance_due }}</p>
        <p
          class="font-semibold flex justify-end items-center text-main text-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ reservation.booking?.grand_total }} THB
        </p>
        <p
          class="font-semibold text-black text-xs flex justify-end items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          {{ reservation.service_date }}
        </p>
        <p class="font-semibold text-sm text-black/50"></p>
        <div class="flex justify-end items-center gap-3">
          <div>
            <p v-if="!reservation.booking?.payment_status">-</p>
            <p
              v-if="reservation.booking?.payment_status == 'fully_paid'"
              class="font-semibold text-green bg-green/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
            >
              {{ reservation.booking?.payment_status }}
            </p>
            <p
              v-if="reservation.booking?.payment_status == 'not_paid'"
              class="font-semibold text-red text-[12px] py-[2px] inline-block px-2 bg-red/20 text-center rounded-lg"
            >
              {{ reservation.booking?.payment_status }}
            </p>
            <p
              v-if="reservation.booking?.payment_status == 'partially_paid'"
              class="font-semibold text-main text-[12px] py-[2px] inline-block px-2 bg-main/20 text-center rounded-lg"
            >
              {{ reservation.booking?.payment_status }}
            </p>
          </div>
          <div>
            <p v-if="!reservation.reservation_status">-</p>
            <p
              v-if="reservation.reservation_status == 'confirmed'"
              class="font-semibold text-green bg-green/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
            >
              {{ reservation.reservation_status }}
            </p>
            <p
              v-if="reservation.reservation_status == 'declined'"
              class="font-semibold text-red bg-red/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
            >
              {{ reservation.reservation_status }}
            </p>
            <p
              v-if="reservation.reservation_status == 'awaiting'"
              class="font-semibold text-main bg-main/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
            >
              {{ reservation.reservation_status }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
