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
        localStorage.setItem("thany_token", this.token);
        return response.data;
      } catch (error) {
        this.loading = false;
        this.user = null;
        this.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("thany_token");
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
      this.token = localStorage.getItem("thany_token");
      if (this.token) {
        let userget = localStorage.getItem("user");
        if (!userget) {
          try {
            let res = await fetch("https://api-blog.thanywhere.com/api/user", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`, // Include the token in the Authorization header
              },
            });

            if (!res.ok) {
              throw new Error("Network response was not ok");
            }

            let data = await res.json(); // Await the parsing of the JSON
            console.log("====================================");
            console.log(data, "this is get");
            console.log("====================================");

            localStorage.setItem("user", JSON.stringify(data));
            this.user = data;
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        } else {
          this.user = JSON.parse(userget);
        }
      } else {
        this.loading = false;
        return "fail";
      }
      this.loading = false;
      return "finish";
    },

    async logoutAction() {
      this.loading = true;
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("thany_token");
      this.loading = false;
      return "finish";
    },
    async googleSignToken(token) {
      this.loading = true;
      this.token = token;
      localStorage.setItem("thany_token", this.token);
      this.loading = false;
      return "finish";
    },
  },
});
