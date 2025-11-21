// C-12.4 Service Worker – Update Broadcast Channel

self.addEventListener("install", () => {
  // do nothing; install is handled in main sw
});

self.addEventListener("activate", (e) => {
  // Notify clients that a new version is ready
  e.waitUntil(
    self.clients.matchAll().then(clients => {
      clients.forEach(client => client.postMessage({ type: "SW_UPDATED" }));
    })
  );
});
