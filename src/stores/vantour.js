import axios from "axios";
import { defineStore } from "pinia";

export const useVantourStore = defineStore("vantour", {
  state: () => ({ vantours: null, vantour: null, loading: false }),
  getters: {},
  actions: {
    async getSimpleListAction(params) {
      const response = await axios.get("/private-van-tours?limit=1000&page=1", {
        params: params,
      });
      this.vantour = response.data;

      return response.data;
    },
    async getChangePage(url, params) {
      this.loading = true;
      const response = await axios.get(url, {
        params: params,
      });
      this.vantours = response.data;
      this.loading = false;
      return response.data;
    },
    async getListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/private-van-tours", {
          params: params,
        });
        this.vantours = response.data;
        this.loading = false;
        console.log(response);
        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async getFilterAction(params) {
      const response = await axios.get("/private-van-tours", {
        params: params,
      });

      return response.data;
    },
    async getDetailAction(id) {
      const response = await axios.get("/private-van-tours/" + id);
      return response.data;
    },
  },
});
