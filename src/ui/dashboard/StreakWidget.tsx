import React from 'react';
import { computeStreak } from '../../streaks/StreakAPI';

export function StreakWidget({ dreams }){
  const streak = computeStreak(dreams||[]);
  return (
    <div>
      <h2>Dream Streak</h2>
      <p>Current streak: {streak} days</p>
    </div>
  );
}