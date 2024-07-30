<template>
  <div>
    <Layout>
      <div class="h-auto pb-20">
        <p
          class="text-center py-3 border-b border-black/10 text-sm font-semibold"
        >
          sign up
        </p>
        <div class="mt-10 px-6">
          <p class="font-medium pb-6">welcome to thanywhere</p>
          <div
            class="border border-black/10 rounded-lg overflow-hidden divide-y divide-black/10"
          >
            <div>
              <input
                type="text"
                name=""
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                v-model="formData.first_name"
                placeholder="first name"
              />
            </div>
            <div>
              <input
                type="text"
                name=""
                v-model="formData.last_name"
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                placeholder="last name"
              />
            </div>
          </div>
          <p class="text-[10px] py-1">
            make sure it matches the name on your goverment ID
          </p>
          <div
            class="border border-black/10 mt-3 rounded-lg overflow-hidden divide-y divide-black/10"
          >
            <div>
              <input
                type="date"
                v-model="formData.dob"
                name=""
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                placeholder="birth date"
              />
            </div>
          </div>
          <p class="text-[10px] py-1">
            to sign up , you need to be at least 18 . your birthday won't be
            shared with other people who use thanywhere
          </p>
          <div
            class="border border-black/10 mt-3 rounded-lg overflow-hidden divide-y divide-black/10"
          >
            <div>
              <input
                type="email"
                v-model="formData.email"
                name=""
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                placeholder="email address"
              />
            </div>
          </div>
          <p class="text-[10px] py-1">
            we'll email you trip confirmations and receipts.
          </p>

          <div
            class="border border-black/10 mt-3 rounded-lg overflow-hidden divide-y divide-black/10"
          >
            <div>
              <input
                type="password"
                v-model="formData.password"
                name=""
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                placeholder="password"
              />
            </div>
            <div>
              <input
                type="password"
                v-model="formData.password_confirmation"
                name=""
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                placeholder="confirmation password"
              />
            </div>
          </div>
          <p class="text-[10px] py-4">
            we'll send you marketing promotions , special offers , inspiration
            and policy updates via email,
          </p>
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
            class="py-3 text-center w-full text-sm font-medium border border-black/30 mt-4 bg-background rounded-lg"
            @click="router.push('/account/login')"
          >
            go to sign in
          </button>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useToast } from "vue-toastification";

const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

const formData = ref({
  first_name: "",
  last_name: "",
  email: "",
  dob: "",
  password: "",
  password_confirmation: "",
});

const handleSubmit = async () => {
  try {
    const frmData = new FormData();
    frmData.append("first_name", formData.value.first_name);
    frmData.append("last_name", formData.value.last_name);
    frmData.append("email", formData.value.email);
    frmData.append("dob", formData.value.dob);
    frmData.append("password", formData.value.password);
    frmData.append(
      "password_confirmation",
      formData.value.password_confirmation
    );
    const res = await authStore.registerAction(frmData);
    console.log(res, "this is response");
    if (res.data != null) {
      toast.success(res.message);
      router.push("/account/login");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
</script>
