<template>
  <div>
    <Layout>
      <div class="h-auto pb-20">
        <div
          class="flex justify-between items-center py-3 border-b border-black/10 px-4"
        >
          <ChevronLeftIcon
            class="w-5 h-5 text-main"
            @click="router.push('/account/profile')"
          />
          <p class="text-center text-sm text-main font-semibold">
            update profile info
          </p>
          <p class="opacity-0">...</p>
        </div>
        <div class="space-y-5 mt-10">
          <div
            class="relative w-[130px] mx-auto h-[130px] shadow-custom rounded-full border border-main"
          >
            <div
              v-if="!previewImage"
              class="w-[130px] h-[130px] shadow-custom rounded-full border border-main overflow-hidden"
            >
              <img
                :src="formData.image == null ? logo : formData.image"
                class="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div
              v-if="previewImage"
              class="w-[130px] h-[130px] shadow-custom rounded-full border border-main overflow-hidden"
            >
              <img
                :src="previewImage"
                class="w-full h-full object-cover"
                alt=""
                v-if="previewImage"
              />
            </div>
            <input
              type="file"
              id="image"
              ref="fileInput"
              class="hidden"
              @change="handleFileChange"
              accept="image/*"
            />
            <!-- <div v-if="previewImage" class="w-full h-auto">
              <img
                :src="previewImage"
                alt="Image preview"
                class="w-full h-auto rounded"
              />
            </div> -->
            <!-- <div
              v-else
              @click.prevent="openFilePicker"
              class="cursor-pointer w-full h-[250px] border-2 border-dashed border-gray-400 rounded flex justify-center items-center"
            >
              <span class="text-xs"
                ><i
                  class="fa-solid fa-plus text-4xl font-semibold py-4 px-5 bg-[#ff613c] rounded-full shadow text-white"
                ></i
              ></span>
            </div> -->
            <div
              v-if="!previewImage"
              class="w-8 h-8 flex justify-center items-center bg-main rounded-full absolute bottom-2 right-0"
              @click.prevent="openFilePicker"
            >
              <PencilSquareIcon class="w-6 h-6 text-white" />
            </div>
            <div
              v-if="previewImage"
              class="w-8 h-8 flex justify-center items-center bg-red rounded-full absolute bottom-2 right-0"
              @click.prevent="removeSelectedImage"
            >
              <MinusCircleIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <!-- <p class="text-center text-lg text-main font-semibold">
            {{ user?.name }}
          </p> -->
          <div
            class="mx-4 p-4 rounded-xl shadow-custom divide-y divide-black/10"
          >
            <div class="py-2 space-y-4">
              <div class="space-y-2">
                <p class="text-xs text-main font-semibold">name</p>
                <p
                  v-if="!user?.first_name && !user?.last_name"
                  class="text-sm text-black/50 py-2 border border-black/50 rounded-lg px-2"
                >
                  {{ user?.name }}
                </p>
                <div
                  class="flex justify-between items-center gap-2"
                  v-if="user?.first_name && user?.last_name"
                >
                  <input
                    type="text"
                    class="text-sm font-medium p-2 rounded-lg border border-black/50 w-full"
                    name=""
                    v-model="formData.first_name"
                    placeholder=" first name"
                    id=""
                  />
                  <input
                    type="text"
                    class="text-sm font-medium p-2 rounded-lg border border-black/50 w-full"
                    name=""
                    v-model="formData.last_name"
                    placeholder=" last name"
                    id=""
                  />
                </div>
              </div>
              <div class="space-y-2">
                <p class="text-xs text-main font-semibold">email</p>
                <p
                  class="text-sm text-black/50 py-2 border border-black/50 rounded-lg px-2"
                >
                  {{ user?.email }}
                </p>
              </div>
              <div class="space-y-2">
                <p class="text-xs text-main font-semibold">phone number</p>
                <input
                  type="text"
                  class="text-sm font-medium p-2 rounded-lg border border-black/50 w-full"
                  name=""
                  v-model="formData.phone"
                  placeholder=" 09XXXXXXXX"
                  id=""
                />
              </div>
              <div class="space-y-2">
                <p class="text-xs text-main font-semibold">address</p>
                <textarea
                  name=""
                  class="text-sm font-medium p-2 rounded-lg border border-black/50 w-full"
                  id=""
                  cols="10"
                  v-model="formData.address"
                  rows="5"
                  placeholder="address , city , country"
                ></textarea>
              </div>
              <div class="space-y-2">
                <p class="text-xs text-main font-semibold">dob</p>
                <input
                  type="date"
                  class="text-sm font-medium p-2 rounded-lg border border-black/50 w-full"
                  name=""
                  v-model="formData.dob"
                  placeholder=" "
                  id=""
                />
              </div>
              <div class="space-y-2">
                <p class="text-xs text-main font-semibold">gender</p>
                <select
                  name=""
                  v-model="formData.gender"
                  id=""
                  class="text-sm font-medium p-2 rounded-lg border border-black/50 w-full"
                >
                  <option value="">male</option>
                  <option value="">female</option>
                  <option value="">other...</option>
                </select>
              </div>
              <div class="relative" @click="updateUserInfoFunction">
                <div class="absolute bottom-2 left-4">
                  <PencilSquareIcon class="w-6 h-6 text-white" />
                </div>
                <button
                  class="text-sm text-white bg-main font-medium p-2 rounded-lg border border-black/50 w-full"
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import logo from "../assets/web-logo.png";
import { useRouter } from "vue-router";
import {
  PencilSquareIcon,
  MinusCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/24/outline";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const getActionCheck = async () => {
  const res = await authStore.getAction();
  console.log("====================================");
  console.log(res, "this is getAction");
  console.log("====================================");
  if (res == "fail") {
    router.push("/home");
  }
  getUserData();
};

