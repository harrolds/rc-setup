// C-15.4 Bulk Selection State

export class BulkSelectionState {
  constructor() {
    this.enabled = false;
    this.selected = new Set();
  }

  toggleMode() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.selected.clear();
  }

  toggle(id) {
    if (this.selected.has(id)) this.selected.delete(id);
    else this.selected.add(id);
  }

  clear() {
    this.selected.clear();
  }
}
