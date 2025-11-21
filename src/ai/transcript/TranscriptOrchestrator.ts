export class TranscriptOrchestrator {

  maxRetries = 2;
  delayMs = 150;

  private async delay(ms:number) {
    return new Promise(res=>setTimeout(res, ms));
  }

  async run(text:string){
    const result:any = {
      summary: null,
      tags: [],
      mood: null,
      category: null,
      meaning: null,
      errors: []
    };

    // Summary
    for(let i=0;i<=this.maxRetries;i++) {
      try {
        const mod = await import('./SummaryAPI');
        result.summary = await mod.generateSummary(text);
        break;
      } catch(err:any) {
        result.errors.push("summary_fail_"+i);
        if(i===this.maxRetries) break;
        await this.delay(this.delayMs);
      }
    }

    // Tags
    for(let i=0;i<=this.maxRetries;i++) {
      try {
        const mod = await import('./TagAPI');
        result.tags = await mod.extractTags(text);
        break;
      } catch(err:any) {
        result.errors.push("tags_fail_"+i);
        if(i===this.maxRetries) break;
        await this.delay(this.delayMs);
      }
    }

    // Mood
    for(let i=0;i<=this.maxRetries;i++) {
      try {
        const mod = await import('./MoodAPI');
        result.mood = await mod.detectMood(text);
        break;
      } catch(err:any) {
        result.errors.push("mood_fail_"+i);
        if(i===this.maxRetries) break;
        await this.delay(this.delayMs);
      }
    }

    // Category
    for(let i=0;i<=this.maxRetries;i++) {
      try {
        const mod = await import('./CategoryAPI');
        result.category = await mod.classifyCategory(text);
        break;
      } catch(err:any) {
        result.errors.push("category_fail_"+i);
        if(i===this.maxRetries) break;
        await this.delay(this.delayMs);
      }
    }

    // Meaning
    for(let i=0;i<=this.maxRetries;i++) {
      try {
        const mod = await import('./MeaningAPI');
        result.meaning = await mod.interpretDream(text);
        break;
      } catch(err:any) {
        result.errors.push("meaning_fail_"+i);
        if(i===this.maxRetries) break;
        await this.delay(this.delayMs);
      }
    }

    return result;
  }
}
