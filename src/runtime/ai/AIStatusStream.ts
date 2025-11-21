// C-9.2 AI Live Status & Progress System
export class AIStatusStream {
  constructor(kernel) {
    this.kernel = kernel;
    this.status = {};
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

  async poll(dreamId) {
    const { data, error } = await this.kernel.cloud.db
      .from('ai_results')
      .select('type, created_at')
      .eq('dream_id', dreamId)
      .order('created_at', { ascending: true });

    if (error) return;

    const steps = data.map(item => item.type);
    const progress = {
      transcript: steps.includes('transcript'),
      summary: steps.includes('summary'),
      analysis: steps.includes('analysis'),
      visual: steps.includes('visual')
    };

    this.status[dreamId] = progress;
    this.emit(dreamId, progress);
  }

  startPolling(dreamId, interval = 2000) {
    this.poll(dreamId);
    return setInterval(() => this.poll(dreamId), interval);
  }
}
