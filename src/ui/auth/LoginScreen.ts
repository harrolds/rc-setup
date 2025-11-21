// C-14.0 Login Screen

export class LoginScreen {
  constructor(auth) {
    this.auth = auth;
  }

  mount(root) {
    root.innerHTML = `
      <div class="auth-box">
        <h2>Inloggen</h2>
        <input id="login-email" placeholder="E-mail" />
        <input id="login-pass" type="password" placeholder="Wachtwoord" />
        <button id="login-btn">Inloggen</button>
      
<button id="login-google" class="oauth-btn google">Inloggen met Google</button>
</div>
    `;
    document.getElementById("login-btn").onclick = () => this.login();
  }

  async login() {
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;
    await this.auth.signInWithPassword({ email, password: pass });
  }
}
