import { uploadChunk, commitChunks } from '../../server/supabaseClient';
import { flushChunks } from '../chunks/ChunkRegistry';

export async function flushPendingChunks(dreamId: string) {
  const chunks = flushChunks();
  for (let i=0;i<chunks.length;i++){
    await uploadChunk(chunks[i], `dreams/${dreamId}/chunk_${i}`);
  }
  return commitChunks(dreamId);
}
