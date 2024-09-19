<template>
  <transition
    name="slide-modal"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
      <div
        class="modal-content border border-black/10 shadow-custom"
        @click.stop
      >
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const { modelValue } = toRefs(props);
const isVisible = modelValue;

const closeModal = () => {
  emit("update:modelValue", false);
};

const beforeEnter = (el) => {
  el.style.transform = "translateX(100%)";
  el.style.opacity = 0;
};

const enter = (el, done) => {
  const duration = 500;
  el.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
  setTimeout(() => {
    el.style.transform = "translateX(0%)";
    el.style.opacity = 1;
    done();
  }, 0);
};

const leave = (el, done) => {
  const duration = 500;
  el.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
  setTimeout(() => {
    el.style.transform = "translateX(100%)";
    el.style.opacity = 0;
    done();
  }, 0);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: transparent;
  display: flex;
  justify-content: end;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: rgba(255, 250, 248, 0.951);
  padding: 16px;
  border-radius: 14px 0px 0px 14px;
  width: 180px;
}

.slide-modal-enter-active,
.slide-modal-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-modal-enter,
.slide-modal-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
