// C-9.3 AI Error Handling & Recovery Layer
export class AIErrorHandler {
  constructor(kernel) {
    this.kernel = kernel;
    this.listeners = new Map();
  }

  on(dreamId, callback) {
    if (!this.listeners.has(dreamId)) this.listeners.set(dreamId, []);
    this.listeners.get(dreamId).push(callback);
  }

  emit(dreamId, payload) {
    const subs = this.listeners.get(dreamId) || [];
    subs.forEach(cb => cb(payload));
  }

  async detectErrors(dreamId) {
    const { data, error } = await this.kernel.cloud.db
      .from('ai_results')
      .select('type, payload, created_at')
      .eq('dream_id', dreamId);

    if (error) return;

    for (const item of data) {
      if (item.payload && item.payload.error) {
        this.emit(dreamId, {
          stage: item.type,
          message: item.payload.error,
          time: item.created_at
        });
        return item.payload.error;
      }
    }
    return null;
  }

  async recover(dreamId) {
    const err = await this.detectErrors(dreamId);
    if (!err) return { recovered: false, reason: "no-error" };

    const { data: lastSteps } = await this.kernel.cloud.db
      .from('ai_results')
      .select('type')
      .eq('dream_id', dreamId)
      .order('created_at', { ascending: true });

    const steps = lastSteps.map(s => s.type);

    if (!steps.includes('transcript')) {
      await this.kernel.cloud.fn.triggerAI({ dream_id: dreamId, mode: "transcript" });
      return { recovered: true, stage: "transcript" };
    }

    if (!steps.includes('summary')) {
      await this.kernel.cloud.fn.triggerAI({ dream_id: dreamId, mode: "summary" });
      return { recovered: true, stage: "summary" };
    }

    if (!steps.includes('analysis')) {
      await this.kernel.cloud.fn.triggerAI({ dream_id: dreamId, mode: "analysis" });
      return { recovered: true, stage: "analysis" };
    }

    if (!steps.includes('visual')) {
      await this.kernel.cloud.fn.triggerAI({ dream_id: dreamId, mode: "visual" });
      return { recovered: true, stage: "visual" };
    }

    return { recovered: false, reason: "no-recoverable-stage" };
  }
}
