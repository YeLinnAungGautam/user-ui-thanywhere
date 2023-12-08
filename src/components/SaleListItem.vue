<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useBookingStore } from "../stores/booking";
import { useToastStore } from "../stores/toast";
import { useAuthStore } from "../stores/auth";

const props = defineProps({
  id: Number,
  customer_name: [String],
  crm_id: String,
  past_crm_id: String,
  sub_total: [Number, String],
  booking_date: String,
  payment_status: String,
  reservation_status: String,
  items: Array,
});

const router = useRouter();
const authStore = useAuthStore();
// const hotelStore = useHotelStore();
const toastStore = useToastStore();
const bookingStore = useBookingStore();

const emit = defineEmits();

const goEdit = (id) => {
  router.push({
    name: "sales-edit",
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

const deleteRoom = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2463EB",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then(async (result) => {
    if (result.isConfirmed) {
      // const response = await bookingStore.deleteAction(id);
      toastStore.showToast({
        icon: "success",
        title: "Sucess Deleted",
      });
      emit("change", "Room Deleted");
    }
  });
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
        <div
          class="bg-white p-1 rounded-full text-black border shadow-md border-black/20 animate__animated animate__fadeIn"
          v-if="showEdit && authStore.isSuperAdmin"
          @click="deleteRoom(id)"
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
        <div
          class="bg-white p-1 rounded-full text-black border shadow-md border-black/20 animate__animated animate__fadeIn"
          v-if="showEdit"
          @click="showDropDownHandle"
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      <div class="col-span-1 space-y-2 py-2">
        <p class="font-semibold">
          {{ customer_name }}
        </p>
        <p class="font-semibold text-black/50 text-sm">
          CURRENT : {{ crm_id }}
        </p>
        <p class="font-semibold text-black/50 text-sm">
          PAST : {{ past_crm_id ? past_crm_id : "-" }}
        </p>
      </div>
      <div class="col-span-1 space-y-2 text-end">
        <p class="font-semibold">THB {{ sub_total }}</p>
        <p class="font-semibold text-sm text-black/50">
          {{ booking_date }}
        </p>
        <div class="flex justify-end items-center gap-3">
          <div>
            <p v-if="!payment_status">-</p>
            <p
              v-if="payment_status == 'fully_paid'"
              class="font-semibold text-green bg-green/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
            >
              {{ payment_status }}
            </p>
            <p
              v-if="payment_status == 'not_paid'"
              class="font-semibold text-red text-[12px] py-[2px] inline-block px-2 bg-red/20 text-center rounded-lg"
            >
              {{ payment_status }}
            </p>
            <p
              v-if="payment_status == 'partially_paid'"
              class="font-semibold text-main text-[12px] py-[2px] inline-block px-2 bg-main/20 text-center rounded-lg"
            >
              {{ payment_status }}
            </p>
          </div>
          <div>
            <p v-if="!reservation_status">-</p>
            <p
              v-if="reservation_status == 'confirmed'"
              class="font-semibold text-green bg-green/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
            >
              {{ reservation_status }}
            </p>
            <p
              v-if="reservation_status == 'declined'"
              class="font-semibold text-red bg-red/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
            >
              {{ reservation_status }}
            </p>
            <p
              v-if="reservation_status == 'awaiting'"
              class="font-semibold text-main bg-main/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
            >
              {{ reservation_status }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-span-2 space-y-1 pb-2 animate__animated animate__fadeIn"
      v-if="showDropDown"
    >
      <div
        class="grid grid-cols-2 p-3 rounded bg-black/5 border border-black/10"
        v-for="(i, index) in items"
        :key="index"
      >
        <div class="col-span-1 space-y-2">
          <p class="font-bold text-sm text-main">
            {{ format_type(i.product_type) }}
          </p>
          <p class="font-semibold text-sm text-black">
            {{ i.product?.name }}
          </p>
          <p class="font-semibold text-sm text-main">
            SELLING : {{ i.selling_price }} THB
          </p>
        </div>
        <div class="col-span-1 space-y-2 text-end">
          <p class="font-semibold text-base">
            THB {{ i.booking?.balance_due }}
          </p>
          <p class="font-semibold text-sm text-black/50">
            {{ i.booking?.balance_due_date }}
          </p>
          <div class="flex justify-end items-center gap-3">
            <div>
              <p v-if="!i.booking?.payment_status">-</p>
              <p
                v-if="i.booking?.payment_status == 'fully_paid'"
                class="font-semibold text-green bg-green/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
              >
                {{ i.booking?.payment_status }}
              </p>
              <p
                v-if="i.booking?.payment_status == 'not_paid'"
                class="font-semibold text-red bg-red/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
              >
                {{ i.booking?.payment_status }}
              </p>
              <p
                v-if="i.booking?.payment_status == 'partially_paid'"
                class="font-semibold text-main bg-main/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
              >
                {{ i.booking?.payment_status }}
              </p>
            </div>
            <div>
              <p v-if="!i.booking?.reservation_status">-</p>
              <p
                v-if="i.booking?.reservation_status == 'confirmed'"
                class="font-semibold text-green bg-green/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
              >
                {{ i.booking?.reservation_status }}
              </p>
              <p
                v-if="i.booking?.reservation_status == 'declined'"
                class="font-semibold text-red bg-red/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
              >
                {{ i.booking?.reservation_status }}
              </p>
              <p
                v-if="i.booking?.reservation_status == 'awaiting'"
                class="font-semibold text-main bg-main/20 text-center rounded-lg text-[12px] py-[2px] inline-block px-2"
              >
                {{ i.booking?.reservation_status }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
