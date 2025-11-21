// C-15.8 Swipe Actions (Left/Right)

export class SwipeActions {
  constructor(onFavorite, onDelete) {
    this.onFavorite = onFavorite;
    this.onDelete = onDelete;
    this.threshold = 60;
  }

  attach(cards) {
    cards.forEach(card => {
      let startX = 0;
      let currentX = 0;
      let swiping = false;

      card.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        swiping = true;
        card.style.transition = "none";
      }, { passive: true });

      card.addEventListener("touchmove", e => {
        if (!swiping) return;
        currentX = e.touches[0].clientX - startX;
        card.style.transform = `translateX(${currentX}px)`;
      }, { passive: true });

      card.addEventListener("touchend", () => {
        card.style.transition = "transform 0.2s ease-out";
        if (currentX > this.threshold) {
          this.onFavorite(card.dataset.id);
        } else if (currentX < -this.threshold) {
          this.onDelete(card.dataset.id);
        }
        card.style.transform = "translateX(0)";
        swiping = false;
      });
    });
  }
}
