// C-10.5 DreamDetailBinder – Unified AI Dream Detail Page
import { TranscriptRenderer } from './TranscriptRenderer';
import { VisualResultRenderer } from './VisualResultRenderer';
import { SummaryRenderer } from './SummaryRenderer';
import { EmotionTagRenderer } from './EmotionTagRenderer';

export class DreamDetailBinder {
  constructor(kernel) {
    this.kernel = kernel;
    this.transcript = new TranscriptRenderer(kernel);
    this.visual = new VisualResultRenderer(kernel);
    this.summary = new SummaryRenderer(kernel);
    this.emotions = new EmotionTagRenderer(kernel);

    this.state = {
      transcript: null,
      visual: null,
      summary: null,
      emotions: null
    };
  }

  attach(dreamId, onRender) {
    // Transcript binding
    this.transcript.attach(dreamId, (output) => {
      this.state.transcript = output;
      onRender(this.render());
    });

    // Visual binding
    this.visual.attach(dreamId, (output) => {
      this.state.visual = output;
      onRender(this.render());
    });

    // Summary binding
    this.summary.attach(dreamId, (output) => {
      this.state.summary = output;
      onRender(this.render());
    });

    // Emotion tags binding
    this.emotions.attach(dreamId, (output) => {
      this.state.emotions = output;
      onRender(this.render());
    });
  }

  renderSection(block) {
    if (!block) return "";
    return `<section class='dream-section'>${block.html}</section>`;
  }

  render() {
    return {
      type: "dream-detail",
      html: `
        <div class='dream-detail-page'>
          ${this.renderSection(this.state.visual)}
          ${this.renderSection(this.state.summary)}
          ${this.renderSection(this.state.transcript)}
          ${this.renderSection(this.state.emotions)}
        </div>
      `
    };
  }
}
