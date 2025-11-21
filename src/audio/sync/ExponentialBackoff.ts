export class Backoff {
  private delay=500;
  private max=10000;
  async wait(){
    await new Promise(res=>setTimeout(res,this.delay));
    this.delay=Math.min(this.delay*2,this.max);
  }
  reset(){ this.delay=500; }
}