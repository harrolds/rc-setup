import { FeedEntry } from './FeedModel';

export class FeedEngine {
  private items:FeedEntry[]=[];

  add(entry:FeedEntry){
    this.items.push(entry);
  }

  listPublic(){
    return this.items.filter(i=>i.visibility==='public')
      .sort((a,b)=>b.timestamp - a.timestamp);
  }

  listFriends(friendIds:string[]){
    return this.items
      .filter(i=> i.visibility!=='private' && friendIds.includes(i.ownerId))
      .sort((a,b)=>b.timestamp - a.timestamp);
  }
}
