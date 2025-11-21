import { RichTextToolbar } from "./RichTextToolbar";
// C-19.0 Dream Editor Foundation v2

export class DreamEditorV2 {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async render(root, dream) {
    root.innerHTML = `
      <div class="editor-v2">
<div id="rt-toolbar"></div>
        <h2>Droom Bewerken</h2>
        <div id="editor-text" contenteditable="true" class="editor-text">${dream?.text||""}</div>

        <div class="editor-actions">
          <button id="save-editor" class="editor-btn">Opslaan</button>
        </div>
      </div>
    `;

    document.getElementById("save-editor").onclick = async () => {
      const text = document.getElementById("editor-text").value;
      await this.supabase.from("dreams").update({ text }).eq("id", dream.id);
      alert("Droom opgeslagen");
      window.location.hash = "#/dream/"+dream.id;
    };
  }
}

// C-19.1 Initialize Rich Text Toolbar
const toolbar = new RichTextToolbar();
toolbar.render(document.getElementById("rt-toolbar"));
