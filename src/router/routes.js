import Home from "../views/HomePage.vue";
import HotelBookingsVue from "../views/HotelBooking.vue";
import FilteredHotelBookingsVue from "../views/FilterHotels.vue";
import HomeSearchVue from "../views/HomeSearchPage.vue";
import HomeVantourVue from "../views/VantourPage.vue";
import HomeHotelSearchVue from "../views/HotelSearchPage.vue";
import HomeVantourSearchVue from "../views/VantourSearchPage.vue";
import HomeVantourResultVue from "../views/VantourResultPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/home/hotel-bookings",
    name: "HotelBookings",
    component: HotelBookingsVue,
  },
  {
    path: "/home/hotel-filter",
    name: "FilteredHotelBookings",
    component: FilteredHotelBookingsVue,
  },
  {
    path: "/home/hotel-search",
    name: "HomeHotelSearch",
    component: HomeHotelSearchVue,
  },
  {
    path: "/home/search",
    name: "HomeSearch",
    component: HomeSearchVue,
  },
  {
    path: "/home/van-tour",
    name: "HomeVantour",
    component: HomeVantourVue,
  },
  {
    path: "/home/van-tour-search",
    name: "HomeVantourSearch",
    component: HomeVantourSearchVue,
  },
  {
    path: "/home/van-tour-result",
    name: "HomeVantourResult",
    component: HomeVantourResultVue,
  },
];

export default routes;
