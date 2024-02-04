import axios from "axios";
import { defineStore } from "pinia";

export const useDestinationStore = defineStore("destination", {
  state: () => ({ dests: null, loading: false }),
  getters: {},
  actions: {
    async getSimpleListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/customer-portal/destinations");
        this.dests = response.data;
        this.loading = false;

        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
  },
});
