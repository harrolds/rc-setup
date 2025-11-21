// C-15.1 (B) Feed Filter State

export class FeedFilterState {
  constructor() {
    this.search = "";
    this.sort = "newest";
    this.processing = "all"; 
    this.favorite = "all";  
  }
}
