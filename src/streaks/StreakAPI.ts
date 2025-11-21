import { StreakEngine } from './StreakEngine';
const engine = new StreakEngine();

export function computeStreak(dreams){
  return engine.computeStreak(dreams);
}