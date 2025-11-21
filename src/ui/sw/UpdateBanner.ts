// C-12.4 UpdateBanner – Handles SW update notifications

export class UpdateBanner {
  constructor() {
    this.visible = false;
    this.callback = null;
  }

  init(onUpdate) {
    this.callback = onUpdate;

    navigator.serviceWorker?.addEventListener("message", (e) => {
      if (e.data?.type === "SW_UPDATED") {
        this.show();
      }
    });
  }

  show() {
    this.visible = true;
    const el = document.getElementById("update-banner");
    if (el) el.style.display = "block";
  }

  accept() {
    if (!this.callback) return;
    this.callback();
  }
}
