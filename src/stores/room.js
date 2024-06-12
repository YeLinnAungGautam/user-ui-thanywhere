import axios from "axios";
import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", {
  state: () => ({ rooms: null, loading: false }),
  getters: {},
  actions: {
    async getSimpleListAction(params) {
      const response = await axios.get("/rooms?limit=1000&page=1", {
        params: params,
      });
      this.rooms = response.data;

      return response.data;
    },
    async getChangePage(url, params) {
      this.loading = true;
      const response = await axios.get(url, {
        params: params,
      });
      this.rooms = response.data;
      this.loading = false;
      return response.data;
    },
    async getListAction(params) {
      try {
        this.loading = true;
        const response = await axios.get("/rooms", {
          params: params,
        });
        this.rooms = response.data;
        this.loading = false;
        console.log(response);
        return response.data;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async getDetailAction(id) {
      const response = await axios.get("/rooms/" + id);
      return response.data;
    },
  },
});
