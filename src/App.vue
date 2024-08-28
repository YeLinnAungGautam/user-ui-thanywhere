<template>
  <div class="font-poppins">
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style>
/* Slide transition effect */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.2s ease;
  /* You can also transition opacity if desired */
  opacity: 1;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
