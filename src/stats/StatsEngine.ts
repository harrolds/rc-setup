export class StatsEngine {
  countDreams(dreams){ return dreams.length; }
  tagFrequency(dreams){
    const freq={};
    dreams.forEach(d=> (d.tags||[]).forEach(t=> freq[t]=(freq[t]||0)+1 ));
    return freq;
  }
  moodDistribution(dreams){
    const dist={};
    dreams.forEach(d=>{ const m=d.mood||"unknown"; dist[m]=(dist[m]||0)+1; });
    return dist;
  }
}