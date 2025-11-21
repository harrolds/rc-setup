export class SilenceDetector {
  constructor(private threshold=0.01, private windowSize=1024){}
  isSilent(samples:Float32Array){
    let sum=0;
    for(let i=0;i<samples.length;i++) sum+=Math.abs(samples[i]);
    return (sum/samples.length) < this.threshold;
  }
}