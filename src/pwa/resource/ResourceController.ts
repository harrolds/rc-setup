import { ResourceMonitor } from './ResourceMonitor';
import { ResourceEvents } from './ResourceEvents';

export class ResourceController {
  private monitor = new ResourceMonitor();
  private events = new ResourceEvents();
  private subscribers: Array<(report: any) => void> = [];

  async init() {
    const initial = await this.monitor.collect();
    this.notify(initial);

    this.events.onUpdate((report) => this.notify(report));
    this.events.startMonitoring(() => this.monitor.collect(), 15000);

    return initial;
  }

  subscribe(cb: (report: any) => void) {
    this.subscribers.push(cb);
  }

  private notify(report: any) {
    this.subscribers.forEach(cb => cb(report));
  }
}
