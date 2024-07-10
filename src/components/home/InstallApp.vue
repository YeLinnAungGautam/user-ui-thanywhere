<!-- App.vue -->

<template>
  <div id="divInstallApp">
    <button
      v-if="showInstallButton"
      @click="installApp"
      class="btn btn-outline-secondary ms-1"
    >
      Install App
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInstallButton: true,
    };
  },
  mounted() {
    // Listen for beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      this.showInstallButton = true;

      // Handle installation when the button is clicked
      const installButton = document.getElementById("installApp");
      installButton.addEventListener("click", () => {
        event.prompt();
        this.showInstallButton = false;
      });
    });
  },
  methods: {
    installApp() {
      // Trigger installation
      const beforeInstallPromptEvent = new Event("beforeinstallprompt");
      window.dispatchEvent(beforeInstallPromptEvent);
    },
  },
};
</script>

<style>
/* Your component styles */
</style>
