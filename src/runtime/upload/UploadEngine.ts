// C-8.1 Supabase Storage Upload Engine
import { v4 as uuid } from 'uuid';

export class UploadEngine {
  constructor(kernel) {
    this.kernel = kernel;
  }

  async uploadChunk(dreamId, chunk) {
    const fileId = uuid();
    const path = `audio/${this.kernel.cloud.auth.supabase.auth.user().id}/${dreamId}/${fileId}.webm`;

    const { data, error } = await this.kernel.cloud.auth.supabase.storage
      .from('dreamdrop-audio')
      .upload(path, chunk.data, { contentType: chunk.mime });

    if (error) throw error;

    await this.kernel.cloud.db.registerChunk({
      id: fileId,
      dream_id: dreamId,
      user_id: this.kernel.cloud.auth.supabase.auth.user().id,
      storage_path: path,
      sequence: chunk.sequence,
      duration_ms: chunk.duration,
      mime: chunk.mime,
      size: chunk.data.byteLength
    });

    return fileId;
  }
}
