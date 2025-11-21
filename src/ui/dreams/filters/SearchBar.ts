// C-15.1 Search Bar

export class SearchBar {
  constructor(state, onChange) {
    this.state = state;
    this.onChange = onChange;
  }

  mount(root) {
    root.innerHTML = `
      <input id="search-box" placeholder="Zoeken..." class="search-box" />
    `;
    const box = document.getElementById("search-box");
    box.oninput = () => {
      this.state.search = box.value;
      this.onChange();
    };
  }
}
