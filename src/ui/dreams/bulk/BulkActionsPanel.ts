// C-15.4 Bulk Actions Panel

export class BulkActionsPanel {
  constructor(supabase, selection) {
    this.supabase = supabase;
    this.selection = selection;
  }

  mount(root, refresh) {
    root.innerHTML = `
      <div class="bulk-panel">
        <button id="bulk-delete">Verwijder geselecteerde</button>
        <button id="bulk-fav">Markeer als favoriet</button>
        <button id="bulk-unfav">Verwijder favoriet</button>
        <button id="bulk-cancel">Annuleer</button>
      </div>
    `;

    document.getElementById("bulk-delete").onclick = async () => {
      await this.supabase.from("dreams")
        .delete()
        .in("id", Array.from(this.selection.selected));
      this.selection.clear();
      this.selection.enabled = false;
      refresh();
    };

    document.getElementById("bulk-fav").onclick = async () => {
      await this.supabase.from("dreams")
        .update({ is_favorite: true })
        .in("id", Array.from(this.selection.selected));
      refresh();
    };

    document.getElementById("bulk-unfav").onclick = async () => {
      await this.supabase.from("dreams")
        .update({ is_favorite: false })
        .in("id", Array.from(this.selection.selected));
      refresh();
    };

    document.getElementById("bulk-cancel").onclick = () => {
      this.selection.clear();
      this.selection.enabled = false;
      refresh();
    };
  }
}
