// C-12.1 AppShell Runtime Integration

import { DreamdropApp } from "./DreamdropApp";
import { InstallPromptController } from "../pwa/InstallPromptController";

export async function bootstrap(kernel, initialDreams) {
  const appRoot = document.getElementById("app");
  const app = new DreamdropApp(kernel);
  app.mount(appRoot, initialDreams);

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/src/pwa/service-worker.js');
    } catch (err) {
      console.error("SW registration failed", err);
    }
  }

  // Install Prompt Controller
  const ipc = new InstallPromptController();
  ipc.init((ready)=>{
    if (ready) {
      console.log("PWA install available");
    }
  });

  window.dreamdropInstall = () => ipc.install();
}
