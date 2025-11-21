// C-8.3 Network-Aware Retry Upload System
export class NetworkAwareUploadSystem {
  constructor(queue) {
    this.queue = queue;
    this.backoff = 1000;
    this.maxBackoff = 30000;
    window.addEventListener('online', ()=> this.trigger());
    document.addEventListener('visibilitychange', ()=> {
      if (!document.hidden) this.trigger();
    });
  }

  async trigger() {
    if (navigator.onLine && this.queue.queue.length > 0) {
      await this.queue.run();
      this.backoff = 1000;
    } else {
      this.scheduleRetry();
    }
  }

  scheduleRetry() {
    this.backoff = Math.min(this.backoff * 2, this.maxBackoff);
    setTimeout(()=> this.trigger(), this.backoff);
  }
}
