export class InstallPromptUIBridge {
  private controller: any;
  private onChangeCallbacks: Array<(available: boolean) => void> = [];

  constructor(controller: any) {
    this.controller = controller;
    controller.onAvailable((state: boolean) => {
      this.onChangeCallbacks.forEach(cb => cb(state));
    });
  }

  onChange(cb: (available: boolean) => void) {
    this.onChangeCallbacks.push(cb);
  }

  async requestInstall(): Promise<boolean> {
    return await this.controller.triggerInstall();
  }
}
