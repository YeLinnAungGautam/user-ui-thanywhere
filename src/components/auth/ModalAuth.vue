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
      ></iframe> -->
      <pre>{{ jsonData }}</pre>
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
      required: true,
      default: "",
    },
  },
  data() {
    return {
      jsonData: null,
    };
  },
  watch: {
    iframeSrc: {
      immediate: true,
      handler(newVal) {
        this.extractJsonFromUrl(newVal);
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    extractJsonFromUrl(url) {
      try {
        const urlObj = new URL(url);
        // Example: Assuming JSON is in a parameter called 'json'
        const jsonString = urlObj.searchParams.get("json");
        if (jsonString) {
          this.jsonData = JSON.parse(decodeURIComponent(jsonString));
        } else {
          // Fetch from the server if not present in the URL directly
          this.fetchJsonData(url);
        }
      } catch (error) {
        console.error("Error parsing JSON from URL:", error);
      }
    },
    async fetchJsonData(url) {
      try {
        const response = await fetch(url);
        this.jsonData = await response.json();
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: -50px;
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
