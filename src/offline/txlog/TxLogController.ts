import { TxLogDB } from './TxLogDB';
import { createTx } from './TxLogModel';

export class TxLogController {
  private db=new TxLogDB();

  async init(){
    await this.db.init();
  }

  async log(type:string,payload:any){
    const entry=createTx(type,payload);
    await this.db.add(entry);
    return entry;
  }

  async get(status){
    return this.db.listByStatus(status);
  }
}