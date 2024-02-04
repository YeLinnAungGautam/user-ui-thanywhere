import axios from "axios";
import { defineStore } from "pinia";

export const useCityStore = defineStore("city", {
    state: () => ({ cities: null, city: null, loading: false }),
    getters: {},
    actions: {
        async getSimpleListAction(params) {
            try {
                this.loading = true;
                const response = await axios.get("/customer-portal/cities?limit=10", {
                    params,
                });
                this.city = response.data;
                this.loading = false;

                return response.data;
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },
        async getChangePage(url) {
            this.loading = true;
            const response = await axios.get(url);
            this.city = response.data;
            this.loading = false;
            return response.data;
        },
    },
});