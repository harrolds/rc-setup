// C-14.1 Settings Panel UI

export class SettingsPanel {
  constructor(supabase, loader) {
    this.supabase = supabase;
    this.loader = loader;
  }

  mount(root, settings) {
    root.innerHTML = `
      <div class="settings-box">
        <h2>Instellingen</h2>
        <label>Thema:</label>
        <select id="theme-select">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <label>Taal:</label>
        <select id="lang-select">
          <option value="nl">Nederlands</option>
          <option value="de">Deutsch</option>
          <option value="en">English</option>
        </select>

        <button id="settings-save">Opslaan</button>
      </div>
    `;

    document.getElementById("theme-select").value = settings.theme;
    document.getElementById("lang-select").value = settings.language;

    document.getElementById("settings-save").onclick = () => this.save(settings.user_id);
  }

  async save(userId) {
    const theme = document.getElementById("theme-select").value;
    const language = document.getElementById("lang-select").value;

    await this.supabase.from("user_settings").update({
      theme, language
    }).eq("user_id", userId);

    this.loader.applyTheme(theme);
    this.loader.applyLanguage(language);
  }
}
