/* Herb & Organics Co. — service worker
   Cache-first for core pages/assets, network-first for everything else,
   offline navigation fallback to the homepage. */
"use strict";

var CACHE_NAME = "herb-organics-v5";

var CORE_ASSETS = [
  "/",
  "/about",
  "/products/nabat-shampoo",
  "/products/beldi-black-soap",
  "/assets/style.css",
  "/assets/script.js",
  "/assets/chatbot.js",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CORE_ASSETS);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_NAME) { return caches.delete(key); }
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

function isCore(url) {
  return CORE_ASSETS.indexOf(url.pathname) !== -1 ||
         url.pathname.indexOf("/assets/") === 0 ||
         url.pathname.indexOf("/icons/") === 0 ||
         url.pathname.indexOf("/images/") === 0;
}

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") { return; }

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) { return; } // let WhatsApp/Instagram links go straight to network

  if (isCore(url)) {
    /* Cache-first for core pages & assets */
    event.respondWith(
      caches.match(req).then(function (cached) {
        var network = fetch(req).then(function (res) {
          if (res && res.status === 200) {
            var copy = res.clone();
            caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
          }
          return res;
        }).catch(function () { return cached; });
        return cached || network;
      })
    );
  } else {
    /* Network-first for everything else; offline fallback for page navigations */
    event.respondWith(
      fetch(req).catch(function () {
        return caches.match(req).then(function (cached) {
          if (cached) { return cached; }
          if (req.mode === "navigate") { return caches.match("/"); }
        });
      })
    );
  }
});
