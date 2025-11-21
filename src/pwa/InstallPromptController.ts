// C-12.0 Install Prompt Controller
export class InstallPromptController {
  constructor() {
    this.deferred = null;
  }

  init(onReady) {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferred = e;
      onReady(true);
    });
  }

  async install() {
    if (!this.deferred) return;
    this.deferred.prompt();
    const choice = await this.deferred.userChoice;
    this.deferred = null;
    return choice;
  }
}
