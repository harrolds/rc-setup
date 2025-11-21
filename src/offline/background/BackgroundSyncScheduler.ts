export class BackgroundSyncScheduler {
  private controller;
  private intervalId=null;

  constructor(controller){
    this.controller=controller;
  }

  start(intervalMs=15000){
    if(this.intervalId) return;
    this.intervalId=setInterval(()=>{
      this.controller.run();
    }, intervalMs);
  }

  stop(){
    if(this.intervalId){
      clearInterval(this.intervalId);
      this.intervalId=null;
    }
  }
}