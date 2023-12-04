<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarVue from "../components/Navbar.vue";
import { storeToRefs } from "pinia";
import { useToastStore } from "../stores/toast";
import { useCityStore } from "../stores/city";
import { useProductStore } from "../stores/product";
import { useDestinationStore } from "../stores/destination";
import { useCarStore } from "../stores/car";
import { useVantourStore } from "../stores/vantour";
import VantourCarPriceListVue from "../components/Vantour/VantourCarPriceList.vue";
import VantourCarPriceCreateVue from "../components/Vantour/VantourCarPriceCreate.vue";
import { XCircleIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
const route = useRoute();
const cityStore = useCityStore();
const productStore = useProductStore();
const destinationStore = useDestinationStore();
const carStore = useCarStore();
const vantourStore = useVantourStore();
const toastStore = useToastStore();

const { cities } = storeToRefs(cityStore);
const { tags } = storeToRefs(productStore);
const { dests } = storeToRefs(destinationStore);
const { cars } = storeToRefs(carStore);
const errors = ref(null);

const formData = ref({
  name: "",
  description: "",
  long_description: "",
  cover_image: "",
  sku_code: "",
  tag: [],
  city_id: [],
  destination: [],
  images: [],
  prices: [],
  feature_image: "",
});
const showPricePage = ref(false);
const showPriceCreatePage = ref(false);

const goBack = () => {
  router.go(-1);
};

const featureImageInput = ref(null);
const featureImagePreview = ref(null);

const openFileFeaturePicker = () => {
  featureImageInput.value.click();
};

const handlerFeatureFileChange = (e) => {
  let selectedFile = e.target.files[0];
  if (selectedFile) {
    editData.value.cover_image = e.target.files[0];
    featureImagePreview.value = URL.createObjectURL(selectedFile);
  }
};

const removeFeatureSelectImage = () => {
  editData.value.feature_image = null;
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
      editData.value.images.push(selectedFile[index]);
      imagesPreview.value.push(URL.createObjectURL(selectedFile[index]));
    }
  }
};

const removeImageSelectImage = (index) => {
  editData.value.images.splice(index, 1);
  imagesPreview.value.splice(index, 1);
};

const createCarPrice = (data) => {
  addNewPrice(data);
  showPriceCreatePage.value = false;
};
const removeChange = (data) => {
  removeFromPrice(data);
};

const addNewPrice = (data) => {
  editData.value.prices.push(data);
  console.log(editData.value.prices, "this is push");
};

const removeFromPrice = (index) => {
  editData.value.prices.splice(index, 1);
};

