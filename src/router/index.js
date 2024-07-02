import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const isMobile = () => {
  return window.innerWidth <= 768;
};

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

// Navigation guard to redirect based on screen size
router.beforeEach((to, from, next) => {
  const mobilePage = "/";
  const desktopPage = "/web";

  if (to.path === mobilePage || to.path === desktopPage) {
    if (isMobile() && to.path !== mobilePage) {
      next(mobilePage);
    } else if (!isMobile() && to.path !== desktopPage) {
      next(desktopPage);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
