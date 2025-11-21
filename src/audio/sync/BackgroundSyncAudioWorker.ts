import { uploadChunk } from './ChunkUploadService';
import { Backoff } from './ExponentialBackoff';

export class BackgroundSyncAudioWorker {
  private queue = [];
  private isSyncing = false;
  private backoff = new Backoff();

  enqueue(chunk){
    this.queue.push(chunk);
    this.run();
  }

  async run(){
    if(this.isSyncing) return;
    this.isSyncing = true;
    while(this.queue.length>0){
      const item=this.queue.shift();
      try{
        await uploadChunk(item);
        this.backoff.reset();
      }catch(e){
        this.queue.unshift(item);
        await this.backoff.wait();
      }
    }
    this.isSyncing=false;
  }
}