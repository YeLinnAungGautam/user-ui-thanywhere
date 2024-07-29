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
              <p class="px-4 py-2 text-xs">name</p>
              <input
                type="text"
                name=""
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                id=""
                placeholder=" enter your name"
              />
            </div>

            <div>
              <p class="px-4 py-2 text-xs">birthday</p>
              <input
                type="date"
                name=""
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                id=""
                placeholder=" enter your birth day"
              />
            </div>
            <div>
              <p class="px-4 py-2 text-xs">phone</p>
              <input
                type="text"
                name=""
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                id=""
                placeholder=" enter your phone number"
              />
            </div>
            <div>
              <p class="px-4 py-2 text-xs">email</p>
              <input
                type="email"
                name=""
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                id=""
                placeholder=" enter your email adddress"
              />
            </div>
            <div>
              <p class="px-4 py-2 text-xs">password</p>
              <input
                type="password"
                name=""
                class="outline-none focus:outline-none px-4 py-3 bg-background text-sm w-full ring-0"
                id=""
                placeholder=" enter your password"
              />
            </div>
            <div>
              <p class="px-4 py-2 text-xs">gender</p>
              <div class="flex justify-between items-center">
                <div class="flex justify-start px-4 py-2 items-center">
                  <input
                    type="checkbox"
                    name=""
                    class="outline-none focus:outline-none bg-background text-sm w-full ring-0"
                    id=""
                  />
                  <p class="text-xs font-semibold px-2">male</p>
                </div>
                <div class="flex justify-start px-4 py-2 items-center">
                  <input
                    type="checkbox"
                    name=""
                    class="outline-none focus:outline-none bg-background text-sm w-full ring-0"
                    id=""
                  />
                  <p class="text-xs font-semibold px-2">female</p>
                </div>
              </div>
            </div>
            <div>
              <p class="px-4 py-2 text-xs">address</p>
              <textarea
                name=""
                id=""
                cols="5"
                rows="4"
                class="outline-none px-4 focus:outline-none bg-background text-sm w-full ring-0"
              ></textarea>
            </div>
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

const router = useRouter();
</script>
