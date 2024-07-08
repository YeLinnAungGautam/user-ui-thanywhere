import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
    state: () => ({ showOnboard: true, language: null }),
    getters: {},
    actions: {
        changeOnboard() {
            this.showOnboard = !this.showOnboard;
        },
        changeLanguage(lang) {
            localStorage.setItem("language", lang);
            this.language = lang;
        },
        getLanguage() {
            this.language = localStorage.getItem("language") || null;
        },
    },
});