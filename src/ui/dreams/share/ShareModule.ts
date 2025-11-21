// C-16.0 Share Module (Web Share API + fallback)

export class ShareModule {
  constructor() {}

  async share(dream) {
    const text = `${dream.title || "Dream"}\n${dream.summary || ""}`;
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: dream.title || "Dream",
        text,
        url
      });
      return;
    }

    // fallback copy to clipboard
    await navigator.clipboard.writeText(text + "\n" + url);
    alert("Gekopieerd naar klembord");
  }
}
