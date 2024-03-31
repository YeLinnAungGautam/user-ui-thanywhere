import { createRouter, createWebHistory } from "vue-router";
import ProductView from "./views/Products.vue";
import VantoursPageView from "./views/VantourPage.vue";
import VantoursViewPageView from "./views/VantourViewPage.vue";
import HotelPageView from "./views/HotelPage.vue";
import HotelViewPageView from "./views/HotelViewPage.vue";
import RoomPageView from "./views/Room.vue";
import RoomViewPageView from "./views/RoomViewPage.vue";
import AttractionPageView from "./views/EntrancePage.vue";
import AttractionViewPageView from "./views/EntranceViewPage.vue";
import VariationPageView from "./views/AttractionVariable.vue";
import GroupTourView from "./views/GrouptourPage.vue";
import AirlineViewPageView from "./views/AirLineViewPage.vue";
import AirlinePageView from "./views/AirLinePage.vue";
import TicketPageView from "./views/AirlineTicket.vue";
import RestaurantPageView from "./views/RestaurantPage.vue";
import RestaurantViewPageView from "./views/RestaurantViewPage.vue";
import MealPageView from "./views/MealPage.vue";

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
    {
        path: "/products/attraction",
        name: "attraction",
        component: AttractionPageView,
    },
    {
        path: "/products/attraction/view/:id",
        name: "attraction-view",
        component: AttractionViewPageView,
    },
    {
        path: "/products/attraction/variations/:id/:name",
        name: "variations",
        component: VariationPageView,
    },
    {
        path: "/products/grouptour",
        name: "grouptour",
        component: GroupTourView,
    },
    {
        path: "/products/airline",
        name: "airline",
        component: AirlinePageView,
    },
    {
        path: "/products/airline/view/:id",
        name: "airline-view",
        component: AirlineViewPageView,
    },
    {
        path: "/products/airline/ticket/:id/:name",
        name: "ticket",
        component: TicketPageView,
    },
    {
        path: "/restaurants",
        name: "restaurant",
        component: RestaurantPageView,
    },
    {
        path: "/restaurants/view/:id",
        name: "restaurant-view",
        component: RestaurantViewPageView,
    },
    {
        path: "/products/restaurant/meal/:id/:name",
        name: "meal",
        component: MealPageView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;