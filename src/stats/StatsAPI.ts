import { StatsEngine } from './StatsEngine';
const engine=new StatsEngine();
export function computeStats(dreams){
  return {
    total: engine.countDreams(dreams),
    tags: engine.tagFrequency(dreams),
    moods: engine.moodDistribution(dreams)
  };
}