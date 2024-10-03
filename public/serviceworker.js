self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "CHECK_FOR_UPDATE") {
        self.registration.update();
    }
});