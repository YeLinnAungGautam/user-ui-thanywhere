import axios from "axios";
import { defineStore } from "pinia";

export const useEntranceStore = defineStore("entrance", {
    state: () => ({ entrances: null, entrance: null, loading: false }),
    getters: {},
    actions: {
        async getSimpleListAction(params) {
            const response = await axios.get("/entrance-tickets?limit=1000&page=1", {
                params: params,
            });
            this.entrance = response.data;

            return response.data;
        },
        async getChangePage(url, params) {
            this.loading = true;
            const response = await axios.get(url, {
                params: params,
            });
            this.entrances = response.data;
            this.loading = false;
            return response.data;
        },
        async getListAction(params) {
            try {
                this.loading = true;
                const response = await axios.get(
                    "/entrance-tickets?order_by=top_selling_products", {
                        params: params,
                    }
                );
                this.entrances = response.data;
                this.loading = false;
                console.log(response);
                return response.data;
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },
        async getFilterAction(params) {
            const response = await axios.get("/entrance-tickets", {
                params: params,
            });

            return response.data;
        },

        async getDetailAction(id) {
            const response = await axios.get("/entrance-tickets/" + id);
            return response.data;
        },
    },
});