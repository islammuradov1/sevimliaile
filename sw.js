const OFFLINE_CACHE = "offline-v2";
const OFFLINE_URL = "/offline.html";

async function cacheOffline() {
  const cache = await caches.open(OFFLINE_CACHE);
  await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheOffline().catch(() => null));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== OFFLINE_CACHE) {
            return caches.delete(key);
          }
          return null;
        })
      ).then(() => cacheOffline().catch(() => null))
    )
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CACHE_OFFLINE") {
    event.waitUntil(cacheOffline().catch(() => null));
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  }
});
