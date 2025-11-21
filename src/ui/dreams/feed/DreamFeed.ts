import { SwipeActions } from "../gestures/SwipeActions";
import { LongPressMultiSelect } from "../gestures/LongPressMultiSelect";
// C-15.2 Feed Query Integration

export class DreamFeed {
  constructor(supabase, state) {
    this.supabase = supabase;
    this.state = state;
  }

  async mount(root, userId) {
    await this.render(root, userId);
  }

  async render(root, userId) {
    let q = this.supabase.from("dreams").select("*").eq("user_id", userId);

    if (this.state.search) {
      q = q.ilike("summary", `%${this.state.search}%`);
    }

    if (this.state.favorite === "fav") {
      q = q.eq("is_favorite", true);
    }

    if (this.state.processing !== "all") {
      q = q.eq("processing_status", this.state.processing);
    }

    q = this.state.sort === "oldest"
      ? q.order("created_at", { ascending: true })
      : q.order("created_at", { ascending: false });

    const { data } = await q;

    root.innerHTML = `
<div id="bulk-toolbar"></div>
      <div class="dream-feed">
        ${data.map(d => `
          <div class="dream-card" data-id="${d.id}">
${this.selection.enabled ? `<input type="checkbox" class="bulk-check" data-id="${d.id}" />` : ""}
            <h3>${d.title || "Untitled Dream"} <span class="fav-mini">${d.is_favorite ? "★" : "☆"}</span></h3>
<div class="reaction-mini-bar">
<span class="reaction-mini">❤️ ${d.reactions?.love || 0}</span>
<span class="reaction-mini">😮 ${d.reactions?.wow || 0}</span>
<span class="reaction-mini">😢 ${d.reactions?.sad || 0}</span>
<span class="reaction-mini">😴 ${d.reactions?.sleep || 0}</span>
</div>
            <p>${(d.summary || "").slice(0, 120)}...</p>
            <span>${new Date(d.created_at).toLocaleString()}</span>
          </div>
        `).join("")}
      </div>
    `;

    document.querySelectorAll(".dream-card").forEach(el =>
      el.addEventListener("click", () =>
        window.dreamdropRouter.navigate(`/dream/${el.dataset.id}`)
      )
    );
  }
}


// Bulk selection injection
if (this.selection && this.selection.enabled) {
  document.querySelectorAll(".bulk-check").forEach(cb => {
    cb.onchange = () => {
      this.selection.toggle(cb.dataset.id);
    };
  });
}

// C-15.6 bulk-selection-apply
if (this.selection && this.selection.enabled) {
  document.querySelectorAll(".dream-card").forEach(card => {
    const id = card.dataset.id;
    if (this.selection.selected.has(id)) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  });
}

// C-15.7-init: Gesture select
if (this.selection) {
  const cards = document.querySelectorAll(".dream-card");
  const gesture = new LongPressMultiSelect(this.selection, () => this.render(root, userId));
  gesture.attach(cards);
}

// C-15.8-init Swipe Actions
if (this.selection && !this.selection.enabled) {
  const cards = document.querySelectorAll(".dream-card");

  const swipe = new SwipeActions(
    async (id) => {
      await this.supabase.from("dreams").update({ is_favorite: true }).eq("id", id);
      this.render(root, userId);
    },
    async (id) => {
      await this.supabase.from("dreams").delete().eq("id", id);
      this.render(root, userId);
    }
  );

  swipe.attach(cards);
}
