// Minimal Supabase Client Mock for Dreamdrop
export async function uploadChunk(chunk: Blob, path: string) {
  return { ok: true, path };
}
export async function commitChunks(dreamId: string) {
  return { ok: true, dreamId };
}
