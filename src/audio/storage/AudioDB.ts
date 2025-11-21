const DB_NAME='dreamdrop_audio_v2';
const DB_VERSION=1;

export class AudioDB {
  private db:IDBDatabase|null=null;

  init(){
    return new Promise((resolve,reject)=>{
      const req=indexedDB.open(DB_NAME,DB_VERSION);
      req.onerror=()=>reject(req.error);
      req.onupgradeneeded=()=>{
        const db=req.result;
        if(!db.objectStoreNames.contains('chunks')){
          db.createObjectStore('chunks',{ keyPath:'id' });
        }
        if(!db.objectStoreNames.contains('metadata')){
          db.createObjectStore('metadata',{ keyPath:'id' });
        }
      };
      req.onsuccess=()=>{ this.db=req.result; resolve(true); };
    });
  }

  addChunk(chunk){
    return new Promise((resolve,reject)=>{
      const tx=this.db.transaction('chunks','readwrite');
      tx.objectStore('chunks').put(chunk);
      tx.oncomplete=()=>resolve(true);
      tx.onerror=()=>reject(tx.error);
    });
  }

  getChunks(){
    return new Promise((resolve,reject)=>{
      const tx=this.db.transaction('chunks','readonly');
      const req=tx.objectStore('chunks').getAll();
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error);
    });
  }

  addMetadata(meta){
    return new Promise((resolve,reject)=>{
      const tx=this.db.transaction('metadata','readwrite');
      tx.objectStore('metadata').put(meta);
      tx.oncomplete=()=>resolve(true);
      tx.onerror=()=>reject(tx.error);
    });
  }

  cleanupOrphans(){
    return this.getChunks().then(list=>{
      return list.filter(c=>!c.sampleCount||c.sampleCount<=0);
    });
  }
}