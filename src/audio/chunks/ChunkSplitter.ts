export class ChunkSplitter {
  constructor(private chunkSize=2048){}
  split(samples:Float32Array){
    const chunks=[];
    for(let i=0;i<samples.length;i+=this.chunkSize){
      chunks.push(samples.slice(i,i+this.chunkSize));
    }
    return chunks;
  }
}