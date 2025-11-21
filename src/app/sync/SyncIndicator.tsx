import React from 'react';
import { useOfflineSync } from './useOfflineSync';

export default function SyncIndicator() {
  const sync = useOfflineSync();

  return (
    <div style={{padding:'8px', background:'#eee'}}>
      Pending Sync: {sync.pending}
      <button onClick={sync.triggerSync}>Sync Now</button>
    </div>
  );
}
