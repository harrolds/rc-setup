// C-6.4 Delta Metadata Shadow Cache

export class MetadataShadowCache {
  constructor(db) {
    this.db = db;
  }

  async writeShadow(meta) {
    const tx = this.db.transaction('shadow','readwrite');
    await tx.store.put(meta);
    await tx.done;
  }

  async getShadow(id) {
    const tx = this.db.transaction('shadow','readonly');
    return await tx.store.get(id);
  }

  async listShadows() {
    const tx = this.db.transaction('shadow','readonly');
    return await tx.store.getAll();
  }
}

export async function openShadowDB() {
  return await openDB('dreamdrop-shadow',1,{
    upgrade(db) {
      if (!db.objectStoreNames.contains('shadow')) {
        db.createObjectStore('shadow',{ keyPath:'id' });
      }
    }
  });
}

// IDB helper
async function openDB(name,version,opts){
  return await new Promise((resolve,reject)=>{
    const req = indexedDB.open(name,version);
    req.onupgradeneeded = ()=> opts.upgrade(req.result);
    req.onerror = ()=> reject(req.error);
    req.onsuccess = ()=> resolve(req.result);
  });
}
