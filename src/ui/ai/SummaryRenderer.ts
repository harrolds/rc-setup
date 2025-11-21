// C-10.3 Summary Renderer
import { AIUIBinding } from './AIUIBinding';

export class SummaryRenderer {
  constructor(kernel) {
    this.kernel = kernel;
    this.binding = new AIUIBinding(kernel);
    this.state = {
      loading: true,
      summary: null
    };
  }

  attach(dreamId, onRender) {
    this.binding.bindStatus(dreamId, (progress) => {
      if (!progress.summary) {
        this.state.loading = true;
        onRender(this.render());
      }
    });

    this.binding.bindResults(dreamId, (result) => {
      if (result && result.summary) {
        this.state.summary = result.summary;
        this.state.loading = false;
        onRender(this.render());
      }
    });
  }

  render() {
    if (this.state.loading) {
      return {
        type: "loading",
        html: "<div class='summary-skeleton'></div>"
      };
    }

    if (!this.state.summary) {
      return {
        type: "empty",
        html: "<div class='summary-empty'>Geen samenvatting beschikbaar.</div>"
      };
    }

    const safeHtml = this.state.summary
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>");

    return {
      type: "summary",
      html: `<div class='summary-block'>${safeHtml}</div>`
    };
  }
}
