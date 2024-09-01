import axios from "axios";
import { defineStore } from "pinia";

export const useCityStore = defineStore("city", {
  state: () => ({ cities: null, city: null, loading: false }),
  getters: {},
  actions: {
    async getSimpleListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/cities?limit=1000&page=1", {
          params: params,
        });
        this.cities = response.data;
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
      this.cities = response.data;
      this.loading = false;
      return response.data;
    },
    async getListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/cities", {
          params: params,
        });
        this.cities = response.data;
        this.loading = false;
        console.log(response);
        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async getSearchListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/cities", {
          params: params,
        });

        this.loading = false;
        console.log(response);
        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async getListHotelCityAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/hotel-cities", {
          params: params,
        });
        this.cities = response.data;
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
