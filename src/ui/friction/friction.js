
// C-25.2 — Scroll + Panel Friction Tuning
export const frictionConfig = {
  panel: {
    dragThreshold: 18,
    velocityOpen: 0.22,
    velocityClose: 0.18,
    overshoot: 0.08,
    lockDirectionAngle: 28
  },
  sheet: {
    dragThreshold: 16,
    velocityOpen: 0.25,
    velocityClose: 0.20,
    overshoot: 0.10,
    dismissVelocity: 0.35
  },
  scroll: {
    momentum: 0.92,
    bounce: 0.03,
    disableGhostScroll: true
  }
};
