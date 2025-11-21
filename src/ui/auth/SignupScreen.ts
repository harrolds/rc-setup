// C-14.0 Signup Screen

export class SignupScreen {
  constructor(auth) {
    this.auth = auth;
  }

  mount(root) {
    root.innerHTML = `
      <div class="auth-box">
        <h2>Registreren</h2>
        <input id="reg-email" placeholder="E-mail" />
        <input id="reg-pass" type="password" placeholder="Wachtwoord" />
        <button id="reg-btn">Account maken</button>
      
<button id="login-google" class="oauth-btn google">Inloggen met Google</button>
</div>
    `;
    document.getElementById("reg-btn").onclick = () => this.register();
  }

  async register() {
    const email = document.getElementById("reg-email").value;
    const pass = document.getElementById("reg-pass").value;
    await this.auth.signUp({ email, password: pass });
  }
}
