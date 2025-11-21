// C-14.1 User Settings Loader

export class UserSettingsLoader {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async load(userId) {
    const { data, error } = await this.supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) return null;

    this.applyTheme(data.theme);
    this.applyLanguage(data.language);
    return data;
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0D0D0F" : "#FFFFFF");
    }
  }

  applyLanguage(lang) {
    window.dreamdropLang = lang;
  }
}
