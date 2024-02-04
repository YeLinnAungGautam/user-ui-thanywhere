import axios from "axios";
import { defineStore } from "pinia";

export const useHotelStore = defineStore("hotel", {
  state: () => ({ hotels: null, hotel: null, loading: false }),
  getters: {},
  actions: {
    async getSimpleListAction(params) {
      try {
        this.loading = true;

        const response = await axios.get(
          `/customer-portal/cities/${params.city_id}?product_type=hotel`,
          {
            params: params,
          }
        );
        this.hotel = response.data.result;
        this.loading = false;
        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async getChangePage(url, params) {
      this.loading = true;
      console.log(url);
      const response = await axios.get(url, {
        params: params,
      });
      this.hotel = response.data.result;
      this.loading = false;
      return response.data;
    },
    async getListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get(
          "/customer-portal?product_type=hotel",
          {
            params: params,
          }
        );
        this.hotels = response.data;
        this.loading = false;

        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },

    async getDetailAction(id) {
      try {
        const response = await axios.get(`/customer-portal/hotels/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async getRelateAction(id) {
      try {
        const response = await axios.get(
          `/customer-portal/hotels/${id}/related-tours`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
