<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { useEntranceStore } from "../stores/entrance";
import { useCityStore } from "../stores/city";
import { storeToRefs } from "pinia";
import { useToastStore } from "../stores/toast";
import { XCircleIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
const entranceStore = useEntranceStore();
const cityStore = useCityStore();
const toastStore = useToastStore();

const { cities } = storeToRefs(cityStore);
const citylist = ref([]);
const errors = ref(null);

const formData = ref({
  name: "",
  description: "",
  cover_image: "",
  city_id: [],
  category: [],
  images: [],
  feature_image: "",
  id: "",
  payment_method: "",
  bank_name: "",
  bank_account_number: "",
  account_name: "",
  place: "",
  legal_name: "",
  contract_due: "",
  contracts: [],
});
const bankName = [
  { id: "1", name: "K + " },
  { id: "2", name: "SCB " },
  { id: "3", name: "Bangkok Bank" },
  { id: "4", name: "Other Bank " },
];
const paymentMethod = [
  { id: "1", name: "Bank Transfer" },
  { id: "2", name: "International Remittance" },
  { id: "3", name: "Cash" },
  { id: "4", name: "Other ..." },
];
const contract_file = (e) => {
  let selectedFile = e.target.files;
  if (selectedFile) {
    for (let index = 0; index < selectedFile.length; index++) {
      // formData.value.contracts.push(selectedFile[index]);
      let file = selectedFile[index];
      formData.value.contracts.push(file);
    }
    console.log(formData.value.contracts, "this is contracts");
  }
};

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

const addNewHandler = async () => {
  const frmData = new FormData();
  frmData.append("name", formData.value.name);
  frmData.append("description", formData.value.description);
  frmData.append("account_name", formData.value.account_name);
  // frmData.append("place", formData.value.place);
  frmData.append("payment_method", formData.value.payment_method);
  frmData.append("bank_name", formData.value.bank_name);
  frmData.append("bank_account_number", formData.value.bank_account_number);
  frmData.append("legal_name", formData.value.legal_name);

  console.log(formData.value.contracts);

  if (formData.value.images.length > 0) {
    for (let i = 0; i < formData.value.images.length; i++) {
      let file = formData.value.images[i];
      frmData.append("images[" + i + "]", file);
    }
  }
  frmData.append("cover_image", formData.value.cover_image);
  for (var x = 0; x < formData.value.city_id.length; x++) {
    frmData.append("city_ids[" + x + "]", formData.value.city_id[x]);
  }

  // for (var x = 0; x < formData.value.category.length; x++) {
  //   frmData.append("category_ids[" + x + "]", formData.value.category[x]);
  // }
  if (formData.value.contracts) {
    // frmData.append("contracts", formData.value.contracts);
    for (let i = 0; i < formData.value.contracts.length; i++) {
      let file = formData.value.contracts[i];
      frmData.append("contracts[" + i + "]", file);
    }
  }

  try {
    const response = await entranceStore.addNewAction(frmData);
    formData.value = {
      name: "",
      description: "",
      cover_image: "",
      city_id: [],
      category: [],
      images: [],
      feature_image: "",
      id: "",
      payment_method: "",
      bank_name: "",
      bank_account_number: "",
      account_name: "",
      place: "",
      contracts: [],
      legal_name: "",
    };
    errors.value = null;
    toastStore.showToast({
      icon: "success",
      title: response.message,
    });
    router.push({ name: "attraction" });
  } catch (error) {
    // if (error.response.data.errors) {
    //   errors.value = error.response.data.errors;
    // }
    if (error.response) {
      toastStore.showToast({
        icon: "error",
        title: error.response.data.message,
      });
    }
    // setTimeout(async () => {
    //   await entranceStore.toggleLoading();
    // }, 5000);
  }
};

const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  await cityStore.getSimpleListAction();
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
          Create
        </p>
      </div>
      <div>
        <form
          @submit.prevent="addNewHandler"
          class="mt-4 px-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2"
        >
          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800"
              >Attraction Name</label
            >
            <input
              type="text"
              v-model="formData.name"
              id="name"
              class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
            />
            <p v-if="errors?.name" class="mt-1 text-sm text-red-600">
              {{ errors.name[0] }}
            </p>
          </div>
          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800">Legal Name</label>
            <input
              type="text"
              v-model="formData.legal_name"
              id="legal_name"
              class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
            />
            <p v-if="errors?.legal_name" class="mt-1 text-sm text-red-600">
              {{ errors.legal_name[0] }}
            </p>
          </div>
          <div class="space-y-2">
            <p class="text-sm text-gray-800">Cities</p>
            <v-select
              v-model="formData.city_id"
              class="w-full h-10 text-sm border-main border rounded bg-white focus:outline-none focus:border-none"
              :options="cities?.data ?? []"
              label="name"
              multiple
              :clearable="false"
              :reduce="(city) => city.id"
              placeholder="Choose City"
            ></v-select>
          </div>
          <!-- <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800">Place</label>
            <input
              type="text"
              v-model="formData.place"
              id="name"
              class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
            />
            <p v-if="errors?.name" class="mt-1 text-sm text-red-600">
              {{ errors.place[0] }}
            </p>
          </div> -->
          <div class="space-y-2">
            <p class="text-sm text-gray-800 space-y-2">Bank Name</p>
            <v-select
              v-model="formData.bank_name"
              class="w-full h-10 text-sm border-main border rounded bg-white focus:outline-none focus:border-none"
              :options="bankName ?? []"
              label="name"
              :clearable="false"
              :reduce="(bank) => bank.name"
              placeholder="Choose Bank"
            ></v-select>
          </div>
          <div class="space-y-2">
            <p class="text-sm text-gray-800 space-y-2">Payment Method</p>
            <v-select
              v-model="formData.payment_method"
              class="w-full h-10 text-sm border-main border rounded bg-white focus:outline-none focus:border-none"
              :options="paymentMethod ?? []"
              label="name"
              :clearable="false"
              :reduce="(payment) => payment.name"
              placeholder="Choose Payment"
            ></v-select>
          </div>
          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800"
              >Bank Account Number</label
            >
            <input
              v-model="formData.bank_account_number"
              type="text"
              class="w-full h-10 px-4 py-2 text-xs text-gray-900 bg-white border border-main rounded focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800">
              Account Name</label
            >
            <input
              v-model="formData.account_name"
              type="text"
              class="w-full h-10 px-4 py-2 text-xs text-gray-900 bg-white border border-main rounded focus:outline-none focus:border-gray-300"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm text-gray-800">Description</label>
            <textarea
              v-model="formData.description"
              rows="3"
              id="title"
              class="w-full text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
              placeholder="enter description"
            />
          </div>

          <div class="space-y-2">
            <label for="name" class="text-sm text-gray-800">Contracts</label>
            <input
              type="file"
              multiple
              @change="contract_file"
              id="name"
              class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
            />
            <p v-if="errors?.contracts" class="mt-1 text-sm text-red-600">
              {{ errors.contracts[0] }}
            </p>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 col-span-1 sm:col-span-2 gap-2"
          >
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
            <div class="bg-white/60 text-sm rounded-lg shadow-sm mb-5">
              <div class="flex items-center justify-between gap-3 mb-3">
                <p>Feature Image</p>
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
            class="text-end flex justify-end items-center col-span-1 sm:col-span-2 mt-6"
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
</template>