const onSubmitHandler = async () => {
  const frmData = new FormData();
  frmData.append("_method", "PUT");
  frmData.append("name", formData.value.name);
  frmData.append("sku_code", formData.value.sku_code);
  frmData.append("long_description", formData.value.long_description);
  frmData.append("description", formData.value.description);

  if (editData.value.images.length > 0) {
    for (let i = 0; i < editData.value.images.length; i++) {
      let file = editData.value.images[i];
      frmData.append("images[" + i + "]", file);
    }
  }
  if (editData.value.cover_image) {
    frmData.append("cover_image", editData.value.cover_image);
  }
  for (var x = 0; x < formData.value.city_id.length; x++) {
    frmData.append("city_ids[" + x + "]", formData.value.city_id[x]);
  }
  for (var x = 0; x < formData.value.tag.length; x++) {
    frmData.append("tag_ids[" + x + "]", formData.value.tag[x]);
  }
  for (var x = 0; x < formData.value.destination.length; x++) {
    frmData.append("destination_ids[" + x + "]", formData.value.destination[x]);
  }
  for (var x = 0; x < editData.value.prices.length; x++) {
    frmData.append("car_ids[" + x + "]" + [x], editData.value.prices[x].car);
  }
  for (var x = 0; x < editData.value.prices.length; x++) {
    frmData.append("prices[" + x + "]" + [x], editData.value.prices[x].price);
  }
  for (var x = 0; x < editData.value.prices.length; x++) {
    frmData.append(
      "agent_prices[" + x + "]" + [x],
      editData.value.prices[x].agent_price
    );
  }
  try {
    const response = await vantourStore.updateAction(frmData, route.params.id);
    formData.value = {
      name: "",
      description: "",
      long_description: "",
      cover_image: "",
      sku_code: "",
      tag: [],
      city_id: [],
      destination: [],
      images: [],
      prices: [],
      feature_image: "",
    };
    errors.value = null;
    toastStore.showToast({
      icon: "success",
      title: response.message,
    });
    router.push({ name: "vantours" });
  } catch (error) {
    if (error.response) {
      toastStore.showToast({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }
};

const editData = ref({
  tag: [],
  city_id: [],
  destination: [],
  prices: [],
  cover_image: "",
  images: [],
});

const updateEditTagData = () => {
  for (const key in editData.value.tag) {
    const tagid = editData.value.tag[key].id;
    formData.value.tag.push(tagid);
  }
  console.log(formData.value.tag, "this is tag");
};
const updateEditCityData = () => {
  for (const key in editData.value.city_id) {
    const cityid = editData.value.city_id[key].id;
    formData.value.city_id.push(cityid);
  }
  console.log(formData.value.tag, "this is city");
};
const updateEditDesData = () => {
  for (const key in editData.value.destination) {
    const destinationid = editData.value.destination[key].id;
    formData.value.destination.push(destinationid);
  }
  console.log(formData.value.destination, "this is destination");
};

const getDetail = async () => {
  try {
    const response = await vantourStore.getDetailAction(route.params.id);
    formData.value.name = response.result.name;
    formData.value.description = response.result.description;
    formData.value.long_description = response.result.long_description;
    editData.value.cover_image = response.result.cover_image;
    formData.value.sku_code = response.result.sku_code;
    editData.value.tag = response.result.tags;
    editData.value.city_id = response.result.cities;
    editData.value.destination = response.result.destinations;
    formData.value.images = response.result.images;
    console.log(response.result.tags);
    for (const x in response.result.cars) {
      const item = {
        car: response.result.cars[x].id,
        price: response.result.cars[x].price,
        agent_price: response.result.cars[x].agent_price,
      };
      editData.value.prices.push(item);
    }
    updateEditTagData();
    updateEditCityData();
    updateEditDesData();
    console.log(formData.value.tag, "tag");
    console.log(formData.value.city_id, "tag");
    console.log(formData.value.destination, "tag");
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await getDetail();
  await cityStore.getSimpleListAction();
  await productStore.getSimpleListTagAction();
  await carStore.getSimpleListAction();
  await destinationStore.getSimpleListAction();
  console.log(route.params.id);
});
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
            Edit
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
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-800">SKU Code</label>
              <input
                type="text"
                v-model="formData.sku_code"
                id="sku_code"
                class="w-full h-10 text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm text-gray-800">Cities</p>
              <v-select
                v-model="formData.city_id"
                class="w-full min-h-10 text-sm border-main border rounded bg-white focus:outline-none focus:border-none"
                :options="cities?.data"
                label="name"
                multiple
                :clearable="false"
                :reduce="(city) => city.id"
                placeholder="Choose City"
              ></v-select>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-gray-800">Tags</p>
              <v-select
                v-model="formData.tag"
                class="w-full min-h-10 text-sm border-main border rounded bg-white focus:outline-none focus:border-none"
                :options="tags?.data"
                label="name"
                multiple
                :clearable="false"
                :reduce="(tag) => tag.id"
                placeholder="Choose Tags"
              ></v-select>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-gray-800">Destination</p>
              <v-select
                v-model="formData.destination"
                class="w-full min-h-10 text-sm border-main border rounded bg-white focus:outline-none focus:border-none"
                :options="dests?.data"
                label="name"
                multiple
                :clearable="false"
                :reduce="(dest) => dest.id"
                placeholder="Choose Destinations"
              ></v-select>
            </div>
            <div class="pt-0 sm:pt-6">
              <div
                class="flex justify-start items-center py-2 gap-2"
                @click="showPricePage = true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 bg-main rounded-full text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                <p
                  class="mt-1 text-main text-base"
                  v-if="editData.prices.length == 0"
                >
                  Choose Car & Price
                </p>
                <p
                  class="mt-1 text-main text-base"
                  v-if="editData.prices.length != 0"
                >
                  See Car & Price List
                </p>
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-800">Routes</label>
              <textarea
                v-model="formData.description"
                rows="3"
                id="title"
                class="w-full text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
                placeholder="place , place , place "
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm text-gray-800">Long Description</label>
              <textarea
                v-model="formData.long_description"
                rows="3"
                id="title"
                class="w-full text-sm px-4 py-2 text-gray-900 border-main border rounded shadow-sm bg-white/50 focus:outline-none focus:border-gray-300"
                placeholder="enter description"
              />
            </div>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 col-span-1 sm:col-span-2 gap-2"
            >
              <div class="bg-white/60 text-sm rounded-lg shadow-sm mb-5">
                <div class="flex items-center justify-between gap-3 mb-3">
                  <p>Images</p>
                  <div>
                    <button
                      class="text-sm text-blue-600"
                      @click.prevent="openFileImagePicker"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.8"
                        stroke="currentColor"
                        class="w-8 h-8 text-red"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
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
                  v-if="imagesPreview.length != 0"
                >
                  <div
                    class="relative"
                    v-for="(image, index) in imagesPreview"
                    :key="index"
                  >
                    <button
                      @click.prevent="removeImageSelectImage(index)"
                      class="rounded-full text-sm text-red-600 items-center justify-center flex absolute top-[-0.9rem] right-[-0.7rem]"
                    >
                      <XCircleIcon class="w-8 h-8 font-semibold" />
                    </button>

                    <img class="h-auto w-full rounded" :src="image" alt="" />
                  </div>
                </div>
                <div
                  class="grid grid-cols-3 gap-2 mb-6 bg-white rounded-md shadow"
                  v-if="imagesPreview.length == 0"
                >
                  <div
                    class="relative"
                    v-for="(image, index) in formData.images"
                    :key="index"
                  >
                    <img
                      class="h-auto w-full rounded"
                      :src="image.image"
                      alt=""
                    />
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
                    class="text-sm text-red-600"
                    v-if="!featureImagePreview"
                    @click.prevent="openFileFeaturePicker"
                  >
                    <XCircleIcon class="w-8 h-8 font-semibold text-red" />
                  </button>
                  <button
                    v-else
                    @click.prevent="removeFeatureSelectImage"
                    class="text-sm text-red-500"
                  >
                    <XCircleIcon class="w-8 h-8 font-semibold text-red" />
                  </button>
                </div>

                <div v-if="featureImagePreview" class="">
                  <img
                    v-if="featureImagePreview || !formData.cover_image"
                    class="h-auto w-full rounded"
                    :src="featureImagePreview"
                    alt=""
                  />
                </div>
                <div
                  v-if="!featureImagePreview"
                  class="p-2 bg-white rounded-md shadow"
                >
                  <img :src="editData.cover_image" alt="" class="w-full" />
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
                <p class="">Update</p>
              </div>
            </button>
          </form>
        </div>
      </div>
      <div
        class="absolute top-0 w-screen h-full overflow-scroll bg-gray z-10 animate__animated animate__fadeIn"
        v-if="showPricePage"
      >
        <div class="relative">
          <NavbarVue />
          <div
            class="flex justify-start items-center gap-2 py-4 px-4 text-main"
            @click="showPricePage = false"
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
          <VantourCarPriceListVue
            :items="editData.prices"
            @remove="removeChange"
          />
          <div
            class="absolute top-[110px] right-[15px]"
            @click="showPriceCreatePage = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 bg-main rounded-full text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        class="absolute top-0 w-screen h-full bg-gray z-20 animate__animated animate__fadeIn"
        v-if="showPriceCreatePage"
      >
        <div class="relative h-full">
          <NavbarVue />
          <div
            class="flex justify-start items-center gap-2 py-4 px-4 text-main"
            @click="showPriceCreatePage = false"
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
          <VantourCarPriceCreateVue @create="createCarPrice" />
        </div>
      </div>
    </div>
  </div>
</template>
