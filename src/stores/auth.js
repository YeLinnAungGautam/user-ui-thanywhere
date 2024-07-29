import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({ user: null, loading: false }),
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
    },
});