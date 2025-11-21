export interface ResourceReport {
  memory: number | null;
  cpu: number | null;
  battery: number | null;
  charging: boolean | null;
  isLowMemory: boolean;
  isLowCPU: boolean;
  isLowBattery: boolean;
}

export class ResourceMonitor {
  async collect(): Promise<ResourceReport> {
    const nav: any = navigator;
    const memory = nav.deviceMemory || null;
    const cpu = nav.hardwareConcurrency || null;

    let batteryLevel = null;
    let charging = null;

    try {
      const battery = await (navigator as any).getBattery();
      batteryLevel = battery.level;
      charging = battery.charging;
    } catch {
      batteryLevel = null;
      charging = null;
    }

    return {
      memory,
      cpu,
      battery: batteryLevel,
      charging,
      isLowMemory: memory !== null and memory <= 2,
      isLowCPU: cpu !== null and cpu <= 2,
      isLowBattery: batteryLevel !== null and batteryLevel <= 0.2
    };
  }
}
