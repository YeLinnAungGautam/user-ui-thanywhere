import axios from "axios";
import { defineStore } from "pinia";

export const useRestaurantStore = defineStore("restaurant", {
    state: () => ({ restaurants: null, restaurant: null, loading: false }),
    getters: {},
    actions: {
        async getSimpleListAction(params) {
            try {
                const response = await axios.get("/restaurants?limit=1000&page=1");
                this.restaurant = response.data;

                console.log(response);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async getChangePage(url, params) {
            this.loading = true;
            const response = await axios.get(url, {
                params: params,
            });
            this.restaurants = response.data;
            this.loading = false;
            return response.data;
        },
        async getListAction(params) {
            try {
                this.loading = true;
                const response = await axios.get("/restaurants", {
                    params: params,
                });
                this.restaurants = response.data;
                this.loading = false;
                console.log(response);
                return response.data;
            } catch (error) {
                this.loading = true;
                throw error;
            }
        },
        async addNewAction(data) {
            try {
                const response = await axios.post("/restaurants", data);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async updateAction(data, id) {
            try {
                const response = await axios.post("/restaurants/" + id, data);
                return response.data;
            } catch (error) {
                this.loading = true;
                throw error;
            }
        },
        async deleteAction(id) {
            try {
                const response = await axios.delete("/restaurants/" + id);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async deleteImageAction(id, imageID) {
            try {
                const response = await axios.delete(
                    "/restaurants/" + id + "/images/" + imageID
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async getDetailAction(id) {
            try {
                const response = await axios.get("/restaurants/" + id);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async toggleLoading() {
            this.loading = !this.loading;
        },
    },
});