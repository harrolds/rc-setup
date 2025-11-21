import { SummaryEngine } from './SummaryEngine';
const engine = new SummaryEngine();

export async function generateSummary(text:string){
  return engine.summarize(text);
}
