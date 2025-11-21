export type AppVisibility = 'visible' | 'hidden';
export type AppLifecycleEvent = 'focus' | 'blur' | 'visibility-change';

export interface LifecycleReport {
  visibility: AppVisibility;
  focused: boolean;
  lastEvent: AppLifecycleEvent | null;
}

export class LifecycleObserver {
  private listeners: Array<(report: LifecycleReport) => void> = [];
  private report: LifecycleReport = {
    visibility: document.visibilityState === 'visible' ? 'visible' : 'hidden',
    focused: document.hasFocus(),
    lastEvent: null
  };

  constructor() {
    window.addEventListener('focus', () => this.update('focus'));
    window.addEventListener('blur', () => this.update('blur'));
    document.addEventListener('visibilitychange', () => this.update('visibility-change'));
  }

  private update(event: AppLifecycleEvent) {
    this.report = {
      visibility: document.visibilityState === 'visible' ? 'visible' : 'hidden',
      focused: document.hasFocus(),
      lastEvent: event
    };
    this.notify();
  }

  onChange(cb: (report: LifecycleReport) => void) {
    this.listeners.push(cb);
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.report));
  }

  getStatus(): LifecycleReport {
    return this.report;
  }
}
