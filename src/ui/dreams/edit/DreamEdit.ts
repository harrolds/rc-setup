// C-15.0 Dream Edit Screen

export class DreamEdit {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async mount(root, dreamId) {
    const { data } = await this.supabase
      .from("dreams")
      .select("*")
      .eq("id", dreamId)
      .single();

    root.innerHTML = `
      <div class="dream-edit">
        <label>Titel</label>
        <input id="dream-title" value="${data.title || ""}" />

        <label>Samenvatting</label>
        <textarea id="dream-summary">${data.summary || ""}</textarea>

        <button id="save-dream">Opslaan</button>
      </div>
    `;

    document.getElementById("save-dream").onclick = () =>
      this.save(dreamId);
  }

  async save(id) {
    const title = document.getElementById("dream-title").value;
    const summary = document.getElementById("dream-summary").value;

    await this.supabase
      .from("dreams")
      .update({ title, summary })
      .eq("id", id);

    window.dreamdropRouter.navigate(`/dream/${id}`);
  }
}
