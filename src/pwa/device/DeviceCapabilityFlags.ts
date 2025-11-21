export class DeviceCapabilityFlags {
  constructor(private report: any) {}

  supportsAudio(): boolean {
    return this.report.audio && this.report.microphone;
  }

  supportsOffline(): boolean {
    return this.report.indexedDB && this.report.storage;
  }

  isLowMemory(): boolean {
    return this.report.memory && this.report.memory <= 2;
  }

  isLowCPU(): boolean {
    return this.report.cpuThreads && this.report.cpuThreads <= 2;
  }
}
