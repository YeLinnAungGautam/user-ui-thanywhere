import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: null, token: null, loading: false }),
  getters: {},
  actions: {
    async getGoogleLink() {
      try {
        this.loading = true;
        const response = await axios.post(
          "https://api-blog.thanywhere.com/api/oauth/google/redirect"
        );
        this.loading = false;

        return response;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async loginAction(params) {
      try {
        this.loading = true;
        const response = await axios.post("login", params);
        console.log(response.data, "this is response");
        this.user = response.data.data.user;
        this.token = response.data.data.token;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("token", this.token);
        return response.data;
      } catch (error) {
        this.loading = false;
        this.user = null;
        this.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async registerAction(params) {
      try {
        this.loading = true;
        const response = await axios.post("register", params);
        console.log(response.data, "this is registered");
        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async getAction() {
      this.loading = true;
      let userget = localStorage.getItem("user");
      this.user = JSON.parse(userget);
      //   console.log(this.user.name, "this is get");
      this.token = localStorage.getItem("token");
      this.loading = false;
      return "finish";
    },
    async logoutAction() {
      this.loading = true;
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.loading = false;
      return "finish";
    },
  },
});
