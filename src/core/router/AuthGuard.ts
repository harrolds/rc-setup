// C-18.3 Auth Guard Integration (Router-Level Protection)

export class AuthGuard {
  constructor(sessionController) {
    this.session = sessionController;
  }

  protect(callback) {
    if (!this.session.requireAuth()) return;
    callback();
  }

  redirectIfLoggedIn() {
    if (this.session.isLoggedIn()) {
      window.location.hash = "#/home";
      return true;
    }
    return false;
  }
}
