-- ==========================================
-- IRONFLOW - SCHEMA DEFINITIVO SUPABASE
-- Execute este script no SQL Editor do Supabase
-- ==========================================

-- 1. TABELA DE PERFIS DOS USUÁRIOS
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  avatar_url text,
  color text default '#FF6B00',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ativar RLS para perfis
alter table public.profiles enable row level security;

create policy "Perfis são visíveis para todos os usuários autenticados" 
  on public.profiles for select 
  to authenticated 
  using (true);

create policy "Usuários podem atualizar seus próprios perfis" 
  on public.profiles for update 
  to authenticated 
  using (auth.uid() = id);

create policy "Usuários podem inserir seu próprio perfil" 
  on public.profiles for insert 
  to authenticated 
  with check (auth.uid() = id);

-- 2. TRIGGER AUTOMÁTICO: Cria perfil ao registrar novo usuário
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, color)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    '#FF6B00'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. TABELA DE TREINOS DO USUÁRIO (Armazena a rotina/fichas em JSONB)
create table if not exists public.user_workouts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  workouts_data jsonb not null default '[]'::jsonb,
  active_workout_id text,
  updated_at timestamptz default now()
);

alter table public.user_workouts enable row level security;

create policy "Usuários podem gerenciar apenas seus próprios treinos"
  on public.user_workouts for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 4. TABELA DE HISTÓRICO DE TREINOS
create table if not exists public.workout_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  workout_id text,
  workout_name text not null,
  category text,
  completed_at timestamptz not null default now(),
  duration_minutes integer not null default 0,
  completed_sets integer not null default 0,
  total_sets integer not null default 0,
  exercises_count integer not null default 0,
  calories_burned integer,
  created_at timestamptz default now()
);

alter table public.workout_history enable row level security;

create policy "Usuários visualizam apenas seu próprio histórico"
  on public.workout_history for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Usuários salvam apenas seu próprio histórico"
  on public.workout_history for insert
  to authenticated
  with check (auth.uid() = user_id);

-- 5. TABELA DE SALAS DE TREINO EM DUPLA (MULTIPLAYER)
create table if not exists public.workout_rooms (
  id uuid default gen_random_uuid() primary key,
  room_code text unique not null,
  host_user_id uuid references auth.users on delete cascade not null,
  host_name text not null,
  workout_id text,
  workout_name text not null,
  category text,
  status text not null default 'active', -- 'active' ou 'finished'
  created_at timestamptz default now()
);

alter table public.workout_rooms add column if not exists workout_id text;

alter table public.workout_rooms enable row level security;

create policy "Qualquer autenticado pode ver salas ativas por código"
  on public.workout_rooms for select
  to authenticated
  using (true);

create policy "Qualquer autenticado pode criar sala"
  on public.workout_rooms for insert
  to authenticated
  with check (auth.uid() = host_user_id);

create policy "Host pode atualizar sala"
  on public.workout_rooms for update
  to authenticated
  using (auth.uid() = host_user_id);

-- 6. HABILITAR REALTIME NAS SALAS
alter publication supabase_realtime add table public.workout_rooms;

