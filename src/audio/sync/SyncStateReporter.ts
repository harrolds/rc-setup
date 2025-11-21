export class SyncStateReporter {
  onChange(cb){ this.cb=cb; }
  report(state){ this.cb && this.cb(state); }
}