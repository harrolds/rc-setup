// C-9.0 AI Pipeline Integration (Whisper / GPT / DVVF)
export class AIPipeline {
  constructor(kernel) {
    this.kernel = kernel;
  }

  async runFullPipeline(dreamId) {
    await this.kernel.cloud.fn.triggerAI({ dream_id: dreamId, mode: "full" });
    return true;
  }

  async requestTranscript(dreamId) {
    await this.kernel.cloud.fn.triggerAI({ dream_id: dreamId, mode: "transcript" });
  }

  async requestSummary(dreamId) {
    await this.kernel.cloud.fn.triggerAI({ dream_id: dreamId, mode: "summary" });
  }

  async requestVisual(dreamId) {
    await this.kernel.cloud.fn.triggerAI({ dream_id: dreamId, mode: "visual" });
  }
}
