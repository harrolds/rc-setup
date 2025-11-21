// C-14.4 Install Prompt Controller (PWA Install Flow)

export class InstallPromptController {
  constructor() {
    this.deferredPrompt = null;
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  }

  isAvailable() {
    return !!this.deferredPrompt;
  }

  async triggerInstall() {
    if (!this.deferredPrompt) return false;
    this.deferredPrompt.prompt();
    const res = await this.deferredPrompt.userChoice;
    this.deferredPrompt = null;
    return res.outcome === "accepted";
  }
}
