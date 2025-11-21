import React from 'react';
import { computeStats } from '../../stats/StatsAPI';

export function StatsPanel({ dreams }){
  const s = computeStats(dreams||[]);
  return (
    <div>
      <h2>Personal Stats</h2>
      <p>Total dreams: {s.total}</p>
    </div>
  );
}