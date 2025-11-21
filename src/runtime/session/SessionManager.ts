// C-13.2 Multi-device Session Handling

export class SessionManager {
  constructor(supabase, syncEngine) {
    this.supabase = supabase;
    this.syncEngine = syncEngine;
    this.session = null;
    this.listeners = [];
  }

  async init() {
    const { data } = await this.supabase.auth.getSession();
    this.session = data.session;
    this._notify();

    this.supabase.auth.onAuthStateChange((event, session) => {
      this.session = session;
      this._notify();
      if (session) this.syncEngine.resumePending();
    });
  }

  onChange(cb) {
    this.listeners.push(cb);
  }

  _notify() {
    for (const cb of this.listeners) cb(this.session);
  }

  isLoggedIn() {
    return !!this.session;
  }
}
