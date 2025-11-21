// C-10.9 ViewportController – AppShell Page Switcher
import { DreamFeedRenderer } from "../feed/DreamFeedRenderer";
import { FeedDetailNavigator } from "../navigation/FeedDetailNavigator";
import { NavigationState } from "../navigation/NavigationState";

export class ViewportController {
  constructor(kernel) {
    this.kernel = kernel;

    this.nav = new NavigationState();
    this.feed = new DreamFeedRenderer(kernel);
    this.detailNav = new FeedDetailNavigator(kernel);

    this.mountPoint = null;
  }

  mount(element) {
    this.mountPoint = element;

    this.nav.onChange((state) => {
      this.render(state);
    });
  }

  async initFeed(dreams) {
    if (!this.mountPoint) throw new Error("Viewport not mounted");

    await this.feed.loadInitial(dreams, (output) => {
      this.mountPoint.innerHTML = output.html;
    });

    // Bind feed card clicks
    // Expecting consumer to wrap card clicks: (not enforced)
  }

  async render(state) {
    if (!this.mountPoint) return;

    if (state.activePage === "feed") {
      // Feed stays as-is (initially rendered)
      return;
    }

    if (state.activePage === "dream-detail") {
      this.detailNav.navigateTo(state.activeDream, (output) => {
        this.mountPoint.innerHTML = output.html;
      });
      return;
    }
  }
}
