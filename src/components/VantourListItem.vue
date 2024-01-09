<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useVantourStore } from "../stores/vantour";
import { useToastStore } from "../stores/toast";
import { useAuthStore } from "../stores/auth";

const props = defineProps({
  id: Number,
  vantours: Object,
});

const router = useRouter();
const vantourStore = useVantourStore();
const toastStore = useToastStore();
const authStore = useAuthStore();

const emit = defineEmits();

const goRoom = (id, name) => {
  router.push({
    name: "room",
    params: {
      id: id,
      name: name,
    },
  });
};
const goList = (id) => {
  router.push({
    name: "vantours-carlist",
    params: {
      id: id,
    },
  });
};
const goEdit = (id) => {
  router.push({
    name: "vantours-edit",
    params: {
      id: id,
    },
  });
};
const goView = (id) => {
  router.push({
    name: "vantours-view",
    params: {
      id: id,
    },
  });
};

// const showPricePage = ref(false);

const showEdit = ref(false);
const showSetting = () => {
  showEdit.value = !showEdit.value;
};

const deleteHotel = async (id) => {
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
      const response = await vantourStore.deleteAction(id);
      toastStore.showToast({
        icon: "success",
        title: "Sucess Deleted",
      });
      await vantourStore.getListAction();

      emit("change", " Deleted");
    }
  });
};
</script>

<template>
  <div class="space-y-2 relative overflow-hidden rounded-lg">
    <div
      class="h-[200px] sm:h-[250px] md:h-[220px] lg:h-[300px] w-full overflow-hidden rounded-lg"
    >
      <img
        :src="vantours.cover_image"
        alt=""
        class="object-cover"
        v-if="vantours.cover_image != null"
      />
      <img
        src="../../public/default-image.jpg"
        alt=""
        class="object-cover"
        v-if="vantours.cover_image == null"
      />
    </div>
    <div
      class="absolute top-[-7px] right-0 z-50 bg-main/80 text-white rounded-es-3xl p-2"
      @click="showSetting"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
    </div>
    <div
      class="absolute right-0 z-50 bg-main/80 text-white rounded-full p-2"
      :class="
        showEdit
          ? ' translation duration-150 top-[50px]'
          : 'top-[-100px] translation duration-150'
      "
      @click="goEdit(id)"
      v-if="!authStore.isAgent"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </div>
    <div
      class="absolute right-0 z-50 bg-main/80 text-white rounded-full p-2"
      :class="
        showEdit
          ? ' translation duration-150 top-[50px]'
          : 'top-[-100px] translation duration-150'
      "
      @click="goView(id)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </div>
    <div
      class="absolute right-0 z-50 bg-main/80 text-white rounded-full p-2"
      :class="
        showEdit
          ? ' translation duration-150 top-[100px]'
          : ' top-[-100px] translation duration-150'
      "
      v-if="authStore.isSuperAdmin"
      @click="deleteHotel(id)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </div>

    <div class="pt-2">
      <div class="space-y-1 mt-1">
        <div class="flex justify-between items-center">
          <p class="text-lg pl-2 font-semibold text-main">
            {{ vantours.name }}
          </p>
          <svg
            v-if="!authStore.isAgent"
            @click="goList(id)"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-main"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
            />
          </svg>
        </div>

        <div
          class="text-base pl-2 font-semibold flex justify-start items-center gap-2 flex-wrap"
        >
          <p
            v-for="(city, index) in vantours?.cities"
            :key="index"
            class="inline-block bg-main text-white text-xs p-1 rounded"
          >
            {{ city.name }}
          </p>
          <!-- <p>{{ vantours?.cars.length }}</p> -->
        </div>
        <div
          class="text-base flex justify-between items-center pl-2 font-semibold pr-3 text-main gap-2 flex-wrap"
        >
          <p class="text-sm">Cars price</p>
          <p class="text-3xl">{{ vantours.lowest_car_price }} THB</p>
        </div>
        <div
          class="text-base flex justify-between items-center pl-2 font-semibold pr-3 text-main gap-2 flex-wrap"
        >
          <p class="text-sm">cars of type</p>
          <p class="text-base">{{ vantours?.cars.length }} types</p>
        </div>
      </div>
    </div>
  </div>
</template>
