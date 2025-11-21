// C-15.3 Favorite Toggle Component

export class FavoriteToggle {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async toggle(dreamId, current) {
    const next = !current;
    await this.supabase
      .from("dreams")
      .update({ is_favorite: next })
      .eq("id", dreamId);
    return next;
  }
}
