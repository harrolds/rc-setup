// C-17.3 Notification Preferences Page

import { NotificationSettingsModule } from "./NotificationSettingsModule";

export class NotificationSettingsPage {
  constructor(supabase) {
    this.supabase = supabase;
    this.notifModule = new NotificationSettingsModule(supabase);
  }

  async render(root, user) {
    const settings = await this.notifModule.load(user.id);

    root.innerHTML = `
      <div class="notification-settings">
        <h2>Notificaties</h2>

        <label class="notif-item">
          <span>AI samenvatting gereed</span>
          <input type="checkbox" id="notif-summary" ${settings.notify_ai_summary?"checked":""}>
        </label>

        <label class="notif-item">
          <span>AI afbeelding gereed</span>
          <input type="checkbox" id="notif-image" ${settings.notify_ai_image?"checked":""}>
        </label>

        <label class="notif-item">
          <span>Nieuwe reacties op mijn droom</span>
          <input type="checkbox" id="notif-comments" ${settings.notify_comments?"checked":""}>
        </label>

        <label class="notif-item">
          <span>Droom gedeeld</span>
          <input type="checkbox" id="notif-shares" ${settings.notify_shares?"checked":""}>
        </label>

        <button id="notif-save-btn" class="notif-save-btn">Opslaan</button>
      </div>
    `;

    document.getElementById("notif-save-btn").onclick = async () => {
      const newSettings = {
        notify_ai_summary: document.getElementById("notif-summary").checked,
        notify_ai_image: document.getElementById("notif-image").checked,
        notify_comments: document.getElementById("notif-comments").checked,
        notify_shares: document.getElementById("notif-shares").checked
      };

      await this.notifModule.save(user.id, newSettings);
      alert("Notificatie-instellingen opgeslagen");
    };
  }
}
