// Service Worker for Gradient Builder
// Provides offline functionality and caching

const CACHE_NAME = "gradient-builder-v1.0.0";
const STATIC_CACHE = "gradient-builder-static-v1";
const DYNAMIC_CACHE = "gradient-builder-dynamic-v1";

// Static assets to cache immediately
const staticAssets = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/site.webmanifest",
  "/favicon.ico",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/logo.png",
  "/logo.svg",
];

// Dynamic routes to cache (for single-page app)
const dynamicRoutes = ["/", "/index.html"];

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("[SW] Install event");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching app shell");
        return cache.addAll(staticAssets);
      })
      .catch((error) => {
        console.error("[SW] Cache addAll failed:", error);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
  // Ensure the service worker takes control immediately
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        console.log("[SW] Serving from cache:", event.request.url);
        return response;
      }

      console.log("[SW] Fetching from network:", event.request.url);
      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response as it can only be consumed once
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // If both cache and network fail, show a fallback page for navigation requests
          if (event.request.destination === "document") {
            return caches.match("/");
          }
        });
    })
  );
});

// Handle background sync for sharing URLs when back online
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("[SW] Background sync triggered");
    // Handle any queued actions when back online
  }
});

// Handle push notifications (for future use)
self.addEventListener("push", (event) => {
  console.log("[SW] Push event received");
  // Handle push notifications if needed in the future
});

// Message handler for communication with main thread
self.addEventListener("message", (event) => {
  console.log("[SW] Message received:", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "GET_VERSION") {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
