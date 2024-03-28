<script setup>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
const route = useRoute();

// const currentUsage = ref(false);
</script>

<template>
  <div class="relative">
    <div>
      <div
        class="flex justify-start items-center text-xs font-semibold gap-3 px-4 py-2 overflow-x-scroll scroll-container"
      >
        <router-link
          to="/"
          class="cursor-pointer group hover:text-main whitespace-nowrap text-black/60 p-3 rounded-full"
          :class="route.path == '/' ? 'text-main' : ''"
        >
          Van Tours
          <p
            :class="route.path == '/' ? 'block' : 'hidden'"
            class="group-hover:block w-1 h-1 mx-auto mt-1 bg-main rounded-full"
          ></p>
        </router-link>
        <router-link
          to="/product/hotel"
          class="cursor-pointer group hover:text-main whitespace-nowrap text-black/60 p-3 rounded-full"
          :class="route.path == '/product/hotel' ? 'text-main' : ''"
        >
          Hotels
          <p
            :class="route.path == '/product/hotel' ? 'block' : 'hidden'"
            class="group-hover:block w-1 h-1 mx-auto mt-1 bg-main rounded-full"
          ></p>
        </router-link>
        <div
          class="cursor-pointer group hover:text-main whitespace-nowrap text-black/60 p-3 rounded-full"
        >
          Attractions
        </div>

        <router-link
          to="/product/van-tour"
          active-class="bg-black/5"
          class="cursor-pointer hover:text-main whitespace-nowrap text-black/60 p-3 rounded-full"
        >
          Hassle Free Tours
        </router-link>

        <router-link
          to="/product/grouptour"
          active-class="bg-black/5"
          class="cursor-pointer hover:text-main whitespace-nowrap text-black/60 p-3 rounded-full"
        >
          Group Tours
        </router-link>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
