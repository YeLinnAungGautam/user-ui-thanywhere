<template>
  <div class="w-full mx-auto bg-white border-t border-black/10">
    <div class="max-w-md px-8 py-2 mx-auto justify-center items-center flex">
      <div class="flex justify-between items-center w-full">
        <router-link to="/home" class="space-y-1">
          <img
            :src="homeImage"
            alt=""
            class="w-5 h-5 mx-auto"
            v-if="!route.path.includes('home') || !route.name == 'Home'"
          />
          <img
            :src="homeFillImage"
            alt=""
            class="w-5 h-5 mx-auto"
            v-if="route.path.includes('home') || route.name == 'Home'"
          />
          <p
            class="text-[10px] font-medium"
            :class="
              route.name == 'Home' || route.path.includes('home')
                ? 'text-main'
                : 'text-black/80'
            "
          >
            home
          </p>
        </router-link>
        <router-link to="/search" class="space-y-1">
          <img
            :src="searchImage"
            alt=""
            class="w-5 h-5 mx-auto"
            v-if="route.name != 'HomeSearch'"
          />
          <img
            :src="searchFillImage"
            alt=""
            class="w-5 h-5 mx-auto"
            v-if="route.name == 'HomeSearch'"
          />
          <p
            class="text-[10px] font-medium"
            :class="route.name == 'HomeSearch' ? 'text-main' : 'text-black/80'"
          >
            search
          </p>
        </router-link>
        <router-link to="/home/booking/order/cart" class="space-y-1 relative">
          <p
            class="absolute -top-1 border border-white -right-3 bg-red text-[10px] w-4 h-4 flex justify-center items-center rounded-full text-white"
          >
            5
          </p>
          <img
            :src="cartImage"
            alt=""
            v-if="!route.path.includes('cart') || !route.name == 'Cart'"
            class="w-5 h-5 mx-auto"
          />
          <img
            :src="cartImageFill"
            alt=""
            class="w-5 h-5 mx-auto"
            v-if="route.path.includes('cart') || route.name == 'Cart'"
          />
          <p class="text-[10px] font-medium text-black/80">cart</p>
        </router-link>
        <div class="space-y-1">
          <img :src="tripsImage" alt="" class="w-5 h-5 mx-auto" />
          <p class="text-[10px] font-medium text-black/80">trips</p>
        </div>
        <!-- <div class="space-y-1">
          <img :src="profileImage" alt="" class="w-5 h-5 mx-auto" />
          <p class="text-[10px] font-medium text-black/80">account</p>
        </div> -->
        <div @click="goProfile" class="space-y-1">
          <img
            :src="profileImage"
            alt=""
            class="w-5 h-5 mx-auto"
            v-if="!route.path.includes('account') || !route.name == 'Account'"
          />
          <img
            :src="profileFillImage"
            alt=""
            class="w-5 h-5 mx-auto"
            v-if="route.path.includes('account') || route.name == 'Account'"
          />
          <p
            class="text-[10px] font-medium"
            :class="
              route.name == 'account' || route.path.includes('account')
                ? 'text-main'
                : 'text-black/80'
            "
          >
            account
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import homeImage from "../../assets/icons/Navigation bar icons/no filled icons/home icon no fill.svg";
import searchImage from "../../assets/icons/Navigation bar icons/no filled icons/seacrch icon no fill.svg";
import searchFillImage from "../../assets/icons/Navigation bar icons/filled icons/search icon filled.svg";
import tripsImage from "../../assets/icons/Navigation bar icons/no filled icons/trips icon no fill.svg";
// import wishlistsImage from "../../assets/icons/Navigation bar icons/no filled icons/wishlists icon no fill.svg";
import profileImage from "../../assets/icons/Navigation bar icons/no filled icons/profile icon no filled.svg";
import homeFillImage from "../../assets/icons/Navigation bar icons/filled icons/home icon filled.svg";
// import searchFillImage from "../../assets/icons/Navigation bar icons/filled icons/search icon filled.svg";
// import tripsFillImage from "../../assets/icons/Navigation bar icons/filled icons/trips icon filled.svg";
// import wishlistsFillImage from "../../assets/icons/Navigation bar icons/filled icons/wishlists icon filled.svg";
import profileFillImage from "../../assets/icons/Navigation bar icons/filled icons/profile icon filled.svg";
import cartImageFill from "@/assets/shopping-cart (2).png";
import cartImage from "@/assets/shopping-cart (1).png";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const authStore = useAuthStore();
const { user, token } = storeToRefs(authStore);
const route = useRoute();
const router = useRouter();

const goProfile = () => {
  if (token.value) {
    console.log("Going to profile");
    router.push("/account/profile");
  } else {
    console.log("Not logged in");
    router.push("/account/login");
  }
};

onMounted(async () => {
  await authStore.getAction();
  console.log("====================================");
  console.log(user.value, token.value);
  console.log("====================================");
});
</script>
