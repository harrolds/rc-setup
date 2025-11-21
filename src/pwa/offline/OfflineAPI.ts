export async function ensureOfflineReady(){
  if(!navigator.serviceWorker) return false;
  const reg = await navigator.serviceWorker.ready;
  // Placeholder: future asset preloading
  return true;
}
