<template>
  <div>
    <main>
      <div class="bg-image">
        <div
          class="main-content bg-opacity-50 backdrop-filter backdrop-blur-xl font-poppins"
        >
          <LayoutVue>
            <router-view v-slot="{ Component }">
              <transition
                name="fade"
                mode="out-in"
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
              >
                <component :is="Component" />
              </transition>
            </router-view>
          </LayoutVue>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import LayoutVue from "./components/Layout/Layout.vue";
</script>
