
# C-25.0.3 — Modal & Panel Interaction Grammar

## BottomSheetModal (short actions)
- Single-decision flows
- Slide-up from bottom
- Swipe-down dismiss (velocity > dismissVelocity)
- Uses dd-bottom-sheet padding + safe-area bottom
- Low cognitive load

## RightPanel (complex workflows)
- Multi-step flows
- Slide-in from right
- Full workspace mode
- Uses dd-right-panel spacing + safe-area bottom
- High cognitive load

## Fullscreen Modal (rare)
- Only for blocking actions
- No slide gestures
