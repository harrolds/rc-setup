// C-10.1 Transcript UI Renderer
import { AIUIBinding } from './AIUIBinding';

export class TranscriptRenderer {
  constructor(kernel) {
    this.kernel = kernel;
    this.binding = new AIUIBinding(kernel);
    this.state = {
      transcript: null,
      loading: true
    };
  }

  attach(dreamId, onRender) {
    // Start live status binding
    this.binding.bindStatus(dreamId, (progress) => {
      if (!progress.transcript) {
        this.state.loading = true;
        onRender(this.render());
      }
    });

    // Start result binding
    this.binding.bindResults(dreamId, (result) => {
      if (result && result.text) {
        this.state.transcript = result.text;
        this.state.loading = false;
        onRender(this.render());
      }
    });
  }

  render() {
    if (this.state.loading) {
      return {
        type: "loading",
        html: "<div class='loading-skeleton transcript-skeleton'></div>"
      };
    }

    if (!this.state.transcript) {
      return {
        type: "empty",
        html: "<div class='empty-transcript'>Geen transcript beschikbaar.</div>"
      };
    }

    const safeText = this.state.transcript
      .replace(/\n/g, "<br/>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return {
      type: "transcript",
      html: `<div class='transcript-block'>${safeText}</div>`
    };
  }
}
