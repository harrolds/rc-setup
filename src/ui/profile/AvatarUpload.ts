// C-17.1 Avatar Upload (Supabase Storage)

export class AvatarUpload {
  constructor(supabase) {
    this.supabase = supabase;
  }

  async upload(file, userId) {
    const filePath = `avatars/${userId}.jpg`;

    await this.supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    const { data } = this.supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
}
