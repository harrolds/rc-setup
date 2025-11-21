// C-12.5 Viewport Controller Extension – Inject Network Banner

import { NetworkBanner } from "../network/NetworkBanner";
import { NetworkMonitor } from "../network/NetworkMonitor";

export function attachNetworkLayer(viewportRoot) {
  const banner = new NetworkBanner();
  banner.mount(viewportRoot);

  const monitor = new NetworkMonitor((state) => banner.update(state));
  monitor.start();
}
