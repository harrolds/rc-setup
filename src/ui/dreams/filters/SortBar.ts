// C-15.1 Sort Bar

export class SortBar {
  constructor(state, onChange) {
    this.state = state;
    this.onChange = onChange;
  }

  mount(root) {
    root.innerHTML = `
      <select id="sort-select" class="sort-select">
        <option value="newest">Nieuw → Oud</option>
        <option value="oldest">Oud → Nieuw</option>
      </select>
    `;
    const s = document.getElementById("sort-select");
    s.onchange = () => {
      this.state.sort = s.value;
      this.onChange();
    };
  }
}
