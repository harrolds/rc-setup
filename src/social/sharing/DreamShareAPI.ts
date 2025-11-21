import { DreamShareEngine } from './DreamShareEngine';
import type { DreamShareSettings } from './DreamShareModel';

const engine=new DreamShareEngine();

export async function updateShare(settings:DreamShareSettings){
  return engine.setShare(settings);
}

export async function fetchShare(dreamId:string){
  return engine.getShare(dreamId);
}
