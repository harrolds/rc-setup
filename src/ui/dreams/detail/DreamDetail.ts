import { CommentModule } from "../comments/CommentModule";
import { ReactionModule } from "../reactions/ReactionModule";
import { ShareModule } from "../share/ShareModule";
// C-15.0 Dream Detail

export class DreamDetail {
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
      <div class="dream-detail">
        <h2>${data.title || "Untitled Dream"} <span id="fav-star" class="fav-star">${data.is_favorite ? "★" : "☆"}</span></h2><button id="share-btn"
</button>
<div class="reaction-bar">
<button id="reaction-love" class="react-btn">❤️</button>
<button id="reaction-wow" class="react-btn">😮</button>
<button id="reaction-sad" class="react-btn">😢</button>
<button id="reaction-sleep" class="react-btn">😴</button>
</div>
<div class='comment-section'>
<h3>Reacties</h3>
<div id='comment-list'></div>
<textarea id='comment-input' placeholder='Schrijf een reactie...'></textarea>
<button id='comment-submit' class='comment-submit-btn'>Plaatsen</button>
</div><button class="share-btn">Delen</button>
        <img src="${data.visual_url}" class="dream-img" />
        <p>${data.summary}</p>
        <p class="transcript">${data.transcript}</p>

        <button id="edit-dream">Bewerken</button>
        <button id="delete-dream">Verwijderen</button>
      </div>
<div class='comment-section'>
<h3>Reacties</h3>
<div id='comment-list'></div>
<textarea id='comment-input' placeholder='Schrijf een reactie...'></textarea>
<button id='comment-submit' class='comment-submit-btn'>Plaatsen</button>
</div>
    `;

    document.getElementById("edit-dream").onclick = () =>
      window.dreamdropRouter.navigate(`/dream/${dreamId}/edit`);

    document.getElementById("delete-dream").onclick = () =>
      this.delete(dreamId);
  }

  async delete(id) {
    await this.supabase.from("dreams").delete().eq("id", id);
    window.dreamdropRouter.navigate("/feed");
  }
}



// Favorite toggle injection
import { FavoriteToggle } from "../favorite/FavoriteToggle";

const fav = new FavoriteToggle(this.supabase);
document.getElementById("fav-star").onclick = async () => {
  const next = await fav.toggle(data.id, data.is_favorite);
  document.getElementById("fav-star").textContent = next ? "★" : "☆";
};

// C-16.0 Share Handler
const share = new ShareModule();
document.getElementById("share-btn").onclick = () => share.share(data);

// C-16.1 Reaction Handlers
const reactModule = new ReactionModule(this.supabase);

["love","wow","sad","sleep"].forEach(type => {
  const el = document.getElementById("reaction-" + type);
  el.onclick = async () => {
    const next = await reactModule.react(data.id, type, data.reactions || {});
    data.reactions = next;
    el.classList.add("pulse");
    setTimeout(()=> el.classList.remove("pulse"), 250);
  };
});

// C-16.3 Comment Logic
const commentModule = new CommentModule(this.supabase);

async function loadComments() {
  const comments = await commentModule.load(data.id);
  const list = document.getElementById("comment-list");
  list.innerHTML = comments.map(c => `<div class='comment-item'>${c.text}</div>`).join("");
}

document.getElementById("comment-submit").onclick = async () => {
  const text = document.getElementById("comment-input").value.trim();
  if (!text) return;
  await commentModule.add(data.id, text);
  document.getElementById("comment-input").value = "";
  loadComments();
};

loadComments();
