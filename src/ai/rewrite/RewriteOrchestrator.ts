import { getRewriteSuggestions } from './RewriteAPI';
import { getAutocomplete } from '../autocomplete/AutocompleteAPI';

export class RewriteOrchestrator {
  async run(text:string){
    const rewrites = await getRewriteSuggestions(text);
    const autos = getAutocomplete(text);
    return {
      rewrites,
      autos,
      combined: [...rewrites, ...autos]
    };
  }
}
