// C-15.7 Long Press + Drag Multi-Select

export class LongPressMultiSelect {
  constructor(selection, onChange) {
    this.selection = selection;
    this.onChange = onChange;
    this.longPressTimer = null;
    this.dragActive = false;
  }

  attach(cardElements) {
    cardElements.forEach(card => {
      card.addEventListener("touchstart", e => this.startLongPress(e, card), { passive: true });
      card.addEventListener("touchend", () => this.cancelLongPress());
      card.addEventListener("touchmove", e => this.handleDrag(e));
    });
  }

  startLongPress(e, card) {
    this.longPressTimer = setTimeout(() => {
      if (!this.selection.enabled) this.selection.toggleMode();
      this.toggleCard(card);
      this.dragActive = true;
    }, 420);
  }

  cancelLongPress() {
    clearTimeout(this.longPressTimer);
    this.dragActive = false;
  }

  handleDrag(e) {
    if (!this.dragActive) return;
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el && el.classList.contains("dream-card")) {
      this.toggleCard(el);
    }
  }

  toggleCard(card) {
    const id = card.dataset.id;
    this.selection.toggle(id);
    this.onChange();
  }
}
