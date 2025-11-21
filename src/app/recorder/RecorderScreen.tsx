import React from 'react';
import { useRecorderBindings } from './RecorderBindings';

export default function RecorderScreen() {
  const rec = useRecorderBindings();

  return (
    <div>
      <h2>Recorder</h2>
      <p>Status: {rec.status}</p>

      {rec.status==='idle' && <button onClick={rec.start}>Start</button>}
      {rec.status==='recording' && <button onClick={rec.pause}>Pause</button>}
      {rec.status==='paused' && <button onClick={rec.resume}>Resume</button>}
      {(rec.status==='recording' || rec.status==='paused') && (
        <button onClick={rec.stop}>Stop</button>
      )}
    </div>
  );
}
