// C-15.5 Bulk Select Toolbar

export class BulkSelectToolbar {
  constructor(selection, onToggle) {
    this.selection = selection;
    this.onToggle = onToggle;
  }

  mount(root) {
    root.innerHTML = `
      <div class="bulk-toolbar">
        <button id="toggle-bulk">
          ${this.selection.enabled ? "Bulk-mode beëindigen" : "Bulk selecteren"}
        </button>
      </div>
    `;

    document.getElementById("toggle-bulk").onclick = () => {
      this.selection.toggleMode();
      this.onToggle();
    };
  }
}
