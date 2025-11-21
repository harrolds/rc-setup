export class ImageGenerationEngine {
  async generate(request:any){
    return {
      url: "https://placeholder.image/" + Math.random().toString(36).slice(2),
      meta: { prompt: request.prompt, style: request.style || "default" }
    };
  }
}
