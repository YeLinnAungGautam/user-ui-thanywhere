<template>
  <div>
    <Layout>
      <p
        class="text-center py-3 text-main border-b border-black/10 text-sm font-semibold"
      >
        log in
      </p>
      <div class="mt-10 px-6">
        <p class="font-medium pb-6">welcome to thanywhere</p>
        <div
          class="border border-black/10 rounded-lg overflow-hidden divide-y divide-black/10"
        >
          <input
            type="email"
            v-model="formData.email"
            name=""
            class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
            placeholder=" enter your email address"
          />
          <input
            type="password"
            name=""
            v-model="formData.password"
            class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
            placeholder=" enter password"
          />
        </div>
        <p class="text-[10px] py-4">
          we'll send confirmation code to confirm your email. Standard message
          and data rates apply .
          <span class="underline font-medium">privacy policy</span>
        </p>
        <button
          @click="handleSubmit"
          class="py-3 text-center w-full text-sm font-medium bg-main text-white rounded-lg"
        >
          continue
        </button>
        <button
          @click="router.push('/account/signup')"
          class="py-3 text-center w-full text-sm font-medium border border-black/30 mt-4 bg-background rounded-lg"
        >
          go to sign up
        </button>
      </div>
      <div class="relative px-6 py-10">
        <div
          class="bg-background inline text-black absolute bottom-[41%] px-4 left-[45%] text-xs"
        >
          or
        </div>
        <div class="w-full h-0.5 bg-black/10"></div>
      </div>
      <div class="px-6 space-y-5">
        <div class="relative">
          <img
            :src="facebook"
            class="w-5 h-5 object-cover absolute top-3 left-6"
            alt=""
          />
          <button
            class="py-3 text-center w-full text-sm font-medium bg-background text-black/80 border border-black/30 rounded-lg"
          >
            continue with facebook
          </button>
        </div>
        <div class="relative" @click="getGoogleLink">
          <img
            :src="google"
            class="w-5 h-5 object-cover absolute top-3 left-6"
            alt=""
          />
          <button
            class="py-3 text-center w-full text-sm font-medium bg-background text-black/80 border border-black/30 rounded-lg"
          >
            continue with google
          </button>
        </div>
        <Modal
          :show="showModal"
          :iframeSrc="googleOAuthLink"
          @close="showModal = false"
        >
          <p>Google OAuth link is shown in the modal.</p>
        </Modal>
      </div>
    </Layout>
  </div>
</template>

<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import facebook from "../assets/icons/Social_icon/341099_facebook_icon.png";
import google from "../assets/icons/Social_icon/icons8-google-48.png";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Modal from "../components/auth/ModalAuth.vue";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const router = useRouter();
const showModal = ref(false);
const googleOAuthLink = ref("");
const toast = useToast();

const formData = ref({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  const frmData = new FormData();
  frmData.append("email", formData.value.email);
  frmData.append("password", formData.value.password);
  const res = await authStore.loginAction(frmData);
  console.log(res, "this is response");
  // toast.success(res.data.message);
  if (res.data == null) {
    toast.error(`${res.message} `);
  } else {
    toast.success(`${res.message} , thank you from thanywhere! `);
    router.push("/home");
  }
};

const getGoogleLink = async () => {
  // Logic to get Google OAuth link
  const res = await authStore.getGoogleLink();
  console.log(res);

  const popup = window.open(
    res.data.data.url,
    "_blank",
    "width=500,height=600"
  );

  if (!popup || popup.closed || typeof popup.closed == "undefined") {
    alert("Popup blocked. Please allow popups for this website.");
    return;
  }

  showModal.value = true;

  // Monitor the popup window and close the modal when the popup is closed
  const popupTimer = setInterval(() => {
    if (popup.closed) {
      clearInterval(popupTimer);
      showModal.value = false;
      // Optionally, handle the OAuth flow completion
      handleOAuthCompletion();
    }
  }, 500);
};

const handleOAuthCompletion = () => {
  // Logic to handle OAuth flow completion
  console.log("OAuth flow completed.");
};
</script>
