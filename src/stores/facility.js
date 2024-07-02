import axios from "axios";
import { defineStore } from "pinia";

export const useFacilityStore = defineStore("facility", {
  state: () => ({ facilities: null, facility: null, loading: false }),
  getters: {},
  actions: {
    async getSimpleListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/facilities?limit=1000&page=1", {
          params: params,
        });
        this.facilities = response.data;
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
      this.facilities = response.data;
      this.loading = false;
      return response.data;
    },
    async getListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/facilities", {
          params: params,
        });
        this.facilities = response.data;
        this.loading = false;
        console.log(response);
        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
  },
});
