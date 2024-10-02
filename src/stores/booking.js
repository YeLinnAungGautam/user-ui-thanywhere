import axios from "axios";
import { defineStore } from "pinia";

export const useBookingStore = defineStore("booking", {
    state: () => ({ bookings: null, loading: false }),
    getters: {},
    actions: {
        async getListAction(params) {
            try {
                this.loading = true;
                const response = await axios.get("/bookings", params);
                this.bookings = response.data;
                this.loading = false;

                return response.data;
            } catch (error) {
                this.loading = false;
                throw error;
            }
        },
    },
});