// C-6.6 Runtime <-> Service Worker Messaging Bridge

export class SWMessagingBridge {
  constructor() {
    this.listeners = new Map();
    if (navigator.serviceWorker && navigator.serviceWorker.addEventListener) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, payload } = event.data || {};
        const cb = this.listeners.get(type);
        if (cb) cb(payload);
      });
    }
  }

  on(type, callback) {
    this.listeners.set(type, callback);
    return () => this.listeners.delete(type);
  }

  send(type, payload={}) {
    if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return;
    navigator.serviceWorker.controller.postMessage({ type, payload });
  }
}
