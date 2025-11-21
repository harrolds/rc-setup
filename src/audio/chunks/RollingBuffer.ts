export class RollingBuffer {
  private buffer=new Float32Array(0);
  append(chunk:Float32Array){
    const tmp=new Float32Array(this.buffer.length+chunk.length);
    tmp.set(this.buffer,0);
    tmp.set(chunk,this.buffer.length);
    this.buffer=tmp;
  }
  flush(size:number){
    const out=this.buffer.slice(0,size);
    this.buffer=this.buffer.slice(size);
    return out;
  }
  length(){ return this.buffer.length; }
}