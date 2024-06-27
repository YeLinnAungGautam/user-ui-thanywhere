<template>
  <div class="w-full mx-auto bg-white">
    <div class="max-w-md px-4 py-2 mx-auto justify-center items-center flex">
      <div class="flex justify-between items-center w-full">
        <router-link to="/home" class="space-y-1">
          <img
            :src="homeImage"
            alt=""
            class="w-5 h-5 mx-auto"
            v-if="!route.path.includes('home') && !route.name == 'Home'"
          />
          <img
            :src="homeFillImage"
            alt=""
            class="w-5 h-5 mx-auto"
            v-if="route.path.includes('home') || route.name == 'Home'"
          />
          <p
            class="text-xs"
            :class="
              route.name == 'Home' || route.path.includes('home')
                ? 'text-main'
                : 'text-black/90'
            "
          >
            home
          </p>
        </router-link>
        <div class="space-y-1">
          <img :src="searchImage" alt="" class="w-5 h-5 mx-auto" />
          <p class="text-xs text-black/90">search</p>
        </div>
        <div class="space-y-1">
          <img :src="wishlistsImage" alt="" class="w-5 h-5 mx-auto" />
          <p class="text-xs text-black/90">wishlists</p>
        </div>
        <div class="space-y-1">
          <img :src="tripsImage" alt="" class="w-5 h-5 mx-auto" />
          <p class="text-xs text-black/90">trips</p>
        </div>
        <div class="space-y-1">
          <img :src="profileImage" alt="" class="w-5 h-5 mx-auto" />
          <p class="text-xs text-black/90">account</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import homeImage from "../../assets/icons/Navigation bar icons/no filled icons/home icon no fill.svg";
import searchImage from "../../assets/icons/Navigation bar icons/no filled icons/seacrch icon no fill.svg";
import tripsImage from "../../assets/icons/Navigation bar icons/no filled icons/trips icon no fill.svg";
import wishlistsImage from "../../assets/icons/Navigation bar icons/no filled icons/wishlists icon no fill.svg";
import profileImage from "../../assets/icons/Navigation bar icons/no filled icons/profile icon no filled.svg";
import homeFillImage from "../../assets/icons/Navigation bar icons/filled icons/home icon filled.svg";
// import searchFillImage from "../../assets/icons/Navigation bar icons/filled icons/search icon filled.svg";
// import tripsFillImage from "../../assets/icons/Navigation bar icons/filled icons/trips icon filled.svg";
// import wishlistsFillImage from "../../assets/icons/Navigation bar icons/filled icons/wishlists icon filled.svg";
// import profileFillImage from "../../assets/icons/Navigation bar icons/filled icons/profile icon filled.svg";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
