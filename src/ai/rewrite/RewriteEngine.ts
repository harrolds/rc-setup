export class RewriteEngine {
  async suggest(text: string): Promise<string[]> {
    return [
      "Alternative phrasing: " + text,
      "More concise version: " + text,
      "Expressive rewrite: " + text
    ];
  }
}
