import { FriendSearchEngine } from './FriendSearchEngine';
const engine=new FriendSearchEngine();

export async function searchUsers(query:string){
  return engine.search(query);
}
