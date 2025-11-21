export class StreakEngine {
  computeStreak(dreams){
    if(!dreams || dreams.length===0) return 0;
    const dates = dreams
      .map(d=> new Date(d.createdAt || d.date || d.timestamp))
      .sort((a,b)=> b - a);

    let streak = 1;
    for(let i=1;i<dates.length;i++){
      const diff = (dates[i-1] - dates[i]) / (1000*60*60*24);
      if(diff <= 1.2 && diff >= 0.8) streak++;
      else break;
    }
    return streak;
  }
}