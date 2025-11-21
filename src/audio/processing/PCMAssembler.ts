export function floatTo16BitPCM(float32:Float32Array){
  const buf=new Int16Array(float32.length);
  for(let i=0;i<float32.length;i++){
    let s=Math.max(-1,Math.min(1,float32[i]));
    buf[i]=s<0? s*0x8000 : s*0x7FFF;
  }
  return buf;
}