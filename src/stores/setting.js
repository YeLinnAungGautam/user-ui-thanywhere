import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => ({ showOnboard: true }),
  getters: {},
  actions: {
    changeOnboard() {
      this.showOnboard = !this.showOnboard;
    },
  },
});
