// C-14.4 Install Settings Panel

export class InstallSettingsPanel {
  constructor(controller) {
    this.controller = controller;
  }

  mount(root) {
    const available = this.controller.isAvailable();

    root.innerHTML = `
      <div class="settings-box">
        <h2>App Installatie</h2>
        <p>${available ? "App kan worden geïnstalleerd" : "Installatie niet beschikbaar"}</p>
        <button id="install-btn" ${available ? "" : "disabled"}>
          Installeer Dreamdrop
        </button>
      </div>
    `;

    if (available) {
      document.getElementById("install-btn").onclick = async () => {
        const ok = await this.controller.triggerInstall();
        alert(ok ? "Installatie gestart" : "Installatie geannuleerd");
      };
    }
  }
}
