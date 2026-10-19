// Saves the app and all sounds on the phone, so it works offline.
const CACHE = "phrase-cards-v3";
const FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-180.png", "../phrase-cards/basics-01.mp3", "../phrase-cards/basics-02.mp3", "../phrase-cards/basics-03.mp3", "../phrase-cards/basics-04.mp3", "../phrase-cards/basics-05.mp3", "../phrase-cards/basics-06.mp3", "../phrase-cards/basics-07.mp3", "../phrase-cards/basics-08.mp3", "../phrase-cards/restaurant-01.mp3", "../phrase-cards/restaurant-02.mp3", "../phrase-cards/restaurant-03.mp3", "../phrase-cards/restaurant-04.mp3", "../phrase-cards/restaurant-05.mp3", "../phrase-cards/restaurant-06.mp3", "../phrase-cards/restaurant-07.mp3", "../phrase-cards/restaurant-08.mp3", "../phrase-cards/diet-01.mp3", "../phrase-cards/diet-02.mp3", "../phrase-cards/diet-03.mp3", "../phrase-cards/diet-04.mp3", "../phrase-cards/diet-05.mp3", "../phrase-cards/diet-06.mp3", "../phrase-cards/diet-07.mp3", "../phrase-cards/diet-08.mp3", "../phrase-cards/diet-09.mp3", "../phrase-cards/diet-10.mp3", "../phrase-cards/diet-11.mp3", "../phrase-cards/diet-12.mp3", "../phrase-cards/diet-13.mp3", "../phrase-cards/diet-14.mp3", "../phrase-cards/shopping-01.mp3", "../phrase-cards/shopping-02.mp3", "../phrase-cards/shopping-03.mp3", "../phrase-cards/shopping-04.mp3", "../phrase-cards/shopping-05.mp3", "../phrase-cards/shopping-06.mp3", "../phrase-cards/transport-01.mp3", "../phrase-cards/transport-02.mp3", "../phrase-cards/transport-03.mp3", "../phrase-cards/transport-04.mp3", "../phrase-cards/transport-05.mp3", "../phrase-cards/transport-06.mp3", "../phrase-cards/hotel-01.mp3", "../phrase-cards/hotel-02.mp3", "../phrase-cards/hotel-03.mp3", "../phrase-cards/hotel-04.mp3", "../phrase-cards/hotel-05.mp3", "../phrase-cards/emergency-01.mp3", "../phrase-cards/emergency-02.mp3", "../phrase-cards/emergency-03.mp3", "../phrase-cards/emergency-04.mp3", "../phrase-cards/emergency-05.mp3", "../phrase-cards/emergency-06.mp3"];
self.addEventListener("install", e => {
  // "reload" = always download fresh, never reuse the phone's older saved copy
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {cache: "reload"}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const key = url.origin + url.pathname;  // ignore ?query and #hash
  e.respondWith(caches.match(key).then(hit => hit || fetch(e.request)));
});
