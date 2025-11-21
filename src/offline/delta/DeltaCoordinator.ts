import { DeltaEngine } from './DeltaEngine';

export class DeltaCoordinator {
  private engine = new DeltaEngine();

  async init(){
    await this.engine.init();
  }

  async getPendingDeltas(){
    return await this.engine.computeOutgoing();
  }

  async applyServerAck(entries){
    for(const e of entries){
      await this.engine.markSynced(e);
    }
  }
}