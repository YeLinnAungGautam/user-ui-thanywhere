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
      console.log(params);
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
    async addNewAction(data) {
      try {
        const response = await axios.post("/hotels", data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async updateAction(data, id) {
      try {
        const response = await axios.post("/hotels/" + id, data);
        return response.data;
      } catch (error) {
        this.loading = true;
        throw error;
      }
    },
    async deleteAction(id) {
      try {
        const response = await axios.delete("/hotels/" + id);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async deleteImageAction(id, imageID) {
      try {
        const response = await axios.delete(
          "/hotels/" + id + "/images/" + imageID
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async getDetailAction(id) {
      try {
        const response = await axios.get("/hotels/" + id);
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
