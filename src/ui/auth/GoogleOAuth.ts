// C-14.0.a Google OAuth Integration

export class GoogleOAuth {
  constructor(auth) {
    this.auth = auth;
  }

  attachLoginButton() {
    const btn = document.getElementById("login-google");
    if (btn) {
      btn.onclick = () => this.login();
    }
  }

  async login() {
    await this.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
  }
}
