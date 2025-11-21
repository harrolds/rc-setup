import { AudioDB } from './AudioDB';

export class AudioStoreController {
  private db=new AudioDB();

  async init(){
    await this.db.init();
  }

  async saveChunk(id:string, index:number, data:Float32Array){
    await this.db.addChunk({
      id,
      index,
      sampleCount:data.length,
      timestamp:Date.now(),
      data:Array.from(data)
    });
  }

  async saveMetadata(id:string, meta:any){
    await this.db.addMetadata({
      id,
      ...meta
    });
  }

  async getAllChunks(){
    return this.db.getChunks();
  }

  async cleanup(){
    return this.db.cleanupOrphans();
  }
}