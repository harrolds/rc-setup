// C-14.0 Password Reset Screen

export class ResetScreen {
  constructor(auth) {
    this.auth = auth;
  }

  mount(root) {
    root.innerHTML = `
      <div class="auth-box">
        <h2>Wachtwoord herstellen</h2>
        <input id="reset-email" placeholder="E-mail" />
        <button id="reset-btn">Reset link versturen</button>
      </div>
    `;
    document.getElementById("reset-btn").onclick = () => this.reset();
  }

  async reset() {
    const email = document.getElementById("reset-email").value;
    await this.auth.resetPasswordForEmail(email);
  }
}
