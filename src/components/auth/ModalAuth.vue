import { onMounted } from 'vue';
<!-- src/components/Modal.vue -->
<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <slot></slot>
      <!-- <iframe
        :src="iframeSrc"
        width="100%"
        height="500px"
        frameborder="0"
      ></iframe>
      <p>{{ iframeSrc }}</p> -->
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    iframeSrc: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 800px;
}
</style>
