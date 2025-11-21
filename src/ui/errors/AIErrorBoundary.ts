// C-12.2 AI Error Boundary & Failure UX Layer

export class AIErrorBoundary {
  static renderError(type, detail) {
    return {
      type: "error",
      html: `
        <div class="ai-error-box">
          <h3>Fout tijdens ${type}</h3>
          <p>${detail || "Er ging iets mis."}</p>
          <button class="retry-btn" onclick="window.dreamdropRetry && window.dreamdropRetry('${type}')">
            Opnieuw proberen
          </button>
        </div>
      `
    };
  }

  static wrap(asyncFn, type, onError) {
    return async (...args) => {
      try {
        return await asyncFn(...args);
      } catch (err) {
        console.error("AI failure:", err);
        onError(AIErrorBoundary.renderError(type, err.message));
        return null;
      }
    };
  }
}
