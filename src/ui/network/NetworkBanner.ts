// C-12.5 Network Banner Integration – Viewport Injection Layer

export class NetworkBanner {
  constructor() {
    this.el = null;
  }

  mount(container) {
    let banner = document.getElementById("network-banner");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "network-banner";
      banner.className = "network-banner";
      banner.style.display = "none";
      container.prepend(banner);
    }
    this.el = banner;
  }

  update(state) {
    if (!this.el) return;

    if (!state.online) {
      this.el.textContent = "Offline – sommige functies zijn niet beschikbaar";
      this.el.className = "network-banner banner-offline";
      this.el.style.display = "block";
      return;
    }

    if (state.weak) {
      this.el.textContent = "Zwak netwerk – AI-functies kunnen trager zijn";
      this.el.className = "network-banner banner-weak";
      this.el.style.display = "block";
      return;
    }

    this.el.textContent = "Verbonden";
    this.el.className = "network-banner banner-online";
    this.el.style.display = "block";

    setTimeout(() => {
      if (this.el) this.el.style.display = "none";
    }, 2000);
  }
}
