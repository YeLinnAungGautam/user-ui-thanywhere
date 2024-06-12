import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      // If the route has a hash, scroll to the element with that ID.
      return { selector: to.hash };
    } else {
      // Scroll to the top of the page.
      return { left: 0, top: -10 };
    }
  },
});

export default router;
