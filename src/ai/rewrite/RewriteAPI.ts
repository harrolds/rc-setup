import { RewriteEngine } from './RewriteEngine';
const engine = new RewriteEngine();
export async function getRewriteSuggestions(text: string){
  return engine.suggest(text);
}
