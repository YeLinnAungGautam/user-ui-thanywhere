import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

// Function to detect if the device is mobile
const isMobile = () => {
  return window.innerWidth <= 768;
};

// Function to get the language from localStorage (defaults to 'english')
const getLanguage = () => {
  return localStorage.getItem("language") || "english";
};

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      window.scrollTo(0, 0);
      return false;
    }
  },
});

router.beforeEach((to, from, next) => {
  const mobilePage = "/";
  const desktopPage = "/web";
  const language = getLanguage(); // Get language from localStorage

  // Add language query if it's missing
  if (!to.query.language) {
    next({
      ...to,
      query: {
        ...to.query,
        language, // Append language from localStorage
      },
    });
    return; // Ensure the navigation stops and new one begins
  }

  // Screen size redirection logic
  if (isMobile() && to.path === desktopPage) {
    next({
      path: mobilePage,
      query: { ...to.query },
    });
  } else if (!isMobile() && to.path === mobilePage) {
    next({
      path: desktopPage,
      query: { ...to.query },
    });
  } else {
    next();
  }
});

export default router;