const getUserData = () => {
  formData.value = {
    name: user.value?.name || "",
    first_name: user.value?.first_name || "",
    last_name: user.value?.last_name || "",
    email: user.value?.email || "",
    phone: user.value?.phone || "",
    address: user.value?.address || "",
    dob: user.value?.dob || "",
    gender: user.value?.gender || "",
    image:
      user.value?.profile == `https://api-blog.thanywhere.com/storage/images/`
        ? null
        : user.value?.profile,
  };
};

const formData = ref({
  name: user.value?.name || "",
  first_name: user.value?.first_name || "",
  last_name: user.value?.last_name || "",
  email: user.value?.email || "",
  phone: user.value?.phone || "",
  address: user.value?.address || "",
  dob: user.value?.dob || "",
  gender: user.value?.gender || "",
  image:
    user.value?.profile == `https://api-blog.thanywhere.com/storage/images/`
      ? null
      : user.value?.profile,
});

const fileInput = ref(null);
const previewImage = ref(null);
const openFilePicker = () => {
  fileInput.value.click();
};

const handleFileChange = (e) => {
  let selectedFile = e.target.files[0];
  if (selectedFile) {
    formData.value.image = e.target.files[0];
    previewImage.value = URL.createObjectURL(selectedFile);
  }
};

const removeSelectedImage = () => {
  formData.value.image = null;
  previewImage.value = null;
};

const updateUserInfoFunction = async () => {
  const frmData = new FormData();
  frmData.append("name", formData.value.name);
  frmData.append("first_name", formData.value.first_name);
  frmData.append("last_name", formData.value.last_name);
  frmData.append("email", formData.value.email);
  frmData.append("phone", formData.value.phone);
  frmData.append("gender", formData.value.gender);
  frmData.append("address", formData.value.address);
  frmData.append("dob", formData.value.dob);
  frmData.append("_method", "PUT");
  frmData.append("profile", formData.value.image);

  const res = await authStore.updateUserInfoAction(frmData);
  console.log("====================================");
  console.log(res);
  console.log("====================================");

  if (res.status == 200) {
    toast.success(`${res.data.message}`);
    router.push("/account/profile");
  } else {
    toast.error("upload failed");
    router.push("/account/profile");
  }
};

onMounted(async () => {
  await getActionCheck();
  // console.log(user.value.first_name);
});
</script>
