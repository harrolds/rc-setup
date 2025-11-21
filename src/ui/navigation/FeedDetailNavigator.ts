// C-10.7 Feed → Detail Navigation Binding
import { DreamDetailBinder } from "../ai/DreamDetailBinder";

export class FeedDetailNavigator {
  constructor(kernel) {
    this.kernel = kernel;
    this.detail = new DreamDetailBinder(kernel);
    this.activeDream = null;
    this.listeners = [];
  }

  onNavigate(cb) {
    this.listeners.push(cb);
  }

  navigateTo(dreamId, onRender) {
    this.activeDream = dreamId;

    // Trigger UI listeners (e.g. route update, panel open)
    this.listeners.forEach(cb => cb(dreamId));

    this.detail.attach(dreamId, (detailOutput) => {
      onRender(this.render(detailOutput));
    });
  }

  render(detailOutput) {
    return {
      type: "dream-detail-page",
      html: `
        <div class='dream-detail-container'>
          <button class='back-btn' onclick='history.back()'>← Terug</button>
          ${detailOutput.html}
        </div>
      `
    };
  }
}
