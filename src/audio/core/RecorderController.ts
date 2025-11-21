export class RecorderController {
  private mediaStream: MediaStream|null = null;
  private mediaRecorder: MediaRecorder|null = null;
  private stateMachine: any;

  constructor(stateMachine){ this.stateMachine = stateMachine; }

  async init(){
    this.stateMachine.transition('init');
    this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio:true });
    this.stateMachine.transition('recording');
    this.mediaRecorder = new MediaRecorder(this.mediaStream);
    return true;
  }

  pause(){
    if(this.mediaRecorder && this.mediaRecorder.state==='recording'){
      this.mediaRecorder.pause();
      this.stateMachine.transition('paused');
    }
  }

  resume(){
    if(this.mediaRecorder && this.mediaRecorder.state==='paused'){
      this.mediaRecorder.resume();
      this.stateMachine.transition('recording');
    }
  }

  stop(){
    if(this.mediaRecorder){
      this.mediaRecorder.stop();
      this.stateMachine.transition('stopping');
    }
    this.stateMachine.transition('idle');
  }
}