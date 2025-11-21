// C-18.4 Onboarding Wizard UI

export class OnboardingPage {
  constructor(supabase, onboardingController) {
    this.supabase = supabase;
    this.ctrl = onboardingController;
  }

  async render(root, user) {
    root.innerHTML = `
      <div class="onboarding-page">
        <h2>Welkom bij Dreamdrop</h2>
        <p>We maken je account klaar.</p>

        <button id="finish-onboarding" class="onboarding-btn">
          Start de app
        </button>
      </div>
    `;

    document.getElementById("finish-onboarding").onclick = async () => {
      await this.ctrl.complete(user);
      window.location.hash = "#/home";
    };
  }
}
