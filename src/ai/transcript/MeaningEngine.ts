export class MeaningEngine {
  async interpret(text:string){
    if(!text) return 'No meaning available';
    const t=text.toLowerCase();
    if(t.includes('water')) return 'Dream indicates emotional flow or cleansing.';
    if(t.includes('falling')) return 'Represents loss of control or instability.';
    if(t.includes('chase')) return 'Reflects avoidance or unresolved stress.';
    return 'General subconscious processing.';
  }
}
