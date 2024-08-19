<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-40" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <!-- <div class="mt-[20%] flex justify-end px-4 text-center">
          <p
            v-show="isOpen"
            class="bg-white px-2 shadow-xl rounded-full py-2"
            @click="closeModal"
          >
            <XMarkIcon class="w-5 h-5" />
          </p>
        </div> -->
        <div class="flex h-500 mt-[10%] justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <slot />
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
// import { XMarkIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["closeModal"]);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

function closeModal() {
  emit("closeModal");
}
function openModal() {
  isOpen.value = true;
}
</script>
