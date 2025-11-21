import { useRuntime } from '../../runtime/useRuntime';

export function useFallbackManager() {
  const rt = useRuntime();

  function isLowBattery() {
    const flags = rt.device.getFlags();
    return flags.isLowBattery === true;
  }

  function isLowMemory() {
    const flags = rt.device.getFlags();
    return typeof flags.isLowMemory === 'function' && flags.isLowMemory();
  }

  function isOffline() {
    const q = rt.network.detectQuality();
    return q === 'offline' || !navigator.onLine;
  }

  return {
    isLowBattery,
    isLowMemory,
    isOffline
  };
}
