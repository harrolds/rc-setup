// C-12.3 Network Quality Layer – Online/Offline/Weak Connection UX

export class NetworkMonitor {
  constructor(onChange) {
    this.onChange = onChange;
    this.state = {
      online: navigator.onLine,
      weak: false
    };
  }

  start() {
    window.addEventListener("online", () => this.update(true));
    window.addEventListener("offline", () => this.update(false));

    // Weak network detection via latency probing
    this.latencyProbe = setInterval(() => this.checkLatency(), 5000);

    this.update(navigator.onLine);
  }

  update(online) {
    this.state.online = online;
    this.onChange(this.state);
  }

  async checkLatency() {
    const start = performance.now();
    try {
      await fetch("/manifest.json", { cache: "no-store" });
      const latency = performance.now() - start;
      const weak = latency > 350;
      if (weak !== this.state.weak) {
        this.state.weak = weak;
        this.onChange(this.state);
      }
    } catch (e) {
      this.state.online = false;
      this.onChange(this.state);
    }
  }
}
