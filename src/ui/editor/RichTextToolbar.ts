// C-19.1 Rich Text Support (Lightweight)

export class RichTextToolbar {
  constructor() {}

  apply(command) {
    document.execCommand(command, false, null);
  }

  render(root) {
    root.innerHTML = `
      <div class="rt-toolbar">
        <button data-cmd="bold">B</button>
        <button data-cmd="italic">I</button>
        <button data-cmd="underline">U</button>
        <button data-cmd="insertUnorderedList">•</button>
      </div>
    `;

    [...root.querySelectorAll("button")].forEach(btn => {
      btn.onclick = () => this.apply(btn.dataset.cmd);
    });
  }
}
