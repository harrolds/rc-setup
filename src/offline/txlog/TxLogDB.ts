const DB_NAME='dreamdrop_sync_v2';
const DB_VERSION=1;

export class TxLogDB {
  private db:IDBDatabase|null=null;

  init(){
    return new Promise((resolve,reject)=>{
      const req=indexedDB.open(DB_NAME,DB_VERSION);
      req.onupgradeneeded=()=>{
        const db=req.result;
        if(!db.objectStoreNames.contains('txlog')){
          const store=db.createObjectStore('txlog',{keyPath:'id'});
          store.createIndex('by_status','status',{unique:false});
        }
      };
      req.onsuccess=()=>{ this.db=req.result; resolve(true); };
      req.onerror=()=>reject(req.error);
    });
  }

  add(entry){
    return new Promise((resolve,reject)=>{
      const tx=this.db.transaction('txlog','readwrite');
      tx.objectStore('txlog').put(entry);
      tx.oncomplete=()=>resolve(true);
      tx.onerror=()=>reject(tx.error);
    });
  }

  listByStatus(status){
    return new Promise((resolve,reject)=>{
      const tx=this.db.transaction('txlog','readonly');
      const idx=tx.objectStore('txlog').index('by_status');
      const req=idx.getAll(status);
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error);
    });
  }
}