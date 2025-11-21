import React from 'react';
import { RuntimeProvider } from '../runtime/RuntimeContext';
import { useRuntime } from '../runtime/useRuntime';

function AppShellInner({ children }: { children: React.ReactNode }) {
  const rt = useRuntime();

  const quality = rt.network.detectQuality();
  const lifecycle = rt.lifecycle.getCurrent();

  return (
    <div className="app-shell">
      <div className="runtime-banner">
        <span>Network: {quality}</span>
        <span>Focus: {String(lifecycle.focused)}</span>
      </div>
      {children}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <RuntimeProvider>
      <AppShellInner>{children}</AppShellInner>
    </RuntimeProvider>
  );
}
