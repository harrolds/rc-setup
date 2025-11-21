import { STYLE_BUCKETS } from './StyleBucketConfig';
export type StyleBucketType = keyof typeof STYLE_BUCKETS;
export function getStyleBucketPrompt(bucket: StyleBucketType){
  return STYLE_BUCKETS[bucket].prompt;
}
