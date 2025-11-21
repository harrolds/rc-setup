export async function registerSubscription(){
  if(!('serviceWorker' in navigator)) return null;
  const reg = await navigator.serviceWorker.ready;
  return await reg.pushManager.getSubscription();
}
