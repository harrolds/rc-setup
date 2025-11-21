// C-15.1 Processing Status Filter

export class StatusFilter {
  constructor(state, onChange) {
    this.state = state;
    this.onChange = onChange;
  }

  mount(root) {
    root.innerHTML = `
      <select id="status-select" class="status-select">
        <option value="all">Alle</option>
        <option value="pending">Wachtend</option>
        <option value="processing">Bezig</option>
        <option value="done">Klaar</option>
      </select>
    `;
    const el = document.getElementById("status-select");
    el.onchange = () => {
      this.state.processing = el.value;
      this.onChange();
    };
  }
}
