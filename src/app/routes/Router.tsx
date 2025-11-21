import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '../AppShell';
import { useRuntime } from '../../runtime/useRuntime';
import Home from './screens/Home';
import Recorder from './screens/Recorder';
import Offline from './screens/Offline';
import LowBattery from './screens/LowBattery';
import LowMemory from './screens/LowMemory';

function RuntimeAwareRouterInner() {
  const rt = useRuntime();
  const quality = rt.network.detectQuality();
  const flags = rt.device.getFlags();

  if (!navigator.onLine || quality === 'offline') {
    return <Offline />;
  }

  if (flags.isLowBattery && !rt.resources) {
    return <LowBattery />;
  }

  if (flags.isLowMemory()) {
    return <LowMemory />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/record" element={<Recorder />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function RuntimeAwareRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <RuntimeAwareRouterInner />
      </AppShell>
    </BrowserRouter>
  );
}
