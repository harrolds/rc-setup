// C-17.3 Notification Settings Module

export class NotificationSettingsModule {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async load(userId) {
    const { data } = await this.supabase
      .from("notification_settings")
      .select("*")
      .eq("user_id", userId)
      .single();

    return data || {
      notify_ai_summary: true,
      notify_ai_image: true,
      notify_comments: true,
      notify_shares: false
    };
  }

  async save(userId, settings) {
    await this.supabase
      .from("notification_settings")
      .upsert({ user_id: userId, ...settings });
  }
}
