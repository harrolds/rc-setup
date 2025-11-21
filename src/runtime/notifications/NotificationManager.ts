// C-14.3 Notification Manager – Capability + Permission + Toggle Storage

export class NotificationManager {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async isSupported() {
    return "Notification" in window;
  }

  async permissionStatus() {
    if (!("Notification" in window)) return "unsupported";
    return Notification.permission;
  }

  async requestPermission() {
    if (!("Notification" in window)) return "unsupported";
    return await Notification.requestPermission();
  }

  async savePreference(userId, enabled) {
    await this.supabase
      .from("user_settings")
      .update({ notifications_enabled: enabled })
      .eq("user_id", userId);
  }
}
