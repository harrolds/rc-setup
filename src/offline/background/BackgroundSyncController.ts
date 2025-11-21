import { DeltaCoordinator } from '../delta/DeltaCoordinator';
import { TxLogController } from '../txlog/TxLogController';
import { ConflictCoordinator } from '../conflict/ConflictCoordinator';

export class BackgroundSyncController {
  private delta = new DeltaCoordinator();
  private txlog = new TxLogController();
  private conflicts = new ConflictCoordinator();
  private isRunning = false;

  async init(){
    await this.delta.init();
    await this.txlog.init();
  }

  async run(){
    if(this.isRunning) return;
    this.isRunning = true;

    try{
      const pending = await this.delta.getPendingDeltas();

      for(const entry of pending){
        try{
          const serverResponse = await this.pushToServer(entry);
          const resolved = this.conflicts.apply(entry, serverResponse);
          await this.delta.applyServerAck([resolved]);
        }catch(e){
          entry.status='failed';
          await this.txlog.db.add(entry);
        }
      }

    }finally{
      this.isRunning = false;
    }
  }

  async pushToServer(entry){
    return new Promise(resolve=>{
      const serverCopy = { ...entry, timestamp: entry.timestamp + 1000 };
      resolve(serverCopy);
    });
  }
}