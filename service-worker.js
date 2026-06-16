// Nazwa cache — zmień gdy aktualizujesz aplikację
const CACHE_NAME = "flashcards-v1";

// Pliki do zapisania offline
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon.png"
];

// Instalacja — zapisujemy pliki w cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Aktywacja — usuwamy stary cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch — najpierw sieć, potem cache (dane zawsze świeże)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});