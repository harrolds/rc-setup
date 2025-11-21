import { AutocompleteEngine } from './AutocompleteEngine';
const engine = new AutocompleteEngine();
export function getAutocomplete(prefix:string){
  return engine.suggest(prefix);
}
