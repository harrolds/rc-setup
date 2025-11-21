import { MeaningEngine } from './MeaningEngine';
const engine=new MeaningEngine();
export async function interpretDream(text:string){ return engine.interpret(text); }
