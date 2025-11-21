import { LifecycleObserver } from './LifecycleObserver';

export class LifecycleController {
  private observer = new LifecycleObserver();
  private subscribers: Array<(report: any) => void> = [];

  constructor() {
    this.observer.onChange((report) => this.notify(report));
  }

  subscribe(cb: (report: any) => void) {
    this.subscribers.push(cb);
  }

  private notify(report: any) {
    this.subscribers.forEach(cb => cb(report));
  }

  getCurrent() {
    return this.observer.getStatus();
  }
}
