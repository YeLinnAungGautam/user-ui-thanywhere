import Home from "../views/HomePage.vue";
import HotelBookingsVue from "../views/HotelBooking.vue";
import FilteredHotelBookingsVue from "../views/FilterHotels.vue";
import HomeSearchVue from "../views/HomeSearchPage.vue";
import HomeVantourVue from "../views/VantourPage.vue";
import HomeHotelSearchVue from "../views/HotelSearchPage.vue";
import HomeVantourSearchVue from "../views/VantourSearchPage.vue";
import HomeVantourResultVue from "../views/VantourResultPage.vue";
import HomeAttractionVue from "../views/AttractionPage.vue";
import HomeInclusiveVue from "../views/InclusivePage.vue";
import HomeAirLineVue from "../views/AirLinePage.vue";
import HomeDestinationVue from "../views/DestinationPage.vue";
import HomeAttractionSearchVue from "../views/AttractionSearchPage.vue";
import HomeAttractionResultVue from "../views/AttractionResultPage.vue";
import HomeInclusiveSearchVue from "../views/InclusiveSearchPage.vue";
import HomeInclusiveResultVue from "../views/InclusiveResultPage.vue";
import HomeAirLineSearchVue from "../views/AirLineSearchPage.vue";
import HomeAirLineResultVue from "../views/AirLineResultPage.vue";
import HomeDestinationSearchVue from "../views/DestinationSearchPage.vue";
import HomeDestinationResultVue from "../views/DestinationResultPage.vue";
import HomeDetailVue from "../views/HomeDetailPage.vue";
import HomeRoomDetailVue from "../views/RoomDetailPage.vue";

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
    path: "/home/hotel-filter/:id/:name/:price",
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
    path: "/home/detail/:id",
    name: "HomeDetail",
    component: HomeDetailVue,
  },
  {
    path: "/home/detail/room/:id",
    name: "HomeRoomDetail",
    component: HomeRoomDetailVue,
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
  {
    path: "/home/attraction",
    name: "HomeAttraction",
    component: HomeAttractionVue,
  },
  {
    path: "/home/attraction-search",
    name: "HomeAttractionSearch",
    component: HomeAttractionSearchVue,
  },
  {
    path: "/home/attraction-result",
    name: "HomeAttractionResult",
    component: HomeAttractionResultVue,
  },
  {
    path: "/home/inclusive",
    name: "HomeInclusive",
    component: HomeInclusiveVue,
  },
  {
    path: "/home/inclusive-search",
    name: "HomeInclusiveSearch",
    component: HomeInclusiveSearchVue,
  },
  {
    path: "/home/inclusive-result",
    name: "HomeInclusiveResult",
    component: HomeInclusiveResultVue,
  },
  {
    path: "/home/airline",
    name: "HomeAirLine",
    component: HomeAirLineVue,
  },
  {
    path: "/home/airline-search",
    name: "HomeAirLineSearch",
    component: HomeAirLineSearchVue,
  },
  {
    path: "/home/airline-result",
    name: "HomeAirLineResult",
    component: HomeAirLineResultVue,
  },
  {
    path: "/home/destination",
    name: "HomeDestination",
    component: HomeDestinationVue,
  },
  {
    path: "/home/destination-search",
    name: "HomeDestinationSearch",
    component: HomeDestinationSearchVue,
  },
  {
    path: "/home/destination-result",
    name: "HomeDestinationResult",
    component: HomeDestinationResultVue,
  },
];

export default routes;