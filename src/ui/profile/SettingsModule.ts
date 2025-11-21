// C-17.2 Personalization Settings Module

export class SettingsModule {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async load(userId) {
    const { data } = await this.supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .single();

    return data || {
      ai_enabled: true,
      feed_compact: false,
      reactions_enabled: true,
      theme_override: "system"
    };
  }

  async save(userId, settings) {
    await this.supabase
      .from("user_settings")
      .upsert({ user_id: userId, ...settings });
  }
}
