// C-18.0 OAuth Login Page (Google / Apple / Magic Link)

export class OAuthPage {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async render(root) {
    root.innerHTML = `
      <div class="auth-page">
        <h2>Inloggen</h2>

        <button id="login-google" class="auth-btn google-btn">Login met Google</button>
        <button id="login-apple" class="auth-btn apple-btn">Login met Apple</button>

        <div class="auth-divider">of</div>

        <input id="email-input" class="auth-input" placeholder="E-mail">
        <button id="magic-btn" class="auth-btn magic-btn">Magic Link versturen</button>
      </div>
    `;

    document.getElementById("login-google").onclick = async () => {
      await this.supabase.auth.signInWithOAuth({ provider: "google" });
    };

    document.getElementById("login-apple").onclick = async () => {
      await this.supabase.auth.signInWithOAuth({ provider: "apple" });
    };

    document.getElementById("magic-btn").onclick = async () => {
      const email = document.getElementById("email-input").value.trim();
      if (!email) return alert("Voer een e-mail in");
      await this.supabase.auth.signInWithOtp({ email });
      alert("Magic Link verstuurd!");
    };
  }
}
