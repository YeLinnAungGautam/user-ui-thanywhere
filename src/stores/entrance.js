import axios from "axios";
import { defineStore } from "pinia";

export const useEntranceStore = defineStore("entrance", {
    state: () => ({ entrances: null, entrance: null, loading: false }),
    getters: {},
    actions: {
        async getSimpleListAction(params) {
            try {
                const response = await axios.get("/entrance-tickets?limit=1000&page=1");
                this.entrance = response.data;

                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async getChangePage(url, params) {
            this.loading = true;
            const urlSearchParams = new URLSearchParams(new URL(url).search);
            const pageValue = urlSearchParams.get("page");
            const response = await axios.get(
                "/entrance-tickets?limit=10&page=" + pageValue, {
                    params: params,
                }
            );
            this.entrances = response.data;
            this.loading = false;
            return response.data;
        },
        async getListAction(params) {
            try {
                this.loading = true;
                const response = await axios.get("/entrance-tickets", {
                    params: params,
                });
                this.entrances = response.data;
                this.loading = false;
                console.log(response);
                return response.data;
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },
        async addNewAction(data) {
            try {
                const response = await axios.post("/entrance-tickets", data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        async getDetailAction(id) {
            try {
                const response = await axios.get("/entrance-tickets/" + id);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async updateAction(data, id) {
            try {
                const response = await axios.post("/entrance-tickets/" + id, data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async deleteAction(id) {
            try {
                const response = await axios.delete("/entrance-tickets/" + id);
                console.log(response.data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    },
});