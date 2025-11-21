import React from 'react';
import { useFallbackManager } from './FallbackManager';

export default function FallbackOverlay() {
  const fm = useFallbackManager();

  const lowBattery = fm.isLowBattery();
  const lowMemory = fm.isLowMemory();
  const offline = fm.isOffline();

  if (!lowBattery && !lowMemory && !offline) return null;

  let message = '';
  if (offline) message = 'Offline mode activated.';
  else if (lowBattery) message = 'Battery saver mode active.';
  else if (lowMemory) message = 'Low-memory mode active.';

  return (
    <div style={{
      position:'fixed',
      bottom:0,
      left:0,
      right:0,
      background:'#222',
      color:'#fff',
      padding:'12px',
      textAlign:'center',
      fontSize:'14px',
      zIndex:99999
    }}>
      {message}
    </div>
  );
}
