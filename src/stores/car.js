import axios from "axios";
import { defineStore } from "pinia";

export const useCarStore = defineStore("car", {
  state: () => ({ cars: null, loading: false }),
  getters: {},
  actions: {
    async getSimpleListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/cars", params);
        this.cars = response.data;
        this.loading = false;

        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
  },
});
