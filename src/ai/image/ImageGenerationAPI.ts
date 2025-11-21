import { ImageGenerationEngine } from './ImageGenerationEngine';
const engine = new ImageGenerationEngine();
export async function generateImage(req:any){
  return engine.generate(req);
}
