import { MoodEngine } from './MoodEngine';
const engine=new MoodEngine();
export async function detectMood(text:string){ return engine.detect(text); }
