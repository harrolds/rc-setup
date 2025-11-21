// C-7.1 Supabase Auth Integration
import { createClient } from '@supabase/supabase-js';

export class CloudAuth {
  constructor(url, key) {
    this.supabase = createClient(url, key);
  }

  async signIn(email, password) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }

  async getSession() {
    const { data } = await this.supabase.auth.getSession();
    return data.session || null;
  }

  onAuthStateChange(callback) {
    return this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }
}
