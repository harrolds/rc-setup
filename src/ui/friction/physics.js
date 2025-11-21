
// C-25.2 — Panel Physics Engine
import { frictionConfig } from './friction';

export function applyPanelPhysics(panelElement){
  panelElement.style.transitionTimingFunction = `cubic-bezier(0.20, 0.80, 0.20, 1.00)`;
  return frictionConfig.panel;
}

export function applyBottomSheetPhysics(sheetElement){
  sheetElement.style.transitionTimingFunction = `cubic-bezier(0.22, 0.82, 0.20, 1.00)`;
  return frictionConfig.sheet;
}
