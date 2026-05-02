create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'contributor' check (role in ('contributor', 'editor', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.objects (
  id uuid primary key default gen_random_uuid(),
  object_code text not null unique,
  name text not null,
  aliases text[] not null default '{}',
  notation text not null default '',
  type text not null check (
    type in (
      'Series',
      'Groups',
      'Graphs',
      'Matrices',
      'Polynomials',
      'Functions',
      'Transforms',
      'Algorithms',
      'Quantum Objects',
      'ML Objects',
      'Probability',
      'Optimization',
      'Geometry/Topology'
    )
  ),
  definition text not null,
  importance_note text not null,
  attribution_of_origin text not null,
  properties text[] not null default '{}',
  relations text[] not null default '{}',
  examples text[] not null default '{}',
  code_examples jsonb not null default '[]'::jsonb,
  references jsonb not null default '[]'::jsonb,
  origin_story text,
  primary_uses text[] not null default '{}',
  historical_development text,
  current_research_trends text,
  trend_references jsonb not null default '[]'::jsonb,
  verification_status text not null default 'submitted' check (
    verification_status in ('draft', 'submitted', 'reviewed', 'verified', 'deprecated')
  ),
  submitted_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(object_code, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(notation, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(type, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(definition, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(importance_note, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(origin_story, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(historical_development, '')), 'D') ||
    setweight(to_tsvector('english', coalesce(current_research_trends, '')), 'D') ||
    setweight(to_tsvector('english', array_to_string(aliases, ' ')), 'B') ||
    setweight(to_tsvector('english', array_to_string(properties, ' ')), 'B') ||
    setweight(to_tsvector('english', array_to_string(relations, ' ')), 'B') ||
    setweight(to_tsvector('english', array_to_string(primary_uses, ' ')), 'C')
  ) stored
);

create index if not exists objects_type_idx on public.objects(type);
create index if not exists objects_status_idx on public.objects(verification_status);
create index if not exists objects_search_idx on public.objects using gin(search_vector);
create index if not exists objects_properties_idx on public.objects using gin(properties);
create index if not exists objects_relations_idx on public.objects using gin(relations);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists objects_set_updated_at on public.objects;
create trigger objects_set_updated_at
before update on public.objects
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.objects enable row level security;

create policy "Profiles are readable by owner"
on public.profiles for select
using (auth.uid() = id);

create policy "Verified and reviewed objects are public"
on public.objects for select
using (verification_status in ('verified', 'reviewed'));

create policy "Users can read their own submissions"
on public.objects for select
using (auth.uid() = submitted_by);

create policy "Authenticated users can submit objects"
on public.objects for insert
with check (auth.uid() = submitted_by and verification_status = 'submitted');

create policy "Submitters can update submitted drafts"
on public.objects for update
using (auth.uid() = submitted_by and verification_status in ('draft', 'submitted'))
with check (auth.uid() = submitted_by and verification_status in ('draft', 'submitted'));

create policy "Editors and admins can manage objects"
on public.objects for all
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('editor', 'admin')
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('editor', 'admin')
  )
);
