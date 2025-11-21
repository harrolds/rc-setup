export class OfflineCacheEngine {
  private pending:any[]=[];
  add(item:any){ this.pending.push(item); }
  flush(){ const x=[...this.pending]; this.pending=[]; return x; }
}
