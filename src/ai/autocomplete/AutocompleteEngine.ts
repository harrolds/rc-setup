export class AutocompleteEngine {
  suggest(prefix:string){
    return [
      prefix + "…", 
      "Possible continuation: " + prefix,
      "Next idea: " + prefix
    ];
  }
}
