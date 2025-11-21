// C-10.0 Full UI Binding Layer (AI → UI)
import { AIStatusStream } from "../../runtime/ai/AIStatusStream";
import { AIResultCache } from "../../runtime/ai/AIResultCache";
import { AIResultIntegrator } from "../../runtime/ai/AIResultIntegrator";

export class AIUIBinding {
  constructor(kernel) {
    this.kernel = kernel;
    this.status = new AIStatusStream(kernel);
    this.cache = new AIResultCache();
    this.integrator = new AIResultIntegrator(kernel);
  }

  bindStatus(dreamId, onUpdate) {
    this.status.on(dreamId, (progress) => {
      onUpdate(progress);
    });
    this.status.startPolling(dreamId);
  }

  async bindResults(dreamId, onResult) {
    const cached = this.cache.get(dreamId);
    if (cached) onResult(cached);

    const updated = await this.integrator.applyResults(dreamId);
    if (updated) {
      this.cache.set(dreamId, updated);
      onResult(updated);
    }
  }

  clearCache(dreamId) {
    this.cache.clear(dreamId);
  }
}
