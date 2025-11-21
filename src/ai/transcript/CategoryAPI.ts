import { CategoryEngine } from './CategoryEngine';
const engine=new CategoryEngine();
export async function classifyCategory(text:string){ return engine.classify(text); }
