import { buildImagePrompt } from './ImagePromptBuilder';
import { generateImage } from './ImageGenerationAPI';
import { ImageRequestQueue } from './queue/ImageRequestQueue';

const queue = new ImageRequestQueue();

export class ImageGenerationOrchestrator {
  async run(text:string, ctx:any={}){
    const prompt = buildImagePrompt(text, ctx);
    queue.push({prompt, style:ctx.style || ctx.bucket});

    const out = await queue.next(async (job)=> generateImage(job));
    return out;
  }
}
