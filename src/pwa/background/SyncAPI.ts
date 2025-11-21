export async function registerSync(tag='dreamdrop-sync'){
  if(!('serviceWorker' in navigator)) return null;
  const reg=await navigator.serviceWorker.ready;
  if('sync' in reg) await reg.sync.register(tag);
  return true;
}
