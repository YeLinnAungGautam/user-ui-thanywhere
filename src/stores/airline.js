import axios from "axios";
import { defineStore } from "pinia";

export const useAirLineStore = defineStore("airline", {
  state: () => ({ airlines: null, airline: null, loading: false }),
  getters: {},
  actions: {
    async getSimpleListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/airlines?limit=1000&page=1");
        this.airline = response.data;
        this.loading = false;

        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async getChangePage(url, params) {
      this.loading = true;
      const response = await axios.get(url, {
        params: params,
      });
      this.airlines = response.data;
      this.loading = false;
      return response.data;
    },
    async getListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/airlines", {
          params: params,
        });
        this.airlines = response.data;
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
        const response = await axios.post("/airlines", data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async getDetailAction(id) {
      try {
        const response = await axios.get("/airlines/" + id);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async updateAction(data, id) {
      try {
        const response = await axios.post("/airlines/" + id, data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async deleteAction(id) {
      try {
        const response = await axios.delete("/airlines/" + id);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
