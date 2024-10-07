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

// const CURRENT_VERSION = "1.0.1";

router.beforeEach(async(to, from, next) => {
    const mobilePage = "/";
    const desktopPage = "/web";
    const language = getLanguage(); // Get language from localStorage

    if (from.name === null && to.name !== null) {
        // Reload the page
        window.location.reload();
        return; // Stop further navigation
    }

    // Add language query if it's missing
    if (!to.query.language && to.name !== "PrivacyPolicy") {
        next({
            ...to,
            query: {
                ...to.query,
                language, // Append language from localStorage
            },
        });
        return; // Ensure the navigation stops and new one begins
    }

    // Handle screen size and meta.guest redirection logic
    if (isMobile()) {
        // Redirect mobile users to the mobilePage if not on mobilePage and no meta.guest
        if (to.path !== mobilePage && !to.meta.guest) {
            next();
            // window.location.reload();
        } else {
            next(); // Allow access if it's the mobilePage or guest route
            // window.location.reload();
        }
    } else {
        // Redirect desktop users to the desktopPage if not on desktopPage and no meta.guest
        if (to.path !== desktopPage && !to.meta.guest) {
            next({
                path: desktopPage,
                query: {...to.query },
            });
            // window.location.reload();
        } else {
            next(); // Allow access if it's the desktopPage or guest route
            // window.location.reload();
        }
    }
});

export default router;