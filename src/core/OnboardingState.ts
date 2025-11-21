// C-18.4 Onboarding State Manager

export class OnboardingState {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async load(userId) {
    const { data } = await this.supabase
      .from("onboarding_status")
      .select("*")
      .eq("user_id", userId)
      .single();

    return data || { completed: false, step: 1 };
  }

  async save(userId, status) {
    await this.supabase
      .from("onboarding_status")
      .upsert({ user_id: userId, ...status });
  }
}
