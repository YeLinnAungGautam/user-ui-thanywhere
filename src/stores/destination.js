import axios from "axios";
import { defineStore } from "pinia";

export const useDestinationStore = defineStore("destination", {
    state: () => ({ dests: null, loading: false }),
    getters: {},
    actions: {
        async getSimpleListAction(params) {
            try {
                this.loading = true;
                const response = await axios.get("/destinations?limit=1000&page=1", {
                    params: params,
                });
                this.dests = response.data;
                this.loading = false;

                return response.data;
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },
        async getChangePage(url, params) {
            this.loading = true;
            const response = await axios.get(url, { params: params });
            this.dests = response.data;
            this.loading = false;
            return response.data;
        },
        async getListAction(params) {
            try {
                this.loading = true;
                const response = await axios.get("/destinations", {
                    params: params,
                });
                this.dests = response.data;
                this.loading = false;
                console.log(response);
                return response.data;
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },
        async getFilterAction(params) {
            const response = await axios.get("/destinations", {
                params: params,
            });

            return response.data;
        },
        async getRelativeTour(id) {
            const response = await axios.get(
                "/destinations/" + id + "/related-tours"
            );

            return response.data;
        },
        async getDetailAction(id) {
            const response = await axios.get("/destinations/" + id);

            return response.data;
        },
    },
});