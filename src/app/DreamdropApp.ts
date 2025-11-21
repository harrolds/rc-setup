// C-11.0 AppShell Root Component – Final Integration
import { ViewportController } from "../ui/appshell/ViewportController";

export class DreamdropApp {
  constructor(kernel) {
    this.kernel = kernel;
    this.viewport = new ViewportController(kernel);
  }

  mount(element, initialDreams) {
    this.viewport.mount(element);
    this.viewport.initFeed(initialDreams);
  }
}
