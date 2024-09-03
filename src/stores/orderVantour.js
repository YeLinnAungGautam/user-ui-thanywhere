import { defineStore } from "pinia";

export const useOrderVantourStore = defineStore("orderVantour", {
  state: () => ({
    pickup_date: null,
    checkin_date: null,
    checkout_date: null,
    room_qty: null,
  }),
  getters: {},
  actions: {
    changeStoreData(data) {
      console.log(data);
      if (data.pickup_date) {
        this.pickup_date = data.pickup_date;
        localStorage.setItem("pickup_date", JSON.stringify(data.pickup_date));
      }

      return "success";
    },
    changeHotelStoreData(data) {
      console.log(data);
      if (data.checkin_date) {
        this.checkin_date = data.checkin_date;
        localStorage.setItem("checkin_date", JSON.stringify(data.checkin_date));
      }
      if (data.checkout_date) {
        this.checkout_date = data.checkout_date;
        localStorage.setItem(
          "checkout_date",
          JSON.stringify(data.checkout_date)
        );
      }
      if (data.room_qty) {
        this.room_qty = data.room_qty;
        localStorage.setItem("room_qty", JSON.stringify(data.room_qty));
      }

      return "success";
    },
    getHotelData() {
      let checkin_date = JSON.parse(localStorage.getItem("checkin_date"));
      this.checkin_date = checkin_date;
      let checkout_date = JSON.parse(localStorage.getItem("checkout_date"));
      this.checkout_date = checkout_date;
      let room_qty = JSON.parse(localStorage.getItem("room_qty"));
      this.room_qty = room_qty;
    },
    getVantourData() {
      // let pickup_date = localStorage.getItem("pickup_date");
      let pickup_date = JSON.parse(localStorage.getItem("pickup_date"));
      this.pickup_date = pickup_date;
    },
    removeVantourData() {
      this.pickup_date = null;
      localStorage.removeItem("pickup_date");
      return "removed success";
    },
    removeHotelData() {
      this.checkin_date = null;
      localStorage.removeItem("checkin_date");
      this.checkout_date = null;
      localStorage.removeItem("checkout_date");
      this.room_qty = null;
      localStorage.removeItem("room_qty");
      return "removed success";
    },
  },
});
