export class AutoFlushController {
  constructor(private threshold=44100){}
  shouldFlush(bufferLength:number){
    return bufferLength >= this.threshold;
  }
}