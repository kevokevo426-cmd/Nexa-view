const CACHE_NAME = "nexa-view-v5-EYE-FIX"; // CHANGED v5 so it forces update
const urlsToCache = [
  "./",
  "./index.html",
  "./register.html",
  "./dashboard.html",
  "./tasks.html",
  "./wallet.html",
  "./referrals.html",
  "./nexa_view_icon.webp",
  "./manifest.json"
];

self.addEventListener("install", event => {
  self.skipWaiting(); // FORCE new version immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // DELETE old cache
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
