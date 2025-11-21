export function applyNoiseGate(samples:Float32Array, threshold=0.01){
  const out=new Float32Array(samples.length);
  for(let i=0;i<samples.length;i++){
    const v=Math.abs(samples[i])<threshold?0:samples[i];
    out[i]=v;
  }
  return out;
}