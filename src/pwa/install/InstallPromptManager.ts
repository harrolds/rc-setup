export class InstallPromptManager {
  private deferred:any=null;

  capture(event:any){
    event.preventDefault();
    this.deferred = event;
  }

  prompt(){
    if(this.deferred){
      this.deferred.prompt();
      this.deferred=null;
    }
  }
}
