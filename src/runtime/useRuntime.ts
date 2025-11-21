import { useRuntimeContext } from './RuntimeContext';

export function useRuntime() {
  const ctx = useRuntimeContext();
  if (!ctx) {
    throw new Error('useRuntime() used outside <RuntimeProvider>');
  }

  const { kernel, initial } = ctx;

  return {
    kernel,

    // Single-access subsystems
    install: kernel.install,
    device: kernel.device,
    network: kernel.network,
    resources: kernel.resources,
    lifecycle: kernel.lifecycle,
    multitab: kernel.multitab,

    // Initial snapshot at boot
    initial
  };
}
