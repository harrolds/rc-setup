import { FeedEngine } from './FeedEngine';
import type { FeedEntry } from './FeedModel';

const engine=new FeedEngine();

export function publishToFeed(entry:FeedEntry){
  engine.add(entry);
  return {ok:true};
}

export function getPublicFeed(){
  return engine.listPublic();
}

export function getFriendsFeed(friendIds:string[]){
  return engine.listFriends(friendIds);
}
