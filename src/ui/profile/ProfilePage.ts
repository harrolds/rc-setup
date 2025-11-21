import { AvatarUpload } from "./AvatarUpload";
// C-17.0 User Profile Page

export class ProfilePage {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async render(root, user) {
    root.innerHTML = `
      <div class="profile-page">
        <h2>Mijn Profiel</h2>
<div class='avatar-block'>
<img id='avatar-img' class='avatar-img' src='' alt='avatar'>
<input type='file' id='avatar-input' accept='image/*' class='avatar-input'>
<button id='avatar-upload-btn' class='profile-btn'>Avatar Uploaden</button>
</div>
        <div class="profile-block">
          <div class="profile-row"><strong>Email:</strong> ${user.email}</div>
          <div class="profile-row"><strong>UID:</strong> ${user.id}</div>
        </div>

        <div class="profile-section">
          <button id="logout-btn" class="profile-btn">Uitloggen</button>
        </div>
      </div>
    `;

    document.getElementById("logout-btn").onclick = async () => {
      await this.supabase.auth.signOut();
      window.location.hash = "#/login";
    };
  }
}

// C-17.1 Avatar Logic
const avatar = new AvatarUpload(this.supabase);
const avatarImg = document.getElementById("avatar-img");
const avatarBtn = document.getElementById("avatar-upload-btn");
const avatarInput = document.getElementById("avatar-input");

// load avatar URL
const { data: avatarData } = this.supabase.storage.from("avatars").getPublicUrl(`avatars/${user.id}.jpg`);
if (avatarData?.publicUrl) avatarImg.src = avatarData.publicUrl;

avatarBtn.onclick = async () => {
  const file = avatarInput.files[0];
  if (!file) return;

  const url = await avatar.upload(file, user.id);
  avatarImg.src = url;
};
