// C-16.3 Comment Module (v1)

export class CommentModule {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async load(dreamId) {
    const { data } = await this.supabase
      .from("comments")
      .select("*")
      .eq("dream_id", dreamId)
      .order("created_at", { ascending: true });
    return data || [];
  }

  async add(dreamId, text) {
    await this.supabase
      .from("comments")
      .insert({ dream_id: dreamId, text });
  }
}
