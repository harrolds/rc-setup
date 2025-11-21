// C-18.4 Onboarding Flow Controller

import { OnboardingState } from "./OnboardingState";

export class OnboardingController {
  constructor(supabase) {
    this.supabase = supabase;
    this.state = new OnboardingState(supabase);
  }

  async process(user) {
    const status = await this.state.load(user.id);

    if (!status.completed) {
      window.location.hash = "#/onboarding";
      return false;
    }
    return true;
  }

  async complete(user) {
    await this.state.save(user.id, { completed: true, step: 999 });
  }
}
