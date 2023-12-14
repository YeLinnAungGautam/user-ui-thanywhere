<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { useHotelStore } from "../stores/hotel";
import { useToastStore } from "../stores/toast";
import { useRoomStore } from "../stores/room";
import { Switch } from "@headlessui/vue";
import { XCircleIcon } from "@heroicons/vue/24/outline";
import RoomPeriodItemVue from "../components/RoomPeriodItem.vue";
import RoomPeriodItemCreate from "../components/RoomPeriodItemCreate.vue";

const router = useRouter();
const hotelStore = useHotelStore();
const { hotel } = storeToRefs(hotelStore);
const toastStore = useToastStore();
const roomStore = useRoomStore();

const formData = ref({
  id: "",
  name: "",
  hotel_id: null,
  max_person: "",
  is_extra: 0,
  description: "",
  period: [],
  images: [],
  room_price: "",
  cost: "",
});

const enabled = ref(false);
const showPeriodCreate = ref(false);

const goBack = () => {
  router.go(-1);
};

const imagesInput = ref(null);
const imagesPreview = ref([]);

const openFileImagePicker = () => {
  imagesInput.value.click();
};

const handlerImagesFileChange = (e) => {
  console.log(e.target.files);
  let selectedFile = e.target.files;
  if (selectedFile) {
    for (let index = 0; index < selectedFile.length; index++) {
      formData.value.images.push(selectedFile[index]);
      imagesPreview.value.push(URL.createObjectURL(selectedFile[index]));
    }
  }
};

const removeImageSelectImage = (index) => {
  formData.value.images.splice(index, 1);
  imagesPreview.value.splice(index, 1);
};

