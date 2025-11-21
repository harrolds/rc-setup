import React from 'react';
import { detectPatterns } from '../../patterns/PatternAPI';

export function PatternPanel({ dreams }){
  const patterns = detectPatterns(dreams||[]);
  return (
    <div>
      <h2>AI Pattern Detection</h2>
      {patterns.length===0 && <p>No significant patterns detected.</p>}
      {patterns.map((p,i)=> <p key={i}>{p}</p>)}
    </div>
  );
}