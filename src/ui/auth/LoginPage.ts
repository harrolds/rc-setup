// C-18.1 Login Page (Email + Password)

export class LoginPage {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async render(root) {
    root.innerHTML = `
      <div class="auth-page">
        <h2>Inloggen met e-mail</h2>

        <input id="login-email" class="auth-input" placeholder="E-mail">
        <input id="login-pass" class="auth-input" placeholder="Wachtwoord" type="password">

        <button id="login-btn" class="auth-btn magic-btn">Inloggen</button>
        <div class="auth-divider"></div>
        <button id="to-signup" class="auth-btn">Account aanmaken</button>
      </div>
    `;

    document.getElementById("login-btn").onclick = async () => {
      const email = document.getElementById("login-email").value.trim();
      const pass = document.getElementById("login-pass").value.trim();
      if (!email || !pass) return alert("Vul alle velden in");

      const { error } = await this.supabase.auth.signInWithPassword({ email, password: pass });
      if (error) return alert(error.message);

      window.location.hash = "#/home";
    };

    document.getElementById("to-signup").onclick = () => {
      window.location.hash = "#/signup";
    };
  }
}
