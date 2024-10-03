<template>
  <div>
    <Layout>
      <div class="h-auto pb-20">
        <p
          class="text-center py-3 border-b border-black/10 text-sm text-main font-semibold"
        >
          profile
        </p>
        <div class="space-y-5 mt-10">
          <div
            class="relative w-[130px] mx-auto h-[130px] shadow-custom rounded-full border border-main"
          >
            <div
              class="w-[130px] h-[130px] overflow-hidden rounded-full border border-main"
            >
              <img :src="profile" class="w-full h-full object-cover" alt="" />
            </div>
            <div
              class="w-8 h-8 flex justify-center items-center bg-main rounded-full absolute bottom-2 right-0"
            >
              <PencilSquareIcon class="w-6 h-6 text-white" />
            </div>
          </div>
          <p class="text-center text-lg text-main font-semibold">
            {{ user?.name }}
          </p>
          <div
            @click="copyAction(user?.unique_key)"
            class="flex justify-around py-2 rounded-lg items-center gap-2 mx-4 border border-black/5 shadow-custom"
          >
            <p class="text-center text-sm w-[80%] line-clamp-1 font-medium">
              {{ user?.unique_key }}
            </p>
            <button class="bg-main px-2 py-1 text-xs text-white rounded-lg">
              copy
            </button>
          </div>
          <div
            class="mx-4 p-4 rounded-xl shadow-custom divide-y divide-black/10"
          >
            <div
              class="flex justify-between items-center py-2"
              @click="router.push('/account/profile/update')"
            >
              <div class="flex justify-start items-center gap-2">
                <PencilSquareIcon class="w-5 h-5" />
                <p class="text-xs">update personal info</p>
              </div>
              <ChevronRightIcon class="w-5 h-5" />
            </div>
            <div class="flex justify-between items-center py-2">
              <div class="flex justify-start items-center gap-2">
                <BookOpenIcon class="w-5 h-5" />
                <p class="text-xs">bookings</p>
              </div>
              <ChevronRightIcon class="w-5 h-5" />
            </div>
            <div class="flex justify-between items-center py-2">
              <div class="flex justify-start items-center gap-2">
                <DocumentTextIcon class="w-5 h-5" />
                <p class="text-xs">reviews</p>
              </div>
              <ChevronRightIcon class="w-5 h-5" />
            </div>
            <div class="flex justify-between items-center py-2">
              <div class="flex justify-start items-center gap-2">
                <TicketIcon class="w-5 h-5" />
                <p class="text-xs">trips</p>
              </div>
              <ChevronRightIcon class="w-5 h-5" />
            </div>
            <div
              class="flex justify-between items-center py-2"
              @click="logoutAction"
            >
              <div class="flex justify-start items-center gap-2">
                <ArrowRightStartOnRectangleIcon class="w-5 h-5" />
                <p class="text-xs">logout</p>
              </div>
              <ChevronRightIcon class="w-5 h-5" />
            </div>
          </div>
          <div
            class="mx-4 p-4 rounded-xl shadow-custom divide-y divide-black/10"
          >
            <div class="flex justify-between items-center py-2">
              <div class="flex justify-start items-center gap-2">
                <LockClosedIcon class="w-5 h-5" />
                <p class="text-xs">security & privacy</p>
              </div>
              <ChevronRightIcon class="w-5 h-5" />
            </div>
            <div class="flex justify-between items-center py-2">
              <div class="flex justify-start items-center gap-2">
                <NewspaperIcon class="w-5 h-5" />
                <p class="text-xs">terms & conditions</p>
              </div>
              <ChevronRightIcon class="w-5 h-5" />
            </div>
            <div class="flex justify-between items-center py-2">
              <div class="flex justify-start items-center gap-2">
                <ExclamationTriangleIcon class="w-5 h-5" />
                <p class="text-xs">help center</p>
              </div>
              <ChevronRightIcon class="w-5 h-5" />
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
  ChevronRightIcon,
  ArrowRightStartOnRectangleIcon,
  BookOpenIcon,
  DocumentTextIcon,
  TicketIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  NewspaperIcon,
} from "@heroicons/vue/24/outline";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const toast = useToast();

const logoutAction = () => {
  const res = authStore.logoutAction();
  if (res) {
    router.push("/home");
  }
};

const profile = ref("");

const getActionCheck = async () => {
  const res = await authStore.getAction();
  (profile.value =
    user.value?.profile == `https://api-blog.thanywhere.com/storage/images/`
      ? logo
      : user.value?.profile),
    console.log("====================================");
  console.log(res, "this is getAction");
  console.log("====================================");
  if (res == "fail") {
    router.push("/home");
  }
};

const copyAction = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("copied");
};

onMounted(async () => {
  await getActionCheck();
  // console.log(user.value.first_name);
});
</script>
