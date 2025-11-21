// C-15.1 Favorite Filter

export class FavoriteFilter {
  constructor(state, onChange) {
    this.state = state;
    this.onChange = onChange;
  }

  mount(root) {
    root.innerHTML = `
      <select id="fav-select" class="fav-select">
        <option value="all">Alle</option>
        <option value="fav">Favorieten</option>
      </select>
    `;
    const el = document.getElementById("fav-select");
    el.onchange = () => {
      this.state.favorite = el.value;
      this.onChange();
    };
  }
}
