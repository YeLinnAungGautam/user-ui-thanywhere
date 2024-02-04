import axios from "axios";
import { defineStore } from "pinia";

export const useVantourStore = defineStore("vantour", {
    state: () => ({ vantours: null, vantour: null, loading: false }),
    getters: {},
    actions: {
        async getSimpleListAction(params) {
            try {
                this.loading = true;

                const response = await axios.get(
                    `/customer-portal/cities/${params.city_id}?product_type=private_van_tour`, {
                        params: params,
                    }
                );
                this.vantour = response.data.result;
                this.loading = false;
                return response.data;
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },
        async getChangePage(url, params) {
            this.loading = true;
            // console.log(url);
            const response = await axios.get(url, {
                params: params,
            });
            this.vantour = response.data.result;
            this.loading = false;
            return response.data;
        },
        async getListAction(params) {
            try {
                this.loading = true;
                const response = await axios.get(
                    "/customer-portal?product_type=private_van_tour", {
                        params: params,
                    }
                );
                this.vantours = response.data;
                this.loading = false;

                return response.data;
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },

        async getDetailAction(id) {
            try {
                const response = await axios.get(
                    `/customer-portal/private-van-tours/${id}`
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        async getRelateAction(id) {
            try {
                const response = await axios.get(
                    `/customer-portal/private-van-tours/${id}/related-tours`
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    },
});