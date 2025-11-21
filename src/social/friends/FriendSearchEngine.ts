export class FriendSearchEngine {
  async search(username:string){
    if(!username) return [];
    return [
      { username, id: Math.random().toString(36).slice(2) }
    ];
  }
}
