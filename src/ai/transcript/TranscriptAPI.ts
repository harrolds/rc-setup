import { TranscriptOrchestrator } from './TranscriptOrchestrator';
const orch = new TranscriptOrchestrator();

export async function runTranscriptPipeline(text:string){
  return orch.run(text);
}
