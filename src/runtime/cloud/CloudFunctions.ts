// C-7.3 Supabase Edge Functions Adapter
import { createClient } from '@supabase/supabase-js';

export class CloudFunctions {
  constructor(url, key) {
    this.supabase = createClient(url, key);
  }

  async callSyncDeltas(payload) {
    const { data, error } = await this.supabase.functions.invoke('syncDeltas', { body: payload });
    if (error) throw error;
    return data;
  }

  async registerChunkUpload(payload) {
    const { data, error } = await this.supabase.functions.invoke('registerChunkUpload', { body: payload });
    if (error) throw error;
    return data;
  }

  async triggerAI(payload) {
    const { data, error } = await this.supabase.functions.invoke('triggerAI', { body: payload });
    if (error) throw error;
    return data;
  }
}
