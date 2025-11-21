// C-6.3 Audio Chunk Engine (Runtime API)

export class ChunkStore {
  constructor(db) {
    this.db = db;
  }

  async writeChunk(chunk) {
    const tx = this.db.transaction('chunks','readwrite');
    await tx.store.put(chunk);
    await tx.done;
    return chunk.id;
  }

  async getChunk(id) {
    const tx = this.db.transaction('chunks','readonly');
    return await tx.store.get(id);
  }

  async listChunks() {
    const tx = this.db.transaction('chunks','readonly');
    return await tx.store.getAll();
  }

  async pruneLRU(limit = 100) {
    const tx = this.db.transaction('chunks','readwrite');
    const all = await tx.store.getAll();
    if (all.length <= limit) return;

    const sorted = all.sort((a,b)=>a.timestamp - b.timestamp);
    const excess = sorted.slice(0, all.length - limit);
    for(const item of excess) {
      await tx.store.delete(item.id);
    }
    await tx.done;
  }
}

export async function openChunkDB() {
  return await openDB('dreamdrop-audio',1,{
    upgrade(db) {
      if (!db.objectStoreNames.contains('chunks')) {
        db.createObjectStore('chunks', { keyPath:'id' });
      }
    }
  });
}
