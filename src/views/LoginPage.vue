<template>
  <div>
    <Layout>
      <p
        class="text-center py-3 border-b border-black/10 text-sm font-semibold"
      >
        log in or sign up
      </p>
      <div class="mt-10 px-6">
        <p class="font-medium pb-6">welcome to thanywhere</p>
        <div
          class="border border-black/10 rounded-lg overflow-hidden divide-y divide-black/10"
        >
          <input
            type="email"
            name=""
            class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
            id=""
            placeholder=" enter your email address"
          />
          <input
            type="password"
            name=""
            class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
            id=""
            placeholder=" enter password"
          />
        </div>
        <p class="text-[10px] py-4">
          we'll send confirmation code to confirm your email. Standard message
          and data rates apply .
          <span class="underline font-medium">privacy policy</span>
        </p>
        <button
          class="py-3 text-center w-full text-sm font-medium bg-main text-white rounded-lg"
        >
          continue
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
        <div class="relative">
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
      </div>
    </Layout>
  </div>
</template>

<script setup>
import Layout from "../components/layout/LayoutHome.vue";
import facebook from "../assets/icons/Social_icon/341099_facebook_icon.png";
import google from "../assets/icons/Social_icon/icons8-google-48.png";
</script>
