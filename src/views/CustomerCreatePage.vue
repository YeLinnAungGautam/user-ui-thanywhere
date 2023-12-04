<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { storeToRefs } from "pinia";
import { useToastStore } from "../stores/toast";
import { useCustomerStore } from "../stores/customer";
import { XCircleIcon } from "@heroicons/vue/24/outline";
import { Switch } from "@headlessui/vue";

const router = useRouter();
const customerStore = useCustomerStore();
const toastStore = useToastStore();

const errors = ref(null);

const formData = ref({
  name: "",
  photo: "",
  email: "",
  phone_number: "",
  dob: "",
  line_id: "",
  nrc_number: "",
  company_name: "",
  is_corporate_customer: "",
});

const goBack = () => {
  router.go(-1);
};

const enabled = ref(false);

const featureImageInput = ref(null);
const featureImagePreview = ref(null);

const openFileFeaturePicker = () => {
  featureImageInput.value.click();
};

const handlerFeatureFileChange = (e) => {
  let selectedFile = e.target.files[0];
  if (selectedFile) {
    formData.value.cover_image = e.target.files[0];
    featureImagePreview.value = URL.createObjectURL(selectedFile);
  }
};

const removeFeatureSelectImage = () => {
  formData.value.feature_image = null;
  featureImagePreview.value = null;
};

const onSubmitHandler = async () => {
  console.log(enabled.value);
  const frmData = new FormData();
  frmData.append("name", formData.value.name);
  frmData.append("photo", formData.value.cover_image);
  frmData.append("email", formData.value.email);
  frmData.append("phone_number", formData.value.phone_number);
  frmData.append("dob", formData.value.dob);
  frmData.append("line_id", formData.value.line_id);
  frmData.append("nrc_number", formData.value.nrc_number);
  frmData.append("company_name", formData.value.company_name);

  if (enabled.value == true) {
    formData.value.is_corporate_customer = "1";
    frmData.append(
      "is_corporate_customer",
      formData.value.is_corporate_customer
    );
  } else {
    formData.value.is_corporate_customer = "0";
    frmData.append(
      "is_corporate_customer",
      formData.value.is_corporate_customer
    );
  }

  try {
    const response = await customerStore.addNewAction(frmData);
    formData.value = {
      name: "",
      photo: "",
      email: "",
      phone_number: "",
      dob: "",
      line_id: "",
      nrc_number: "",
      company_name: "",
      is_corporate_customer: "",
    };
    enabled.value = false;
    errors.value = null;
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

onMounted(async () => {});
</script>

<template>
  <div class="bg-white relative h-screen overflow-hidden">
    <div class="overflow-auto h-full">
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
            Create
          </p>
        </div>
        <div>
          <form
            @submit.prevent="onSubmitHandler"
            class="mt-4 px-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2"
          >
            <div class="space-y-2">
              <label class="text-sm text-gray-800">Name</label>
              <input
                type="text"
                v-model="formData.name"
                id="name"
                class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
                placeholder="enter name"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-800">Email Address</label>
              <input
                type="email"
                v-model="formData.email"
                id="email"
                class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
                placeholder="enter email"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-800">Phone</label>
              <input
                type="text"
                v-model="formData.phone_number"
                id="phone_number"
                class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
                placeholder="enter phone number"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-800">DOB</label>
              <input
                v-model="formData.dob"
                type="date"
                id="title"
                class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-800">Line ID</label>
              <input
                type="text"
                v-model="formData.line_id"
                id="line_id"
                class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
                placeholder="enter line id"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-800">Company Name</label>
              <input
                type="text"
                v-model="formData.company_name"
                id="company_name"
                class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
                placeholder="enter company name"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-800">Passport Number</label>
              <input
                type="text"
                v-model="formData.nrc_number"
                id="nrc_number"
                class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
                placeholder="enter nrc number"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm text-black">Is Corporate Customer</p>
              <div class="pt-3">
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
            </div>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 col-span-1 sm:col-span-2 gap-2"
            >
              <div class="bg-white/60 text-sm rounded-lg shadow-sm mb-5">
                <div class="flex items-center justify-between gap-3 mb-3">
                  <p>Passport Label Name</p>
                  <input
                    type="file"
                    ref="featureImageInput"
                    class="hidden"
                    @change="handlerFeatureFileChange"
                    accept="image/*"
                  />
                  <button
                    v-if="!featureImagePreview"
                    @click.prevent="openFileFeaturePicker"
                    class="text-sm text-main"
                  ></button>
                  <button
                    v-else
                    @click.prevent="removeFeatureSelectImage"
                    class="rounded-full text-sm text-red-600 items-center justify-center flex"
                  >
                    <XCircleIcon class="w-8 h-8 font-semibold text-red" />
                  </button>
                </div>
                <div
                  v-if="!featureImagePreview"
                  @click.prevent="openFileFeaturePicker"
                  class="cursor-pointer w-full h-[130px] border-2 border-dashed border-main rounded flex justify-center items-center"
                >
                  <span class="text-xs">Click</span>
                </div>
                <div v-if="featureImagePreview" class="">
                  <img
                    class="h-auto w-full rounded"
                    :src="featureImagePreview"
                    alt=""
                  />
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
    </div>
  </div>
</template>
