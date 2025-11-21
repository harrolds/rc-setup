-- C-13.1 Supabase RLS Policies (Production-Safe)

-- Enable RLS
alter table users enable row level security;
alter table user_settings enable row level security;
alter table dreams enable row level security;
alter table ai_events enable row level security;

-- USERS: users can read only themselves
create policy "users_select_own" on users
for select using (auth.uid() = id);

-- USER_SETTINGS
create policy "settings_select" on user_settings
for select using (auth.uid() = user_id);

create policy "settings_update" on user_settings
for update using (auth.uid() = user_id);

-- DREAMS (full CRUD for owner)
create policy "dreams_select" on dreams
for select using (auth.uid() = user_id);

create policy "dreams_insert" on dreams
for insert with check (auth.uid() = user_id);

create policy "dreams_update" on dreams
for update using (auth.uid() = user_id);

create policy "dreams_delete" on dreams
for delete using (auth.uid() = user_id);

-- AI EVENTS: insert/view only own events
create policy "events_select" on ai_events
for select using (auth.uid() = user_id);

create policy "events_insert" on ai_events
for insert with check (auth.uid() = user_id);
