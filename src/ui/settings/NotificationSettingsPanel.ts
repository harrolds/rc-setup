// C-14.3 Notification Settings Panel

export class NotificationSettingsPanel {
  constructor(manager) {
    this.manager = manager;
  }

  async mount(root, settings) {
    const supported = await this.manager.isSupported();
    const perm = await this.manager.permissionStatus();

    root.innerHTML = `
      <div class="settings-box">
        <h2>Meldingen</h2>
        <p>Status: ${supported ? perm : "Niet ondersteund"}</p>
        <label>
          <input type="checkbox" id="notif-toggle" />
          Meldingen inschakelen
        </label>
        <button id="notif-save">Opslaan</button>
      </div>
    `;

    document.getElementById("notif-toggle").checked = settings.notifications_enabled;

    document.getElementById("notif-save").onclick = async () => {
      const enabled = document.getElementById("notif-toggle").checked;

      if (enabled && perm !== "granted") {
        await this.manager.requestPermission();
      }

      await this.manager.savePreference(settings.user_id, enabled);
      alert("Voorkeur opgeslagen");
    };
  }
}
