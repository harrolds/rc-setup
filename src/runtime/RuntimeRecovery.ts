// C-12.6 Runtime Recovery Layer

export class RuntimeRecovery {
  constructor({ aiKernel, syncEngine, db, viewport }) {
    this.aiKernel = aiKernel;
    this.syncEngine = syncEngine;
    this.db = db;
    this.viewport = viewport;
    this.online = navigator.onLine;
  }

  start() {
    window.addEventListener("online", () => this.handleOnline());
    window.addEventListener("offline", () => this.handleOffline());

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && navigator.onLine) {
        this.resumeIfNeeded();
      }
    });

    navigator.serviceWorker?.addEventListener("controllerchange", () => {
      this.softReload();
    });
  }

  async handleOnline() {
    this.online = true;
    this.viewport.notify("Connection restored – recovering…");

    await this.syncEngine.resumePending();
    await this.aiKernel.resumeQueuedTasks();

    this.viewport.notify("Recovery complete");
  }

  handleOffline() {
    this.online = false;
    this.viewport.notify("App offline – working locally");
  }

  async resumeIfNeeded() {
    if (!this.online) return;
    await this.syncEngine.resumePending();
    await this.aiKernel.resumeQueuedTasks();
  }

  softReload() {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}
