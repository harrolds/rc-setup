import { DreamShareSettings } from './DreamShareModel';

export class DreamShareEngine {
  async setShare(settings: DreamShareSettings){
    return { ok:true, applied:settings };
  }

  async getShare(dreamId:string){
    return {
      visibility:'private',
      dreamId
    };
  }
}
