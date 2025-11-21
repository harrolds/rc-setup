import { getStyleBucketPrompt } from './styles/styleBuckets';

export function buildImagePrompt(text:string, context:any={}){
  const bucket = context.bucket || 'dreamlike';
  const bucketPrompt = getStyleBucketPrompt(bucket);
  return `${bucketPrompt}: ${text}`;
}
