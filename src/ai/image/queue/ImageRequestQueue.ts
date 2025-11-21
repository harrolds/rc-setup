export class ImageRequestQueue {
  private q:any[]=[];
  private busy=false;

  push(item:any){ this.q.push(item); }
  isBusy(){ return this.busy; }
  size(){ return this.q.length; }

  async next(handler:(req:any)=>Promise<any>){
    if(this.busy || this.q.length===0) return null;
    this.busy=true;
    const item=this.q.shift();
    try{
      const res=await handler(item);
      return res;
    } finally {
      this.busy=false;
    }
  }
}
