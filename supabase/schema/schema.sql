-- C-13.0 Final Supabase Schema (Draft-Production)

-- Users
create table if not exists users (
  id uuid primary key,
  email text unique,
  created_at timestamptz default now()
);

-- User Settings
create table if not exists user_settings (
  user_id uuid references users(id) on delete cascade,
  theme text default 'light',
  language text default 'nl',
  notifications_enabled boolean default true,
  created_at timestamptz default now(),
  primary key (user_id)
);

-- Dreams
create table if not exists dreams (
  id uuid primary key,
  user_id uuid references users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  title text,
  transcript text,
  summary text,
  visual_url text,
  tags text[]
);

-- AI Events (audit / debugging)
create table if not exists ai_events (
  id uuid primary key,
  user_id uuid references users(id) on delete cascade,
  dream_id uuid references dreams(id),
  event_type text,
  payload jsonb,
  created_at timestamptz default now()
);