const errors = ref(null);
const addNewHandler = async () => {
  const frmData = new FormData();
  frmData.append("name", formData.value.name);
  frmData.append("hotel_id", formData.value.hotel_id);
  frmData.append("description", formData.value.description);
  frmData.append("is_extra", enabled.value ? 1 : 0);
  frmData.append("room_price", formData.value.room_price);
  frmData.append("max_person", formData.value.max_person);
  frmData.append("cost", formData.value.cost);
  if (formData.value.images.length > 0) {
    for (let i = 0; i < formData.value.images.length; i++) {
      let file = formData.value.images[i];
      frmData.append("images[" + i + "]", file);
    }
  }
  if (formData.value.period.length > 0) {
    for (let x = 0; x < formData.value.period.length; x++) {
      frmData.append(
        "periods[" + x + "][period_name]",
        formData.value.period[x].period_name
      );
      frmData.append(
        "periods[" + x + "][start_date]",
        formData.value.period[x].start_date
      );
      frmData.append(
        "periods[" + x + "][end_date]",
        formData.value.period[x].end_date
      );
      frmData.append(
        "periods[" + x + "][sale_price]",
        formData.value.period[x].sale_price
      );
      frmData.append(
        "periods[" + x + "][cost_price]",
        formData.value.period[x].cost_price
      );
    }
  }

  try {
    const response = await roomStore.addNewAction(frmData);
    formData.value = {
      id: "",
      name: "",
      hotel_id: null,
      max_person: "",
      description: "",
      period: [],
      is_extra: 0,
      room_price: "",
      cost: "",
    };
    errors.value = null;
    enabled.value = false;
    toastStore.showToast({
      icon: "success",
      title: response.message,
    });
    goBack();
  } catch (error) {
    if (error.response) {
      toastStore.showToast({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }
};

const addNewPrice = (data) => {
  formData.value.period.push(data);
  console.log(formData.value.period, "this is push");
};

const removeChange = (data) => {
  removeFromPrice(data);
};

const removeFromPrice = (index) => {
  formData.value.period.splice(index, 1);
};

const createCarPrice = (data) => {
  addNewPrice(data);
  showPeriodCreate.value = false;
};

onMounted(async () => {
  await hotelStore.getSimpleListAction();
});
</script>

<template>
  <div class="bg-white">
    <NavbarVue />
    <div class="py-5 px-4 space-y-4">
      <div class="relative">
        <div
          class="flex justify-start items-center gap-2 text-main absolute top-1"
          @click="goBack"
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </div>

        <p class="text-main text-2xl font-semibold w-full text-center">
          Room Create
        </p>
      </div>
      <div>
        <form
          @submit.prevent="addNewHandler"
          class="mt-4 px-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2"
        >
          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800">Name</label>
            <input
              type="text"
              v-model="formData.name"
              id="name"
              class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="space-y-2 mt-0 sm:mt-1">
            <p class="text-sm text-gray-800">Hotel</p>
            <v-select
              v-model="formData.hotel_id"
              class="w-full h-10 text-sm border-main border rounded bg-white focus:outline-none focus:border-none"
              :options="hotel?.data"
              label="name"
              :clearable="false"
              :reduce="(hotel) => hotel.id"
              placeholder="Choose Hotel"
            ></v-select>
          </div>

          <div class="space-y-2">
            <label for="room_price" class="text-sm text-gray-800"
              >Room Price</label
            >
            <input
              type="text"
              v-model="formData.room_price"
              id="room_price"
              class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="space-y-2 flex justify-start items-center gap-4">
            <label for="room_price" class="text-sm text-gray-800"
              >Is extra bed ?</label
            >
            <Switch
              v-model="enabled"
              :class="enabled ? ' bg-main' : 'bg-black'"
              class="relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <span class="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                :class="enabled ? 'translate-x-9' : 'translate-x-0'"
                class="pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
              />
            </Switch>
          </div>
          <div class="space-y-2">
            <label for="room_price" class="text-sm text-gray-800">Cost</label>
            <input
              type="number"
              v-model="formData.cost"
              id="cost"
              class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="space-y-2">
            <label for="room_price" class="text-sm text-gray-800"
              >Max Person</label
            >
            <input
              type="text"
              v-model="formData.max_person"
              id="cost"
              class="w-full h-10 px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="space-y-2">
            <label
              @click="showPeriodCreate = true"
              for="room_price"
              class="text-sm text-gray-800 flex justify-start gap-3 items-center font-semibold"
              >Room Periods
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-main mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </label>
            <div v-for="(i, index) in formData.period" :key="index">
              <RoomPeriodItemVue
                :items="i"
                :id="index"
                @remove="removeChange"
              />
            </div>
          </div>
          <div class="space-y-2">
            <label for="description" class="text-sm text-gray-800"
              >Description</label
            >
            <textarea
              v-model="formData.description"
              rows="3"
              id="description"
              class="w-full h-[150px] px-4 text-sm py-2 text-gray-900 border border-main rounded-md bg-white focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="bg-white/60 text-sm rounded-lg shadow-sm mb-5">
            <div class="flex items-center justify-start gap-3 mb-3">
              <p>Images</p>

              <input
                multiple
                type="file"
                ref="imagesInput"
                class="hidden"
                @change="handlerImagesFileChange"
                accept="image/*"
              />
            </div>
            <div
              class="grid grid-cols-3 gap-2"
              v-if="imagesPreview.length == 0"
              @click.prevent="openFileImagePicker"
            >
              <div
                class="cursor-pointer w-full h-[130px] border-2 border-dashed border-main rounded flex justify-center items-center"
              >
                <span class="text-xs">Drops</span>
              </div>
              <div
                class="cursor-pointer w-full h-[130px] border-2 border-dashed border-main rounded flex justify-center items-center"
              >
                <span class="text-xs">Drops</span>
              </div>
              <div
                class="cursor-pointer w-full h-[130px] border-2 border-dashed border-main rounded flex justify-center items-center"
              >
                <span class="text-xs">Drops</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <div
                class="relative"
                v-for="(image, index) in imagesPreview"
                :key="index"
              >
                <button
                  @click.prevent="removeImageSelectImage(index)"
                  class="rounded-full text-sm text-red-600 items-center justify-center flex absolute top-[-0.9rem] right-[-0.7rem]"
                >
                  <XCircleIcon class="w-8 h-8 font-semibold text-red" />
                </button>
                <img class="h-auto w-full rounded" :src="image" alt="" />
              </div>
              <div
                v-if="imagesPreview.length != 0"
                @click.prevent="openFileImagePicker"
                class="cursor-pointer w-full h-[130px] border-2 border-dashed border-main rounded flex justify-center items-center mt-2"
              >
                <span class="text-xs">Drops</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="text-end flex justify-end items-center col-span-1 sm:col-span-2 mt-3"
          >
            <div
              class="flex justify-end items-center space-x-4 px-4 py-2 rounded border-main bg-main text-white border"
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="">Create</p>
            </div>
          </button>
        </form>
      </div>
    </div>
    <div
      class="absolute top-0 w-screen h-full bg-gray z-20 animate__animated animate__fadeIn"
      v-if="showPeriodCreate"
    >
      <div class="relative h-full">
        <NavbarVue />
        <div
          class="flex justify-start items-center gap-2 py-4 px-4 text-main"
          @click="showPeriodCreate = false"
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </div>
        <RoomPeriodItemCreate @create="createCarPrice" />
      </div>
    </div>
  </div>
</template>
