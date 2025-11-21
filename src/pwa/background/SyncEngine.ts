export class SyncEngine {
  private queue:any[]=[];
  push(job:any){ this.queue.push(job); }
  drain(){ const out=[...this.queue]; this.queue=[]; return out; }
}
