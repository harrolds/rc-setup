// ==============================================
// Dreamdrop RC — Vite Entry Point
// ==============================================

import { bootstrapRuntime } from "./runtime/bootstrapRuntime";
import { bootstrap } from "./app/bootstrap";

// Start de volledige Dreamdrop lifecycle
async function startDreamdrop() {
  try {
    // 1. Runtime kernel initialiseren
    const { kernel, initial } = await bootstrapRuntime();

    // 2. UI + applicatie mounten
    await bootstrap(kernel, initial);

    console.log("[Dreamdrop] Runtime + UI gestart");
  } catch (err) {
    console.error("[Dreamdrop] FATAL: runtime kon niet starten", err);
  }
}

startDreamdrop();
