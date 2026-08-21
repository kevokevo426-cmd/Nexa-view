const CACHE_NAME = "nexa-view-v1";
const urlsToCache = ["./", "./index.html", "./nexa_view_icon.webp", "./manifest.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
