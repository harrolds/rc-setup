export function extractMetadata(samples:Float32Array, sampleRate:number){
  return {
    duration: samples.length / sampleRate,
    sampleCount: samples.length,
    sampleRate
  };
}