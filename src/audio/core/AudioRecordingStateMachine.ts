export type RecordingState = 'idle'|'init'|'recording'|'paused'|'stopping'|'error';

export class AudioRecordingStateMachine {
  private state: RecordingState = 'idle';
  getState(){ return this.state; }

  transition(next:RecordingState){
    const allowed={
      idle:['init'],
      init:['recording','error'],
      recording:['paused','stopping','error'],
      paused:['recording','stopping','error'],
      stopping:['idle','error'],
      error:['idle']
    };
    if(allowed[this.state]?.includes(next)){ this.state = next; }
    else{ throw new Error(`Invalid transition ${this.state} -> ${next}`); }
  }
}