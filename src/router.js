import { createRouter, createWebHistory } from "vue-router";
import LoginView from "./views/Login.vue";
import HomeView from "./views/Home.vue";
import AboutView from "./views/About.vue";
import BookingView from "./views/BookingDetail.vue";
import productVanView from "./views/Vantour.vue";
import productAttractionView from "./views/Attraction.vue";
import productGroupView from "./views/GroupTour.vue";
import productHotelView from "./views/Hotel.vue";
import AttractionsView from "./views/HomeAttraction.vue";
import HotelDetailView from "./views/HotelDetail.vue";
import productHotelSearchView from "./views/HotelSearch.vue";

const routes = [{
        path: "/login",
        name: "login",
        component: LoginView,
        meta: {
            guest: true,
        },
    },
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: {
            guest: true,
        },
    },
    {
        path: "/attractions",
        name: "attractions",
        component: AttractionsView,
        meta: {
            guest: true,
        },
    },
    {
        path: "/about",
        name: "about",
        component: AboutView,
        meta: {
            guest: true,
        },
    },
    {
        path: "/vantour-detail/:id",
        name: "vantour-detail",
        component: BookingView,
        meta: {
            guest: true,
        },
    },
    {
        path: "/hotel-detail/:id",
        name: "hotel-detail",
        component: HotelDetailView,
        meta: {
            guest: true,
        },
    },
    {
        path: "/product/van-tour/:id/:city",
        name: "product-van",
        component: productVanView,
        meta: {
            guest: true,
        },
    },
    {
        path: "/product/hotel/:id/:city",
        name: "product-hot-search",
        component: productHotelSearchView,
        meta: {
            guest: true,
        },
    },
    {
        path: "/product/attraction",
        name: "product-attraction",
        component: productAttractionView,
        meta: {
            guest: true,
        },
    },
    {
        path: "/product/grouptour",
        name: "product-group",
        component: productGroupView,
        meta: {
            guest: true,
        },
    },
    {
        path: "/product/hotel",
        name: "product-hotel",
        component: productHotelView,
        meta: {
            guest: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            // If the route has a hash, scroll to the element with that ID.
            return { selector: to.hash };
        } else {
            // Scroll to the top of the page.
            return { left: 0, top: 0 };
        }
    },
});

export default router;