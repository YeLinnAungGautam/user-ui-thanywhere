import { createRouter, createWebHistory } from "vue-router";
import ProductView from "./views/Products.vue";
import VantoursPageView from "./views/VantourPage.vue";
import VantoursViewPageView from "./views/VantourViewPage.vue";
import HotelPageView from "./views/HotelPage.vue";
import HotelViewPageView from "./views/HotelViewPage.vue";
import RoomPageView from "./views/Room.vue";
import RoomViewPageView from "./views/RoomViewPage.vue";

const routes = [{
        path: "/",
        name: "products",
        component: ProductView,
    },
    {
        path: "/products/vantours",
        name: "vantours",
        component: VantoursPageView,
    },
    {
        path: "/products/vantours/view/:id",
        name: "vantours-view",
        component: VantoursViewPageView,
    },
    {
        path: "/products/hotels",
        name: "hotels",
        component: HotelPageView,
    },
    {
        path: "/products/hotels/view/:id",
        name: "hotel_view",
        component: HotelViewPageView,
    },
    {
        path: "/products/hotels/room/:id/:name",
        name: "room",
        component: RoomPageView,
    },
    {
        path: "/products/hotels/room/view/:id",
        name: "room_view",
        component: RoomViewPageView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;