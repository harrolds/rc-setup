// C-16.1 Reaction Module

export class ReactionModule {
  constructor(supabase) {
    this.supabase = supabase;
    this.types = ["love", "wow", "sad", "sleep"];
  }

  async react(id, type, currentReactions) {
    const next = { ...currentReactions };
    next[type] = (next[type] || 0) + 1;

    await this.supabase
      .from("dreams")
      .update({ reactions: next })
      .eq("id", id);

    return next;
  }
}
