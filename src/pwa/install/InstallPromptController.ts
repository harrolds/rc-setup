export class InstallPromptController {
  private deferredPrompt: any = null;
  private listeners: Array<(available: boolean) => void> = [];

  constructor() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.notifyListeners(true);
    });
  }

  onAvailable(cb: (available: boolean) => void) {
    this.listeners.push(cb);
  }

  private notifyListeners(state: boolean) {
    for (const cb of this.listeners) cb(state);
  }

  async triggerInstall(): Promise<boolean> {
    if (!this.deferredPrompt) return false;

    try {
      this.deferredPrompt.prompt();
      const choice = await this.deferredPrompt.userChoice;
      const accepted = choice.outcome === 'accepted';

      this.deferredPrompt = null;
      this.notifyListeners(false);

      return accepted;
    } catch (err) {
      console.error('[InstallPrompt]', err);
      return false;
    }
  }

  isAvailable(): boolean {
    return !!this.deferredPrompt;
  }
}
