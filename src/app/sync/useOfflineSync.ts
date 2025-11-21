import { useEffect, useState } from 'react';
import { useRuntime } from '../../runtime/useRuntime';

export function useOfflineSync() {
  const rt = useRuntime();
  const [pending, setPending] = useState<number>(0);

  useEffect(() => {
    const unsub = rt.multitab.onBroadcast?.((msg:any)=>{
      if (msg.type==='offline-sync') triggerSync();
    });

    return ()=>{ if(typeof unsub==='function') unsub(); };
  },[]);

  async function triggerSync() {
    const log = await rt.kernel.syncLog?.getPending?.() || [];
    setPending(log.length);

    if (log.length===0) return;

    for (const entry of log) {
      try {
        await rt.kernel.syncEngine?.process(entry);
        await rt.kernel.syncLog.markDone(entry.id);
      } catch(e) {
        console.error('[Sync]',e);
        return;
      }
    }
  }

  async function broadcastSync() {
    rt.multitab.broadcast('offline-sync',{});
  }

  return {
    triggerSync,
    broadcastSync,
    pending
  };
}
