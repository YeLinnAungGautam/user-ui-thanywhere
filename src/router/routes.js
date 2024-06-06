import Home from "../views/HomePage.vue";
import HotelBookingsVue from "../views/HotelBooking.vue";

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
];

export default routes;
