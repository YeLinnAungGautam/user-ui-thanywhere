import axios from "axios";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
    state: () => ({ categories: null, loading: false }),
    getters: {},
    actions: {
        async getSimpleListAction(params) {
            try {
                this.loading = true;
                const response = await axios.get(
                    "/customer-portal/product-categories?limit=10", {
                        params,
                    }
                );
                this.categories = response.data;
                this.loading = false;

                return response.data;
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },
    },
});