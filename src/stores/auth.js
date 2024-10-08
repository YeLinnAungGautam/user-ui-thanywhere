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

                return response; // Return the parsed data
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
                try {
                    let res = await axios.get("https://api-blog.thanywhere.com/api/me", {
                        headers: {
                            Authorization: `Bearer ${this.token}`, // Include the token here
                        },
                    });
                    console.log("====================================");
                    console.log(res, "this is res");
                    console.log("====================================");
                    // this.user = data;
                    localStorage.setItem("user", JSON.stringify(res.data.result.user));
                    this.user = res.data.result.user;
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            } else {
                this.loading = false;
                return "fail";
            }
            this.loading = false;
            return "finish";
        },

        async updateUserInfoAction(params) {
            this.loading = true;
            const res = await axios.post(
                "https://api-blog.thanywhere.com/api/profile",
                params
            );
            this.loading = false;
            return res;
        },

        async logoutAction() {
            this.loading = true;
            const res = await axios.post(
                "https://api-blog.thanywhere.com/api/logout"
            );
            console.log("====================================");
            console.log(res, "this is logout");
            console.log("====================================");
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