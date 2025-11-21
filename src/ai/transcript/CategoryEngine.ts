export class CategoryEngine {
  async classify(text:string){
    if(!text) return 'unknown';
    const t=text.toLowerCase();
    if(t.includes('family')) return 'relationships';
    if(t.includes('work')) return 'stress';
    if(t.includes('travel')) return 'adventure';
    return 'general';
  }
}
