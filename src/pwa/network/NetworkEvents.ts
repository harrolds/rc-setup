export class NetworkEvents {
  private listeners: Array<(online: boolean) => void> = [];

  constructor() {
    window.addEventListener('online', () => this.notify(true));
    window.addEventListener('offline', () => this.notify(false));
  }

  onChange(cb: (online: boolean) => void) {
    this.listeners.push(cb);
  }

  private notify(state: boolean) {
    this.listeners.forEach(cb => cb(state));
  }
}
