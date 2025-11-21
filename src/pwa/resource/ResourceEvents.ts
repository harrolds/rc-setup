export class ResourceEvents {
  private listeners: Array<(report: any) => void> = [];
  private intervalId: any = null;

  startMonitoring(collector: () => Promise<any>, intervalMs = 10000) {
    if (this.intervalId) return;
    this.intervalId = setInterval(async () => {
      const report = await collector();
      this.listeners.forEach(cb => cb(report));
    }, intervalMs);
  }

  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onUpdate(cb: (report: any) => void) {
    this.listeners.push(cb);
  }
}
