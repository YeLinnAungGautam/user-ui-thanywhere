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
import HomeDestinationDetailVue from "../views/DestinationDetailPage.vue";
import HomeDestinationResultVue from "../views/DestinationResultPage.vue";
import HomeDetailVue from "../views/HomeDetailPage.vue";
import HomeRoomDetailVue from "../views/RoomDetailPage.vue";
import HomeAttractionDetailVue from "../views/EntranceDetailPage.vue";
import HomeVantourDetailVue from "../views/VantourDetailPage.vue";
// import OnboardingPage from "../views/OnboardingHomePage.vue";
import WebVersionHomePage from "../views/WebHomePage.vue";
import LoginVuePage from "../views/LoginPage.vue";
import ProfileVuePage from "../views/ProfilePage.vue";
import SignUpVuePage from "../views/SignUpPage.vue";
import TranslationPage from "../views/TranslationPage.vue";
import ProfileUpdateVuePage from "../views/UpdateUserInfo.vue";
import HomeCartPageVue from "../views/CartPage.vue";
import HomeCompletePageVue from "../views/CompleteBooking.vue";
import HomePaymentBookingPageVue from "../views/PaymentBooking.vue";
import ImagesGalleryVue from "../views/ImagesGallery.vue";
// import VantourPickupVue from "../views/FAQs/PickupPage.vue";
// import VantourBookTourVue from "../views/FAQs/BookTourPage.vue";
// import VantourMakePaymentVue from "../views/FAQs/MakePayment.vue";
// import VantourConformationVue from "../views/FAQs/ConfimationPage.vue";
// import VantourHomeSearchVue from "../components/search-part/VantourSearchCityHome.vue";
import PrivacyPolicyPage from "../views/PrivacyPolicy.vue";
import TripPage from "../views/TripPage.vue";
const routes = [
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicyPage,
  },
  {
    path: "/web",
    name: "WebVersionHomePage",
    component: WebVersionHomePage,
    meta: {
      guest: true,
    },
  },
  {
    path: "/translationPage",
    name: "TranslationPage",
    component: TranslationPage,
  },
  {
    path: "/account/login",
    name: "LoginVuePage",
    component: LoginVuePage,
  },
  {
    path: "/account/profile",
    name: "ProfileVuePage",
    component: ProfileVuePage,
  },
  {
    path: "/account/profile/update",
    name: "ProfileUpdateVuePage",
    component: ProfileUpdateVuePage,
  },
  {
    path: "/account/signup",
    name: "SignUpVuePage",
    component: SignUpVuePage,
  },
  {
    path: "/",
    name: "HomeDefault",
    component: Home,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },

  {
    path: "/home/hotel-bookings",
    name: "HotelBookings",
    component: HotelBookingsVue,
  },
  {
    path: "/home/hotel-filter/:id/:name/",
    name: "FilteredHotelBookings",
    component: FilteredHotelBookingsVue,
  },
  {
    path: "/home/hotel-search",
    name: "HomeHotelSearch",
    component: HomeHotelSearchVue,
  },
  {
    path: "/search",
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
    path: "/home/van-tour-result/:id/:name",
    name: "HomeVantourResult",
    component: HomeVantourResultVue,
  },
  {
    path: "/home/van-tour-detail/:id",
    name: "HomeVantourDetail",
    component: HomeVantourDetailVue,
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
    path: "/home/attraction-result/:id/:name",
    name: "HomeAttractionResult",
    component: HomeAttractionResultVue,
  },
  {
    path: "/home/attraction-detail/:id",
    name: "HomeAttractionDetail",
    component: HomeAttractionDetailVue,
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
    path: "/home/destination-detail/:id",
    name: "HomeDestinationDetail",
    component: HomeDestinationDetailVue,
  },
  {
    path: "/home/destination-result/:id/:name",
    name: "HomeDestinationResult",
    component: HomeDestinationResultVue,
  },
  {
    path: "/home/booking/order/cart",
    name: "HomeCartPage",
    component: HomeCartPageVue,
  },
  {
    path: "/home/booking/order/cart/complete",
    name: "HomeCompletePage",
    component: HomeCompletePageVue,
  },
  {
    path: "/home/booking/order/cart/complete/payment",
    name: "HomePaymentBookingPage",
    component: HomePaymentBookingPageVue,
  },
  {
    path: "/booking/part/trip",
    name: "TripPage",
    component: TripPage,
  },
  {
    path: "/home/packages/detail/images-gallery",
    name: "ImagesGallery",
    component: ImagesGalleryVue,
  },
  // {
  //   path: "/home/van-tour-detail/pages/pickup",
  //   name: "VantourPickup",
  //   component: VantourPickupVue,
  // },
  // {
  //   path: "/home/van-tour-detail/pages/booktour",
  //   name: "VantourBookTour",
  //   component: VantourBookTourVue,
  // },
  // {
  //   path: "/home/van-tour-detail/pages/makepayment",
  //   name: "VantourMakePayment",
  //   component: VantourMakePaymentVue,
  // },
  // {
  //   path: "/home/van-tour-detail/pages/conformation",
  //   name: "VantourConformation",
  //   component: VantourConformationVue,
  // },
];

export default routes;
