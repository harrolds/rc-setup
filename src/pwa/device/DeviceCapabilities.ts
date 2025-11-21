export interface DeviceCapabilitiesReport {
  audio: boolean;
  microphone: boolean;
  storage: boolean;
  indexedDB: boolean;
  memory?: number;
  cpuThreads?: number;
  platform: string;
  userAgent: string;
}

export class DeviceCapabilities {
  async detect(): Promise<DeviceCapabilitiesReport> {
    const audio = !!window.AudioContext || !!window.webkitAudioContext;

    let microphone = false;
    try {
      const perms = await navigator.permissions.query({ name: "microphone" as PermissionName });
      microphone = perms.state === "granted" || perms.state === "prompt";
    } catch {
      microphone = false;
    }

    const storage = 'storage' in navigator && 'estimate' in navigator.storage;
    const indexedDB = !!window.indexedDB;

    const memory = (navigator as any).deviceMemory || null;
    const cpuThreads = navigator.hardwareConcurrency || null;

    const platform = navigator.platform || "unknown";
    const userAgent = navigator.userAgent || "unknown";

    return {
      audio,
      microphone,
      storage,
      indexedDB,
      memory,
      cpuThreads,
      platform,
      userAgent
    };
  }
}
