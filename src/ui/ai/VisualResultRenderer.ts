// C-10.2 Visual Result Renderer
import { AIUIBinding } from './AIUIBinding';

export class VisualResultRenderer {
  constructor(kernel) {
    this.kernel = kernel;
    this.binding = new AIUIBinding(kernel);
    this.state = {
      loading: true,
      visualUrl: null
    };
  }

  attach(dreamId, onRender) {
    this.binding.bindStatus(dreamId, (progress) => {
      if (!progress.visual) {
        this.state.loading = true;
        onRender(this.render());
      }
    });

    this.binding.bindResults(dreamId, (result) => {
      if (result && result.visual_url) {
        this.state.visualUrl = result.visual_url;
        this.state.loading = false;
        onRender(this.render());
      }
    });
  }

  render() {
    if (this.state.loading) {
      return {
        type: "loading",
        html: "<div class='visual-skeleton'></div>"
      };
    }

    if (!this.state.visualUrl) {
      return {
        type: "empty",
        html: "<div class='visual-empty'>Geen AI-visual beschikbaar.</div>"
      };
    }

    return {
      type: "visual",
      html: `<img class='dream-visual' src='${this.state.visualUrl}' alt='Dream Visual'/>`
    };
  }
}
