export function convertSampleRate(buff:Float32Array, ratio:number){
  const newLen = Math.floor(buff.length / ratio);
  const out = new Float32Array(newLen);
  for(let i=0;i<newLen;i++) out[i]=buff[Math.floor(i*ratio)] || 0;
  return out;
}