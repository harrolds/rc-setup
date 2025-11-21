export class AISuggestionState {
  private last:any = null;
  update(data:any){ this.last = data; }
  snapshot(){ return this.last; }
}
