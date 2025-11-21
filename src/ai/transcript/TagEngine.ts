export class TagEngine {
  async extract(text:string){
    if(!text) return [];
    const base = text.toLowerCase();
    const tags:string[]=[];
    if(base.includes('water')) tags.push('water');
    if(base.includes('falling')) tags.push('falling');
    if(base.includes('chase')) tags.push('chase');
    return tags;
  }
}
