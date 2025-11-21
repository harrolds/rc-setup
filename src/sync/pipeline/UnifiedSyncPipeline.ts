// C-13.4 Sync Pipeline Unification
// IndexedDB ⇄ Supabase ⇄ AI Kernel unified pipeline

export class UnifiedSyncPipeline {
  constructor({ idb, supabase, aiKernel, resolver }) {
    this.idb = idb;
    this.supabase = supabase;
    this.aiKernel = aiKernel;
    this.resolver = resolver;
  }

  async pushLocalChanges() {
    const pending = await this.idb.getPending();
    for (const change of pending) {
      const { data, error } = await this.supabase
        .from("dreams")
        .upsert(change.remotePayload);
      if (!error) await this.idb.markSynced(change.id);
    }
  }

  async pullRemoteChanges(userId) {
    const localMap = await this.idb.getAllAsMap();
    const { data: remote } = await this.supabase
      .from("dreams")
      .select("*")
      .eq("user_id", userId);

    for (const item of remote) {
      const local = localMap[item.id];
      const resolved = this.resolver.resolve(local, item);
      await this.idb.write(resolved);
    }
  }

  async alignAIQueue() {
    const queued = await this.idb.getQueuedAITasks();
    for (const task of queued) {
      await this.aiKernel.resumeQueuedTask(task);
    }
  }

  async runFullSync(userId) {
    await this.pushLocalChanges();
    await this.pullRemoteChanges(userId);
    await this.alignAIQueue();
  }
}
