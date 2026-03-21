-- TechWiseTutors Supabase Migration
-- Run this in the Supabase SQL Editor to create all tables

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Admin table
create table if not exists admins (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password text not null,
  name text not null,
  created_at timestamptz default now()
);

-- Volunteer Applications
create table if not exists volunteer_applications (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  school text not null,
  grade text not null,
  why_volunteer text not null,
  tech_experience text not null,
  availability text not null,
  past_experience text not null default 'None',
  status text not null default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Volunteers
create table if not exists volunteers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password text not null,
  full_name text not null,
  school text not null,
  grade text not null,
  availability text not null,
  status text not null default 'active',
  application_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Hour Logs
create table if not exists hour_logs (
  id uuid primary key default uuid_generate_v4(),
  volunteer_id uuid not null references volunteers(id) on delete cascade,
  date text not null,
  hours real not null,
  activity_type text not null,
  location text not null,
  notes text not null default '',
  status text not null default 'pending',
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Bookings
create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  staff_member text not null,
  date text not null,
  time_slot text not null,
  help_needed text not null,
  status text not null default 'pending',
  created_at timestamptz default now()
);

-- Schedule Events
create table if not exists schedule_events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  date text not null,
  start_time text not null,
  end_time text not null,
  location text not null,
  description text not null default '',
  created_at timestamptz default now()
);

-- Schedule Assignments
create table if not exists schedule_assignments (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references schedule_events(id) on delete cascade,
  volunteer_id uuid not null references volunteers(id) on delete cascade,
  created_at timestamptz default now(),
  unique(event_id, volunteer_id)
);

-- Contact Messages
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Create indexes for common queries
create index if not exists idx_hour_logs_volunteer_id on hour_logs(volunteer_id);
create index if not exists idx_hour_logs_status on hour_logs(status);
create index if not exists idx_schedule_assignments_event_id on schedule_assignments(event_id);
create index if not exists idx_schedule_assignments_volunteer_id on schedule_assignments(volunteer_id);
create index if not exists idx_volunteer_applications_status on volunteer_applications(status);
create index if not exists idx_volunteers_status on volunteers(status);
create index if not exists idx_bookings_status on bookings(status);

-- Auto-update updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_volunteer_applications
  before update on volunteer_applications
  for each row execute function update_updated_at();

create trigger set_updated_at_volunteers
  before update on volunteers
  for each row execute function update_updated_at();

create trigger set_updated_at_hour_logs
  before update on hour_logs
  for each row execute function update_updated_at();
