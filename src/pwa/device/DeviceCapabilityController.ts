import { DeviceCapabilities } from './DeviceCapabilities';
import { DeviceCapabilityFlags } from './DeviceCapabilityFlags';

export class DeviceCapabilityController {
  private caps = new DeviceCapabilities();
  private flags: any = null;

  async init() {
    const report = await this.caps.detect();
    this.flags = new DeviceCapabilityFlags(report);
    return report;
  }

  getFlags() {
    return this.flags;
  }
}
