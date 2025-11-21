import { useRuntime } from '../../runtime/useRuntime';
import { useEffect, useState } from 'react';

export function useRecorderLock() {
  const rt = useRuntime();
  const [locked, setLocked] = useState(false);

  function acquire() {
    rt.multitab.broadcast('recorder-lock', { action: 'lock' });
    setLocked(true);
  }

  function release() {
    rt.multitab.broadcast('recorder-lock', { action: 'unlock' });
    setLocked(false);
  }

  useEffect(() => {
    const unsub = rt.multitab.onBroadcast?.((msg:any)=>{
      if (msg.type !== 'recorder-lock') return;
      if (msg.payload?.action === 'lock') setLocked(true);
      if (msg.payload?.action === 'unlock') setLocked(false);
    });
    return ()=>{ if(typeof unsub==='function') unsub(); };
  },[]);

  return {
    locked,
    acquire,
    release
  };
}
