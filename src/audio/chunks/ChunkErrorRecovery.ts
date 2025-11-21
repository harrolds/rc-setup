export class ChunkErrorRecovery {
  recover(chunk:Float32Array){
    if(!chunk || chunk.length===0) return null;
    return chunk;
  }
}