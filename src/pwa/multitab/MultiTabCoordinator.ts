import { MultiTabChannel } from './MultiTabChannel';

export class MultiTabCoordinator {
  private channel = new MultiTabChannel();
  private tabId = crypto.randomUUID();
  private subscribers: Array<(msg:any)=>void> = [];

  constructor(){
    this.channel.onMessage((msg)=>{
      if(msg.sender !== this.tabId){
        this.subscribers.forEach(cb=>cb(msg));
      }
    });
  }

  broadcast(type:string,payload:any={}){
    this.channel.send({
      sender: this.tabId,
      type,
      payload,
      timestamp: Date.now()
    });
  }

  onBroadcast(cb:(msg:any)=>void){
    this.subscribers.push(cb);
  }
}