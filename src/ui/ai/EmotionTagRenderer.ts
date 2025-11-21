// C-10.4 Emotion Tag Renderer
import { AIUIBinding } from './AIUIBinding';

export class EmotionTagRenderer {
  constructor(kernel) {
    this.kernel = kernel;
    this.binding = new AIUIBinding(kernel);
    this.state = {
      loading: true,
      emotions: null
    };
  }

  attach(dreamId, onRender) {
    // Status binding (wait until emotion analysis is done)
    this.binding.bindStatus(dreamId, (progress) => {
      if (!progress.analysis) {
        this.state.loading = true;
        onRender(this.render());
      }
    });

    // Result binding (read emotion tags)
    this.binding.bindResults(dreamId, (result) => {
      if (result && result.emotions) {
        this.state.emotions = Array.isArray(result.emotions)
          ? result.emotions
          : [];
        this.state.loading = false;
        onRender(this.render());
      }
    });
  }

  render() {
    if (this.state.loading) {
      return {
        type: "loading",
        html: "<div class='emotion-skeleton'></div>"
      };
    }

    if (!this.state.emotions || this.state.emotions.length === 0) {
      return {
        type: "empty",
        html: "<div class='emotion-empty'>Geen emotietags gevonden.</div>"
      };
    }

    const tags = this.state.emotions
      .map(tag => `<span class='emotion-chip'>${tag}</span>`)
      .join("");

    return {
      type: "emotions",
      html: `<div class='emotion-tags'>${tags}</div>`
    };
  }
}
