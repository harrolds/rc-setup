import { NetworkHeuristics } from './NetworkHeuristics';
import { NetworkEvents } from './NetworkEvents';

export class NetworkController {
  private heuristics = new NetworkHeuristics();
  private events = new NetworkEvents();
  private listeners: Array<(quality: string) => void> = [];

  constructor() {
    this.events.onChange(() => {
      const report = this.heuristics.detect();
      const quality = this.heuristics.classify(report);
      this.notify(quality);
    });
  }

  detectQuality() {
    const report = this.heuristics.detect();
    return this.heuristics.classify(report);
  }

  onQualityChange(cb: (quality: string) => void) {
    this.listeners.push(cb);
  }

  private notify(quality: string) {
    this.listeners.forEach(cb => cb(quality));
  }
}
