import { TagEngine } from './TagEngine';
const engine=new TagEngine();
export async function extractTags(text:string){ return engine.extract(text); }
