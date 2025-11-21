export function buildWavHeader(sampleCount:number, sampleRate=44100){
  const blockAlign = 2;
  const byteRate = sampleRate * blockAlign;
  const dataSize = sampleCount * blockAlign;
  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);
  function w(str,off){ for(let i=0;i<str.length;i++) view.setUint8(off+i,str.charCodeAt(i)); }
  w('RIFF',0); view.setUint32(4,36+dataSize,true);
  w('WAVE',8); w('fmt ',12);
  view.setUint32(16,16,true); view.setUint16(20,1,true);
  view.setUint16(22,1,true); view.setUint32(24,sampleRate,true);
  view.setUint32(28,byteRate,true); view.setUint16(32,blockAlign,true);
  view.setUint16(34,16,true); w('data',36);
  view.setUint32(40,dataSize,true);
  return new Uint8Array(buffer);
}