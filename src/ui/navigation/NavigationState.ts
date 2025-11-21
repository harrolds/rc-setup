// C-10.8 Navigation State Store – Router-Free App Navigation System
export class NavigationState {
  constructor() {
    this.state = {
      activePage: "feed",
      activeDream: null,
      history: []
    };
    this.listeners = [];
  }

  onChange(cb) {
    this.listeners.push(cb);
  }

  notify() {
    this.listeners.forEach(cb => cb(this.state));
  }

  navigateTo(page, payload = null) {
    this.state.history.push({ page: this.state.activePage, payload: this.state.activeDream });
    this.state.activePage = page;
    this.state.activeDream = payload;
    this.notify();
  }

  back() {
    const last = this.state.history.pop();
    if (!last) return;
    this.state.activePage = last.page;
    this.state.activeDream = last.payload;
    this.notify();
  }

  getActivePage() {
    return this.state.activePage;
  }

  getActiveDream() {
    return this.state.activeDream;
  }
}
