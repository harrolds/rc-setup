export class MultiTabChannel {
  private channel: BroadcastChannel;
  private listeners: Array<(msg:any)=>void> = [];

  constructor(name='dreamdrop-multitab'){
    this.channel = new BroadcastChannel(name);
    this.channel.onmessage = (e)=> this.notify(e.data);
  }

  send(msg:any){
    this.channel.postMessage(msg);
  }

  onMessage(cb:(msg:any)=>void){
    this.listeners.push(cb);
  }

  private notify(msg:any){
    this.listeners.forEach(cb=>cb(msg));
  }
}