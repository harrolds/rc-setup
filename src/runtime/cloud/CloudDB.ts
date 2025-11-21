// C-7.2 Supabase Database Adapter
import { createClient } from '@supabase/supabase-js';

export class CloudDB {
  constructor(url, key) {
    this.supabase = createClient(url, key);
  }

  // Generic fetch
  async from(table) {
    return this.supabase.from(table);
  }

  // Dreams
  async createDream(payload) {
    const { data, error } = await this.supabase.from('dreams').insert(payload).select().single();
    if (error) throw error;
    return data;
  }

  async updateDream(id, patch) {
    const { data, error } = await this.supabase.from('dreams').update(patch).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async listDreams() {
    const { data, error } = await this.supabase.from('dreams').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  // Chunks
  async registerChunk(meta) {
    const { data, error } = await this.supabase.from('dream_chunks').insert(meta).select().single();
    if (error) throw error;
    return data;
  }

  // AI Results
  async saveAIResult(meta) {
    const { data, error } = await this.supabase.from('ai_results').insert(meta).select().single();
    if (error) throw error;
    return data;
  }

  // Sync Shadow
  async saveShadow(meta) {
    const { data, error } = await this.supabase.from('sync_shadow').upsert(meta).select().single();
    if (error) throw error;
    return data;
  }

  async getShadow(dream_id) {
    const { data, error } = await this.supabase.from('sync_shadow').select('*').eq('dream_id', dream_id).single();
    if (error) return null;
    return data;
  }
}
