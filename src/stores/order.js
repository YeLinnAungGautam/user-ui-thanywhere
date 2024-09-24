import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({ orders: [] }),
  getters: {},
  actions: {
    async getOrders() {
      const orders = localStorage.getItem("orders");
      this.orders = orders ? JSON.parse(orders) : [];
    },

    async addOrders(data) {
      if (data) {
        this.orders.push(data);
        localStorage.setItem("orders", JSON.stringify(this.orders));
        return "success";
      }
    },
  },
});
