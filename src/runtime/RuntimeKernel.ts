import { InstallPromptController } from '../pwa/install/InstallPromptController';
import { DeviceCapabilityController } from '../pwa/device/DeviceCapabilityController';
import { NetworkController } from '../pwa/network/NetworkController';
import { ResourceController } from '../pwa/resource/ResourceController';
import { LifecycleController } from '../pwa/lifecycle/LifecycleController';
import { MultiTabCoordinator } from '../pwa/multitab/MultiTabCoordinator';

export class RuntimeKernel {
  install = new InstallPromptController();
  device = new DeviceCapabilityController();
  network = new NetworkController();
  resources = new ResourceController();
  lifecycle = new LifecycleController();
  multitab = new MultiTabCoordinator();

  async init() {
    const deviceReport = await this.device.init();
    const resourceReport = await this.resources.init();
    const networkQuality = this.network.detectQuality();
    const lifecycle = this.lifecycle.getCurrent();

    return {
      device: deviceReport,
      resources: resourceReport,
      network: networkQuality,
      lifecycle
    };
  }
}
