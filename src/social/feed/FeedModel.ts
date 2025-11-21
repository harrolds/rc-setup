export interface FeedEntry {
  dreamId:string;
  ownerId:string;
  visibility:'public'|'friends'|'private';
  timestamp:number;
}
