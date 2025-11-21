import React from 'react';
import { useRecorderLock } from './RecorderLock';

export default function RecorderLockBanner() {
  const lock = useRecorderLock();

  if (!lock.locked) return null;

  return (
    <div style={{
      position:'fixed',
      top:0,
      left:0,
      right:0,
      background:'#cc0000',
      color:'#fff',
      padding:'10px',
      textAlign:'center',
      zIndex:999999
    }}>
      Recorder in use in another tab.
    </div>
  );
}
