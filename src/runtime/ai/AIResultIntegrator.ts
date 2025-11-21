// C-9.1 AI Result Integrator
export class AIResultIntegrator {
  constructor(kernel) {
    this.kernel = kernel;
  }

  async applyResults(dreamId) {
    const shadow = await this.kernel.cloud.db.getShadow(dreamId);
    const dream = shadow ? shadow.metadata : null;

    const { data, error } = await this.kernel.cloud.db.from('ai_results')
      .select('*')
      .eq('dream_id', dreamId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return null;

    let updated = dream || {};

    for (const item of data) {
      if (item.type === 'transcript') updated.text = item.payload.text;
      if (item.type === 'summary') updated.summary = item.payload.summary;
      if (item.type === 'analysis') updated.analysis = item.payload;
      if (item.type === 'visual') updated.visual_url = item.payload.url;
      if (item.type === 'emotion') updated.emotions = item.payload.tags;
    }

    await this.kernel.cloud.db.updateDream(dreamId, updated);
    await this.kernel.cloud.db.saveShadow({
      id: dreamId,
      dream_id: dreamId,
      user_id: this.kernel.cloud.auth.supabase.auth.user().id,
      metadata: updated
    });

    this.kernel.emit("dream-updated", { dreamId, updated });

    return updated;
  }
}
