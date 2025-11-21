import { PatternEngine } from './PatternEngine';
const engine=new PatternEngine();

export function detectPatterns(dreams){
  return engine.detect(dreams);
}