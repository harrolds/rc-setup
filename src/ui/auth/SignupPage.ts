// C-18.1 Signup Page (Email + Password)

export class SignupPage {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async render(root) {
    root.innerHTML = `
      <div class="auth-page">
        <h2>Account aanmaken</h2>

        <input id="signup-email" class="auth-input" placeholder="E-mail">
        <input id="signup-pass" class="auth-input" placeholder="Wachtwoord" type="password">

        <button id="signup-btn" class="auth-btn magic-btn">Aanmaken</button>
        <div class="auth-divider"></div>
        <button id="to-login" class="auth-btn">Al een account? Inloggen</button>
      </div>
    `;

    document.getElementById("signup-btn").onclick = async () => {
      const email = document.getElementById("signup-email").value.trim();
      const pass = document.getElementById("signup-pass").value.trim();
      if (!email || !pass) return alert("Vul alle velden in");

      const { error } = await this.supabase.auth.signUp({ email, password: pass });
      if (error) return alert(error.message);

      alert("Account aangemaakt! Controleer je inbox.");
      window.location.hash = "#/login";
    };

    document.getElementById("to-login").onclick = () => {
      window.location.hash = "#/login";
    };
  }
}
