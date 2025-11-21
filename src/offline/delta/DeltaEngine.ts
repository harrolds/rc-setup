import { TxLogController } from '../txlog/TxLogController';

export class DeltaEngine {
  private txlog = new TxLogController();
  private initialized = false;

  async init(){
    if(!this.initialized){
      await this.txlog.init();
      this.initialized = true;
    }
  }

  async computeOutgoing(){
    return await this.txlog.get('pending');
  }

  async markQueued(entry){
    entry.status = 'queued';
    await this.txlog.db.add(entry);
  }

  async markSynced(entry){
    entry.status = 'synced';
    await this.txlog.db.add(entry);
  }

  async markFailed(entry){
    entry.status = 'failed';
    await this.txlog.db.add(entry);
  }
}