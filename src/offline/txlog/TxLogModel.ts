export type TxStatus='pending'|'queued'|'processing'|'synced'|'failed';

export interface TxEntry {
  id:string;
  type:string;
  payload:any;
  timestamp:number;
  status:TxStatus;
}

export function createTx(type:string,payload:any):TxEntry{
  return {
    id:crypto.randomUUID(),
    type,
    payload,
    timestamp:Date.now(),
    status:'pending'
  };
}