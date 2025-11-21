import { EngagementStats } from './EngagementModel';

export class EngagementEngine {
  private store:Record<string, EngagementStats> = {};

  get(dreamId:string):EngagementStats{
    if(!this.store[dreamId]){
      this.store[dreamId]={ dreamId, likes:0, shares:0, views:0 };
    }
    return this.store[dreamId];
  }

  like(dreamId:string){
    const s=this.get(dreamId);
    s.likes+=1;
    return s;
  }

  share(dreamId:string){
    const s=this.get(dreamId);
    s.shares+=1;
    return s;
  }

  view(dreamId:string){
    const s=this.get(dreamId);
    s.views+=1;
    return s;
  }
}
