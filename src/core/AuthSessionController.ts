// C-18.2 AuthSessionController
export class AuthSessionController {
  constructor(supabase) {
    this.supabase = supabase;
    this.currentUser = null;
  }

  async init() {
    const { data } = await this.supabase.auth.getSession();
    this.currentUser = data.session?.user || null;

    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.currentUser = session?.user || null;
    });
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  getUser() {
    return this.currentUser;
  }

  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.hash = "#/login";
      return false;
    }
    return true;
  }
}
