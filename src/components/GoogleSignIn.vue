<template>
  <div>
    <button class="bg-gray text-main px-4 py-2" type="button" @click="login">
      login
    </button>
  </div>
</template>

<script>
export default {
  name: "LoginWithGoogle",

  computed: {
    // googleAuth: () => window.config.googleAuth, // Check if Google Auth is enabled
    url: () => "/api/oauth/google", // URL for Google OAuth
  },

  mounted() {
    window.addEventListener("message", this.onMessage, false);
  },

  methods: {
    async login() {
      const newWindow = this.openWindow("");

      const url = await this.$store.dispatch("auth/fetchOauthUrl", {
        provider: "google",
      });
      newWindow.location.href = url;
    },

    /**
     * @param {MessageEvent} e
     */
    onMessage(e) {
      if (e.origin !== window.origin || !e.data.token) {
        return;
      }

      this.$store.dispatch("auth/saveToken", {
        token: e.data.token,
      });
      this.$router.push({ name: "home" });
    },

    /**
     * @param {string} url
     * @param {string} title
     * @param {object} options
     * @return {Window}
     */
    openWindow(url, title, options = {}) {
      if (typeof url === "object") {
        options = url;
        url = "";
      }

      options = { url, title, width: 600, height: 720, ...options };

      const dualScreenLeft =
        window.screenLeft !== undefined
          ? window.screenLeft
          : window.screen.left;
      const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : window.screen.top;

      const width = options.width ? options.width : window.innerWidth;
      const height = options.height ? options.height : window.innerHeight;

      options.left = width / 2 - options.width / 2 + dualScreenLeft;
      options.top = height / 2 - options.height / 2 + dualScreenTop;

      const optionsStr = Object.keys(options)
        .reduce((acc, key) => {
          acc.push(`${key}=${options[key]}`);
          return acc;
        }, [])
        .join(",");

      const newWindow = window.open(url, title, optionsStr);

      if (window.focus) {
        newWindow.focus();
      }

      return newWindow;
    },
  },
};
</script>

<style scoped></style>
