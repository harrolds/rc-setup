// C-10.6 DreamFeedRenderer – AI-aware feed list
import { AIUIBinding } from "../ai/AIUIBinding";

export class DreamFeedRenderer {
  constructor(kernel) {
    this.kernel = kernel;
    this.binding = new AIUIBinding(kernel);
    this.state = {
      dreams: []
    };
  }

  async loadInitial(dreams, onRender) {
    this.state.dreams = dreams.map(d => ({
      id: d.id,
      title: d.title || "Naamloze droom",
      visual: null,
      summary: null,
      status: { transcript:false, summary:false, analysis:false, visual:false }
    }));

    onRender(this.render());

    for (const dream of this.state.dreams) {
      this.binding.bindStatus(dream.id, (progress) => {
        dream.status = progress;
        onRender(this.render());
      });

      this.binding.bindResults(dream.id, (result) => {
        if (result.visual_url) dream.visual = result.visual_url;
        if (result.summary) dream.summary = result.summary;
        onRender(this.render());
      });
    }
  }

  renderCard(dream) {
    const statusText = dream.status.visual
      ? "Voltooid"
      : dream.status.analysis
      ? "Analyseren..."
      : dream.status.summary
      ? "Samenvatten..."
      : dream.status.transcript
      ? "Transcriberen..."
      : "Bezig...";

    const thumb = dream.visual
      ? `<img class='feed-thumb' src='${dream.visual}'/>`
      : `<div class='feed-thumb-skeleton'></div>`;

    return `
      <div class='feed-card'>
        ${thumb}
        <div class='feed-info'>
          <h3>${dream.title}</h3>
          <p class='feed-status'>${statusText}</p>
        </div>
      </div>
    `;
  }

  render() {
    const cards = this.state.dreams.map(d => this.renderCard(d)).join("");
    return {
      type: "dream-feed",
      html: `<div class='dream-feed'>${cards}</div>`
    };
  }
}
