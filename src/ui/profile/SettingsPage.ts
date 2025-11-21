// C-17.2 Settings Page

import { SettingsModule } from "./SettingsModule";

export class SettingsPage {
  constructor(supabase) {
    this.supabase = supabase;
    this.settingsModule = new SettingsModule(supabase);
  }

  async render(root, user) {
    const settings = await this.settingsModule.load(user.id);

    root.innerHTML = `
      <div class="settings-page">
        <h2>Persoonlijke Instellingen</h2>

        <label class="settings-item">
          <span>AI-Features inschakelen</span>
          <input type="checkbox" id="ai-toggle" ${settings.ai_enabled ? "checked" : ""}>
        </label>

        <label class="settings-item">
          <span>Compacte feed-weergave</span>
          <input type="checkbox" id="feed-compact" ${settings.feed_compact ? "checked" : ""}>
        </label>

        <label class="settings-item">
          <span>Reacties tonen</span>
          <input type="checkbox" id="reactions-toggle" ${settings.reactions_enabled ? "checked" : ""}>
        </label>

        <label class="settings-item">
          <span>Theme override</span>
          <select id="theme-select">
            <option value="system" ${settings.theme_override==="system"?"selected":""}>Systeem</option>
            <option value="light" ${settings.theme_override==="light"?"selected":""}>Licht</option>
            <option value="dark" ${settings.theme_override==="dark"?"selected":""}>Donker</option>
          </select>
        </label>

        <button id="save-settings" class="settings-save-btn">Opslaan</button>
      </div>
    `;

    document.getElementById("save-settings").onclick = async () => {
      const newSettings = {
        ai_enabled: document.getElementById("ai-toggle").checked,
        feed_compact: document.getElementById("feed-compact").checked,
        reactions_enabled: document.getElementById("reactions-toggle").checked,
        theme_override: document.getElementById("theme-select").value
      };

      await this.settingsModule.save(user.id, newSettings);

      if (newSettings.theme_override !== "system") {
        document.documentElement.setAttribute("data-theme", newSettings.theme_override);
      }

      alert("Instellingen opgeslagen");
    };
  }
}
