export class SummaryEngine {
  async summarize(text:string){
    if(!text) return '';
    return `[summary] ${text.slice(0,120)}...`;
  }
}
