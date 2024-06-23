import axios from "axios";
import { defineStore } from "pinia";

export const useHotelStore = defineStore("hotel", {
  state: () => ({ hotels: null, hotel: null, loading: false }),
  getters: {},
  actions: {
    async getSimpleListAction(params) {
      try {
        const response = await axios.get("/hotels?limit=1000&page=1", {
          params: params,
        });
        this.hotel = response.data;

        console.log(response);
        return response.data;
      } catch (error) {
        this.loading = true;
        throw error;
      }
    },
    async getChangePage(url, params) {
      this.loading = true;
      const response = await axios.get(url, {
        params: params,
      });
      this.hotels = response.data;
      this.loading = false;
      return response.data;
    },
    async getListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/hotels", {
          params: params,
        });
        this.hotels = response.data;
        this.loading = false;
        console.log(response);
        return response.data;
      } catch (error) {
        this.loading = true;
        throw error;
      }
    },
    async getFilterAction(params) {
      const response = await axios.get("/hotels", {
        params: params,
      });
      return response.data;
    },
    async getDetailAction(id) {
      const response = await axios.get("/hotels/" + id);
      return response.data;
    },
  },
});
