export class MoodEngine {
  async detect(text:string){
    if(!text) return 'neutral';
    const t=text.toLowerCase();
    if(t.includes('fear') || t.includes('scare')) return 'fear';
    if(t.includes('happy') || t.includes('joy')) return 'happy';
    if(t.includes('sad')) return 'sad';
    return 'neutral';
  }
}
